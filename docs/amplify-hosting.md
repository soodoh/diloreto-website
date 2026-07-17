# AWS Amplify Hosting operations

The site is a fully static Amplify Hosting app in `us-east-1`. CloudFormation owns the Amplify app, `main` branch, optional custom domain, GitHub OIDC provider, and GitHub deployment role. GitHub Actions owns artifact publication only.

## Bootstrap

1. Authenticate locally and verify the intended account:

   ```sh
   aws login --region us-east-1
   aws sts get-caller-identity
   ```

2. Confirm the account owns the public `diloreto.com` Route 53 zone. Export all records to an ignored recovery file before any DNS change:

   ```sh
   mkdir -p .aws-migration
   aws route53 list-resource-record-sets \
     --hosted-zone-id YOUR_HOSTED_ZONE_ID \
     > .aws-migration/route53-before.json
   ```

3. Check whether the account already has the GitHub provider:

   ```sh
   aws iam list-open-id-connect-providers
   ```

4. Create the initial stack **without** the custom domain. If a GitHub provider already exists, pass its ARN as `ExistingGitHubOidcProviderArn`.

   ```sh
   aws cloudformation deploy \
     --region us-east-1 \
     --stack-name diloreto-amplify-hosting \
     --template-file infrastructure/amplify-hosting.yml \
     --capabilities CAPABILITY_NAMED_IAM \
     --parameter-overrides EnableCustomDomain=false
   ```

5. Read the generated values:

   ```sh
   aws cloudformation describe-stacks \
     --region us-east-1 \
     --stack-name diloreto-amplify-hosting \
     --query 'Stacks[0].Outputs' \
     --output table
   ```

## GitHub environment

Create a `production` environment restricted to the `main` branch. Configure these environment variables from the stack outputs; none are secrets:

- `AWS_REGION=us-east-1`
- `AWS_ROLE_ARN` from `GitHubDeploymentRoleArn`
- `AMPLIFY_APP_ID` from `AmplifyAppId`
- `AMPLIFY_BRANCH` from `AmplifyBranchName`
- `AMPLIFY_DEFAULT_DOMAIN` from `AmplifyDefaultDomain`

The deployment role trusts the legacy subject used by this repository (created before July 15, 2026):

```text
repo:soodoh/diloreto-website:environment:production
```

Do not add AWS access keys to GitHub. The deploy job receives short-lived credentials through GitHub OIDC.

## Validate and deploy

Run the same checks used by CI:

```sh
bun install --frozen-lockfile
bun run check
```

The workflow validates pull requests to `main`. Pushes to `main` validate and then publish a ZIP containing the **contents** of `dist/client`. A manual `workflow_dispatch` can redeploy a selected commit or tag after it passes the same validation.

The workflow calls only:

1. `aws amplify create-deployment`
2. an authenticated `PUT` to the returned one-time ZIP upload URL
3. `aws amplify start-deployment`
4. `aws amplify get-job` until `SUCCEED`

## Domain cutover

Do not enable the custom domain until the default branch URL passes route, asset, image, modal, carousel, cache, and 404 checks.

Immediately before cutover, save and re-read the exact targeted records. Delete only the stale apex A record that points to `75.2.60.5` and the stale `www` CNAME that points to `diloreto.netlify.com`. Do not alter MX, SPF, verification, DKIM, NS, SOA, or unrelated subdomain records.

Enable the domain through CloudFormation:

```sh
aws cloudformation deploy \
  --region us-east-1 \
  --stack-name diloreto-amplify-hosting \
  --template-file infrastructure/amplify-hosting.yml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides EnableCustomDomain=true
```

Poll both CloudFormation and Amplify until the stack is complete and the domain reports `AVAILABLE` with update status `UPDATE_COMPLETE`:

```sh
aws amplify get-domain-association \
  --region us-east-1 \
  --app-id YOUR_APP_ID \
  --domain-name diloreto.com
```

Amplify manages the certificate and Route 53 alias records because the hosted zone and Amplify app are in the same account.

## Verification

Verify the default branch URL before cutover and the canonical domain afterward:

```sh
curl -sSIL https://diloreto.com/
curl -sSIL https://diloreto.com/areyou
curl -sSIL https://diloreto.com/robots.txt
curl -sSIL https://diloreto.com/favicon.png
curl -sSIL https://diloreto.com/not-a-real-route
curl -sSIL 'https://www.diloreto.com/areyou?source=verification'
PLAYWRIGHT_BASE_URL=https://diloreto.com bun run test:smoke
```

Confirm the nonexistent path returns HTTP 404, `www` returns 301 to the same apex path and query, `/assets/*` uses immutable caching, HTML uses `no-cache`, TLS covers apex and `www`, and no HTML or request URL references Netlify.

## Recovery and redeployment

For a bad release, dispatch the `Deploy AWS Amplify` workflow with a previously known-good commit SHA. The workflow rebuilds, retests, and republishes that exact ref through the same OIDC role. Amplify keeps prior jobs visible for diagnosis, but recovery should use the audited workflow rather than console uploads.

If custom-domain activation fails before DNS is healthy, update the stack with `EnableCustomDomain=false` and inspect the domain status reason. Restore DNS only from `.aws-migration/route53-before.json`, and only after comparing every proposed change; there is no Netlify rollback target.

Infrastructure changes always use `aws cloudformation deploy` locally after review. GitHub Actions is intentionally not permitted to call CloudFormation, IAM, or Route 53.
