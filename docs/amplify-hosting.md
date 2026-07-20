# AWS Amplify and CloudFront hosting runbook

The site is a static TanStack Start build published to an AWS Amplify `WEB` app in `us-east-1`. CloudFront is the public delivery layer. It supplies the generated `404.html` body with HTTP status `404`, redirects `www` to the apex, redirects `paul.diloreto.com` to `pauldiloreto.com`, and serves the shared edge certificate. Route 53 and ACM complete the custom-domain setup.

CloudFormation owns the Amplify app and branch, CloudFront resources, ACM certificate, Route 53 aliases, GitHub OIDC provider, and deployment role. GitHub Actions only validates and publishes the static artifact to Amplify.

## Architecture

```text
GitHub Actions --OIDC--> Amplify branch origin
                              |
                              v
Route 53 --> CloudFront --> main.<app-id>.amplifyapp.com
               |  |
               |  +-- origin 404 + /404.html => custom body with status 404
               +----- www 301, paul 301, and clean-path request normalization
```

CloudFront uses the Amplify branch domain as a custom HTTPS origin. The distribution exists even while `EnableCustomDomain=false`, so it can be validated before DNS changes. `EnableCustomDomain=true` pre-provisions the ACM certificate and CloudFront aliases while legacy DNS remains live. The separate `EnableDnsCutover=true` gate creates the Route 53 apex/`www` A/AAAA aliases; no Amplify domain association is created.

The exact `paul.diloreto.com` hostname is also owned here because this stack controls the source DNS zone and edge certificate. `EnablePaulRedirect=true` adds only that SAN, CloudFront alias, and viewer-request redirect. `EnablePaulDnsCutover=true` separately creates only its CNAME after the alias is validated. The Carolyn portfolio remains isolated in AWS account `725669362139`: its Amplify app owns only the `carolyn.diloreto.com` association, while this account's shared zone supplies its two cross-account CNAMEs.

## Prerequisites

- AWS CLI authenticated with `aws login` to the intended account.
- GitHub CLI authenticated with repository administration access.
- Bun, Docker, and project dependencies installed.
- `cfn-lint` available at the CI-pinned version, for example through `uvx --from cfn-lint==1.53.0 cfn-lint`.
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
uvx --from cfn-lint==1.53.0 cfn-lint infrastructure/amplify-hosting.yml
aws cloudformation validate-template \
  --region us-east-1 \
  --template-body file://infrastructure/amplify-hosting.yml
```

`bun run check` performs linting, TypeScript checks, a production build, static-output assertions, and the containerized Playwright desktop/mobile visual, smoke, and gallery interaction suites. Static file routes are discovered automatically and must each produce HTML. The hydration-free `404.html` must contain neither scripts nor module preloads. Use `bun run test:playwright:update` to intentionally regenerate visual baselines in the same container used by CI.

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
- Pushes to `main` and explicit workflow dispatches resolve the requested ref to one commit, validate that commit, then assume the AWS role with GitHub OIDC and publish its validated ZIP.

The deploy job:

1. rejects missing configuration;
2. avoids deploying a stale `main` push;
3. requests a one-use signed upload URL without printing it;
4. uploads and starts the Amplify deployment;
5. polls the bounded Amplify job to completion;
6. compares the Amplify origin HTML with CloudFront output;
7. checks edge cache/security headers, assets, routes, and the true custom `404` response;
8. runs the workflow revision's desktop Chromium smoke harness against the deployed CloudFront URL, so rollback targets do not need to contain the latest tests.

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

Review the full record-set diff. Preserve all unrelated records byte-for-byte, especially Proton Mail records and the cross-account `carolyn` CNAMEs.

The original apex/`www` cutover authorized deletion of only:

- apex A `75.2.60.5`
- `www` CNAME `diloreto.netlify.com.`

The later Paul redirect cutover additionally authorizes replacing only the broken `paul` CNAME from `pauldiloreto.com.` to the stack's CloudFront distribution. Do not alter `carolyn`, mail, wildcard, or any other record.

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

### 7.3 Provision the Paul redirect

The existing `paul.diloreto.com CNAME pauldiloreto.com.` resolves but cannot complete TLS because the destination certificate does not cover the source hostname. Replace it in two stages.

First deploy the edge behavior without changing DNS:

```bash
aws cloudformation deploy \
  --region us-east-1 \
  --stack-name diloreto-amplify-hosting \
  --template-file infrastructure/amplify-hosting.yml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    EnableCustomDomain=true \
    EnableDnsCutover=true \
    EnablePaulRedirect=true \
    EnablePaulDnsCutover=false
```

Wait for the stack and distribution, confirm the replacement ACM certificate is `ISSUED`, and verify the staged redirect while preserving the requested TLS name:

```bash
aws cloudfront wait distribution-deployed --id "$DISTRIBUTION_ID"
curl --connect-to "paul.diloreto.com:443:${EDGE_DOMAIN}:443" \
  -I 'https://paul.diloreto.com/hosting-redirect-check/deep/path?source=verification'
```

The response must be `301` with `location: https://pauldiloreto.com/hosting-redirect-check/deep/path?source=verification`. Recheck apex and `www` before continuing.

Next create and inspect a change set with `EnablePaulDnsCutover=true`. Save the current `paul` record as a restoration batch. Immediately before executing the reviewed change set, delete exactly the unmanaged `paul CNAME pauldiloreto.com.` record. CloudFormation cannot adopt that existing record, so the short delete/create transition is intentional. If stack execution fails, restore that exact CNAME and leave the DNS gate disabled while investigating.

After the stack reaches `UPDATE_COMPLETE`, `PaulRedirectRecord` owns `paul.diloreto.com CNAME <distribution>.cloudfront.net.` with a 300-second TTL. Keep all four steady-state gates enabled in future stack updates.

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
curl -I 'https://paul.diloreto.com/hosting-redirect-check/deep/path?source=verification'
PLAYWRIGHT_BASE_URL=https://diloreto.com bun run test:smoke
```

Confirm all of the following:

- The apex serves valid TLS and the expected static site.
- `www` returns one permanent `301` to the same apex path with all query parameters preserved.
- `paul` returns one permanent `301` to `https://pauldiloreto.com` with the same path and query.
- `/`, `/areyou`, `/robots.txt`, `/favicon.png`, and `/apple-touch-icon.png` succeed.
- A missing route returns status `404` and the custom 404 UI without changing the browser URL.
- Hashed asset and HTML cache headers are correct.
- Manual `bun run test:smoke` verification passes its core page navigation, icon metadata, contact and biography dialog, and custom 404 checks.
- Automated post-deployment verification runs `tests/deployment-smoke.spec.ts` in desktop Chromium and confirms that `/` and `/areyou` return usable documents with status `200`.
- No HTML or network request contains a Netlify runtime URL.
- A workflow dispatch reports and deploys one resolved commit SHA even when the requested branch or tag later moves.

After each cutover, take another Route 53 snapshot. For the Paul change, prove that only its old CNAME target, the stack-managed replacement CNAME, and the ACM validation record required by the replacement edge certificate changed. The `carolyn` traffic/validation CNAMEs and every mail record must remain byte-for-byte unchanged.

## Recovery

### Failed pre-cutover deployment

Do not change DNS. Continue serving the old records while fixing the artifact, workflow, or edge distribution. The Amplify and CloudFront generated URLs remain available for diagnosis.

### Failed custom-domain cutover

If pre-provisioning fails while `EnableDnsCutover=false`, leave DNS unchanged and redeploy with both flags false.

If the DNS-cutover update fails and rolls back after the legacy records were deleted, inspect Route 53 first. Restore only the original apex A and `www` CNAME when the CloudFormation-managed apex/`www` aliases are absent. Never attempt to restore legacy records over aliases that still exist.

If the apex/`www` cutover reached `UPDATE_COMPLETE` but production is unhealthy, first remove only the stack-owned apex/`www` traffic aliases while retaining the ready certificate and distribution:

```bash
aws cloudformation deploy \
  --region us-east-1 \
  --stack-name diloreto-amplify-hosting \
  --template-file infrastructure/amplify-hosting.yml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides EnableCustomDomain=true EnableDnsCutover=false
```

Wait for `UPDATE_COMPLETE`, confirm the stack-owned A/AAAA aliases are gone, and immediately restore only the original apex A and `www` CNAME from `.aws-migration/route53-before.json`. Do not replay the whole snapshot. After legacy DNS is restored, the certificate and CloudFront aliases can optionally be removed with a second deployment using `EnableCustomDomain=false EnableDnsCutover=false EnablePaulRedirect=false EnablePaulDnsCutover=false`. The generated Amplify and CloudFront URLs remain available throughout.

If only the Paul redirect is unhealthy, deploy with `EnablePaulDnsCutover=false` while leaving the apex/`www` gates enabled. Confirm the stack-owned Paul CNAME is gone, restore the saved pre-cutover Paul CNAME only if a temporary fallback is required, and keep `EnablePaulRedirect=true` until the edge issue is understood. Removing `EnablePaulRedirect` replaces the shared certificate again and is not the first rollback step.

### Bad application release

Re-run the workflow with a known-good commit or revert the bad commit on `main`. The workflow resolves the requested ref once, rebuilds that exact source, and publishes a fresh Amplify artifact. Post-deployment checks use the workflow revision's smoke harness, so an older target does not need the latest test files. CloudFront disables caching for HTML and all non-fingerprinted files; content-addressed `/assets/*` files retain immutable caching and use new filenames.

### Full decommission

First disable the custom domain and verify DNS ownership. Delete the stack only when the Amplify origin, edge distribution, OIDC provider, and deployment role are no longer needed. Stack deletion is not the normal release rollback mechanism.

## Operational notes

- The CloudFront Function is intentionally small and contains no application data.
- CloudFront disables caching for default behavior paths and uses a dedicated policy only for content-addressed `/assets/*` files.
- Asset query strings are cached separately and forwarded to Amplify.
- Error caching is disabled so missing paths are not retained at the edge.
- CloudFormation drift detection can report `AmplifyApp /CustomHeaders` as modified because Amplify returns the YAML property as normalized JSON. Compare the parsed rules; the representations are semantically equivalent.
- The image pipeline emits many responsive variants; monitor artifact size and Amplify/CloudFront transfer over time.
- Generated archives, DNS snapshots, Playwright reports, and migration evidence remain ignored and must not be committed.
