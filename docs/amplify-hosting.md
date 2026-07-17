# AWS Amplify and CloudFront hosting runbook

The site is a static TanStack Start build published to an AWS Amplify `WEB` app in `us-east-1`. CloudFront is the public delivery layer. It supplies the generated `404.html` body with HTTP status `404`, redirects `www` to the apex, and serves the apex certificate. Route 53 and ACM complete the custom-domain setup.

CloudFormation owns the Amplify app and branch, CloudFront resources, ACM certificate, Route 53 aliases, GitHub OIDC provider, and deployment role. GitHub Actions only validates and publishes the static artifact to Amplify.

## Architecture

```text
GitHub Actions --OIDC--> Amplify branch origin
                              |
                              v
Route 53 --> CloudFront --> main.<app-id>.amplifyapp.com
               |  |
               |  +-- origin 404 + /404.html => custom body with status 404
               +----- www 301 redirect and clean-path request normalization
```

CloudFront uses the Amplify branch domain as a custom HTTPS origin. The distribution exists even while `EnableCustomDomain=false`, so it can be validated before DNS changes. `EnableCustomDomain=true` pre-provisions the ACM certificate and CloudFront aliases while legacy DNS remains live. The separate `EnableDnsCutover=true` gate creates the Route 53 A/AAAA aliases; no Amplify domain association is created.

## Prerequisites

- AWS CLI authenticated with `aws login` to the intended account.
- GitHub CLI authenticated with repository administration access.
- Bun and project dependencies installed.
- `cfn-lint` available, for example through `uvx cfn-lint`.
- Public Route 53 zone `Z07741203I5VR48TBSMSA` for `diloreto.com`.
- The ignored pre-migration DNS snapshot at `.aws-migration/route53-before.json`.

Always verify identity before mutating AWS:

```bash
aws sts get-caller-identity
```

## 1. Validate locally

```bash
bun install --frozen-lockfile
bun run check
uvx cfn-lint infrastructure/amplify-hosting.yml
aws cloudformation validate-template \
  --region us-east-1 \
  --template-body file://infrastructure/amplify-hosting.yml
```

`bun run check` performs linting, TypeScript checks, a production build, static-output assertions, and desktop/mobile Playwright smoke tests. The build must contain root-level `index.html`, `areyou/index.html`, and the script-free `404.html`.

## 2. Create or update pre-cutover infrastructure

Keep the custom domain and DNS cutover disabled until the CloudFront-generated URL passes validation:

```bash
aws cloudformation deploy \
  --region us-east-1 \
  --stack-name diloreto-amplify-hosting \
  --template-file infrastructure/amplify-hosting.yml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides EnableCustomDomain=false EnableDnsCutover=false
```

Inspect outputs:

```bash
aws cloudformation describe-stacks \
  --region us-east-1 \
  --stack-name diloreto-amplify-hosting \
  --query 'Stacks[0].Outputs' \
  --output table
```

Important outputs are:

- `AmplifyAppId`
- `AmplifyBranchName`
- `AmplifyDefaultDomain`
- `AmplifyBranchUrl`
- `EdgeDistributionId`
- `EdgeDefaultDomain`
- `EdgeDefaultUrl`
- `GitHubDeploymentRoleArn`

## 3. Configure GitHub

Create a `production` environment restricted to `main`. Configure these environment variables from stack outputs:

| Variable | Value |
| --- | --- |
| `AWS_REGION` | `us-east-1` |
| `AWS_ROLE_ARN` | `GitHubDeploymentRoleArn` |
| `AMPLIFY_APP_ID` | `AmplifyAppId` |
| `AMPLIFY_BRANCH` | `AmplifyBranchName` |
| `AMPLIFY_DEFAULT_DOMAIN` | `AmplifyDefaultDomain` |
| `EDGE_DEFAULT_DOMAIN` | `EdgeDefaultDomain` |

No AWS access keys or GitHub secrets are required. The role trust policy accepts only `repo:soodoh/diloreto-website:environment:production`. Its permissions are limited to creating, starting, and polling deployments for the CloudFormation-managed Amplify branch.

## 4. Deployment behavior

`.github/workflows/deploy.yml` has two paths:

- Pull requests run validation and package the artifact but never deploy.
- Pushes to `main` and explicit workflow dispatches validate first, then assume the AWS role with GitHub OIDC and publish the validated ZIP.

The deploy job:

1. rejects missing configuration;
2. avoids deploying a stale `main` push;
3. requests a one-use signed upload URL without printing it;
4. uploads and starts the Amplify deployment;
5. polls the bounded Amplify job to completion;
6. compares the Amplify origin HTML with CloudFront output;
7. checks edge cache/security headers, assets, routes, and the true custom `404` response;
8. runs desktop and mobile Playwright tests against CloudFront.

The archive contents are the root of `dist/client`; the archive must not contain an extra `dist/` or `client/` directory.

## 5. Validate before DNS cutover

Use `EdgeDefaultUrl`, not the direct Amplify branch URL, for public-behavior validation:

```bash
EDGE_URL=$(aws cloudformation describe-stacks \
  --region us-east-1 \
  --stack-name diloreto-amplify-hosting \
  --query "Stacks[0].Outputs[?OutputKey=='EdgeDefaultUrl'].OutputValue | [0]" \
  --output text)

curl -I "$EDGE_URL/"
curl -I "$EDGE_URL/areyou"
curl -i "$EDGE_URL/not-a-real-route"
PLAYWRIGHT_BASE_URL="$EDGE_URL" bun run test:smoke
```

Required results:

- `/` and `/areyou` return `200` and render successfully.
- Unknown extensionless routes preserve their visible URL and return the generated 404 UI with status `404`.
- Static files with extensions are requested unchanged.
- Hashed assets retain `Cache-Control: public, max-age=31536000, immutable`.
- HTML retains `Cache-Control: no-cache`.
- No runtime request targets Netlify.

The direct Amplify origin intentionally has no catch-all rewrite: an unknown path returns a real but empty Amplify 404. CloudFront replaces only that error body with `/404.html` while retaining status `404`.

The CloudFront Function can be tested independently with `aws cloudfront test-function`. Confirm that an apex clean path such as `/areyou` is internally rewritten to `/areyou/`, and that a case-insensitive `www` request receives `301` to the same apex path with all query parameters preserved.

## 6. DNS safety gate

Immediately before changing DNS, save a fresh snapshot and compare it to the pre-migration snapshot:

```bash
aws route53 list-resource-record-sets \
  --hosted-zone-id Z07741203I5VR48TBSMSA \
  --output json > .aws-migration/route53-pre-cutover.json

sha256sum .aws-migration/route53-before.json \
  .aws-migration/route53-pre-cutover.json
```

Review the full record-set diff. Preserve all unrelated records byte-for-byte, especially Proton Mail records and the unrelated `carolyn` and `paul` CNAMEs.

Only these stale records are authorized for deletion:

- apex A `75.2.60.5`
- `www` CNAME `diloreto.netlify.com.`

Do not delete or rewrite any other record.

## 7. Enable the custom domain

### 7.1 Pre-provision TLS and CloudFront aliases

Keep legacy DNS live while CloudFormation requests the certificate and deploys the aliases:

```bash
aws cloudformation deploy \
  --region us-east-1 \
  --stack-name diloreto-amplify-hosting \
  --template-file infrastructure/amplify-hosting.yml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides EnableCustomDomain=true EnableDnsCutover=false
```

This first update creates DNS validation records, waits for ACM issuance, and attaches the apex and `www` aliases to CloudFront. It does not modify the existing apex or `www` traffic records.

Wait for CloudFormation and CloudFront, then inspect certificate status:

```bash
aws cloudformation wait stack-update-complete \
  --region us-east-1 \
  --stack-name diloreto-amplify-hosting

DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
  --region us-east-1 \
  --stack-name diloreto-amplify-hosting \
  --query "Stacks[0].Outputs[?OutputKey=='EdgeDistributionId'].OutputValue | [0]" \
  --output text)
EDGE_DOMAIN=$(aws cloudformation describe-stacks \
  --region us-east-1 \
  --stack-name diloreto-amplify-hosting \
  --query "Stacks[0].Outputs[?OutputKey=='EdgeDefaultDomain'].OutputValue | [0]" \
  --output text)
aws cloudfront wait distribution-deployed --id "$DISTRIBUTION_ID"

CERTIFICATE_ARN=$(aws cloudformation describe-stacks \
  --region us-east-1 \
  --stack-name diloreto-amplify-hosting \
  --query "Stacks[0].Outputs[?OutputKey=='EdgeCertificateArn'].OutputValue | [0]" \
  --output text)
aws acm describe-certificate \
  --region us-east-1 \
  --certificate-arn "$CERTIFICATE_ARN" \
  --query 'Certificate.Status' \
  --output text
```

Expected certificate status is `ISSUED`. Exercise the aliases before DNS points at them while preserving the requested TLS server name:

```bash
curl --connect-to "diloreto.com:443:${EDGE_DOMAIN}:443" \
  -I https://diloreto.com/areyou
curl --connect-to "www.diloreto.com:443:${EDGE_DOMAIN}:443" \
  -I 'https://www.diloreto.com/areyou?source=verification'
```

The second response must be `301` with location `https://diloreto.com/areyou?source=verification`.

### 7.2 Cut over Route 53

Delete only the authorized stale apex A and `www` CNAME in one reviewed Route 53 change batch. Immediately create the CloudFormation-managed aliases:

```bash
aws cloudformation deploy \
  --region us-east-1 \
  --stack-name diloreto-amplify-hosting \
  --template-file infrastructure/amplify-hosting.yml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides EnableCustomDomain=true EnableDnsCutover=true
```

Only the four Route 53 alias resources should be added in this second change set. Wait for `UPDATE_COMPLETE`. If the update fails, immediately restore the two original record sets from the snapshot; do not leave the names absent.

## 8. Production verification

Verify DNS and TLS from more than one resolver or network if possible:

```bash
dig +short A diloreto.com
dig +short AAAA diloreto.com
dig +short A www.diloreto.com
dig +short AAAA www.diloreto.com

curl -I https://diloreto.com/
curl -I https://diloreto.com/areyou
curl -i https://diloreto.com/not-a-real-route
curl -I 'https://www.diloreto.com/areyou?source=verification'
PLAYWRIGHT_BASE_URL=https://diloreto.com bun run test:smoke
```

Confirm all of the following:

- The apex serves valid TLS and the expected static site.
- `www` returns one permanent `301` to the same apex path with all query parameters preserved.
- `/`, `/areyou`, `/robots.txt`, and `/favicon.png` succeed.
- A missing route returns status `404` and the custom 404 UI without changing the browser URL.
- Hashed asset and HTML cache headers are correct.
- Metadata, responsive images, modal interactions, gallery navigation, desktop layout, and mobile layout work.
- No HTML or network request contains a Netlify runtime URL.
- A same-commit workflow dispatch can deploy and validate successfully.

After cutover, take another Route 53 snapshot and prove that only the authorized apex/`www` records plus CloudFormation-managed ACM validation and aliases changed.

## Recovery

### Failed pre-cutover deployment

Do not change DNS. Continue serving the old records while fixing the artifact, workflow, or edge distribution. The Amplify and CloudFront generated URLs remain available for diagnosis.

### Failed custom-domain cutover

If pre-provisioning fails while `EnableDnsCutover=false`, leave DNS unchanged and redeploy with both flags false.

If the DNS-cutover update fails and rolls back after the legacy records were deleted, inspect Route 53 first. Restore only the original apex A and `www` CNAME when the CloudFormation-managed apex/`www` aliases are absent. Never attempt to restore legacy records over aliases that still exist.

If cutover reached `UPDATE_COMPLETE` but production is unhealthy, first remove only the stack-owned traffic aliases while retaining the ready certificate and distribution:

```bash
aws cloudformation deploy \
  --region us-east-1 \
  --stack-name diloreto-amplify-hosting \
  --template-file infrastructure/amplify-hosting.yml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides EnableCustomDomain=true EnableDnsCutover=false
```

Wait for `UPDATE_COMPLETE`, confirm the stack-owned A/AAAA aliases are gone, and immediately restore only the original apex A and `www` CNAME from `.aws-migration/route53-before.json`. Do not replay the whole snapshot. After legacy DNS is restored, the certificate and CloudFront aliases can optionally be removed with a second deployment using `EnableCustomDomain=false EnableDnsCutover=false`. The generated Amplify and CloudFront URLs remain available throughout.

### Bad application release

Re-run the workflow with a known-good commit or revert the bad commit on `main`. The workflow rebuilds that exact source and publishes a fresh Amplify artifact. CloudFront disables caching for HTML and all non-fingerprinted files; content-addressed `/assets/*` files retain immutable caching and use new filenames.

### Full decommission

First disable the custom domain and verify DNS ownership. Delete the stack only when the Amplify origin, edge distribution, OIDC provider, and deployment role are no longer needed. Stack deletion is not the normal release rollback mechanism.

## Operational notes

- The CloudFront Function is intentionally small and contains no application data.
- CloudFront disables caching for default behavior paths and uses a dedicated policy only for content-addressed `/assets/*` files.
- Asset query strings are cached separately and forwarded to Amplify.
- Error caching is disabled so missing paths are not retained at the edge.
- The image pipeline emits many responsive variants; monitor artifact size and Amplify/CloudFront transfer over time.
- Generated archives, DNS snapshots, Playwright reports, and migration evidence remain ignored and must not be committed.
