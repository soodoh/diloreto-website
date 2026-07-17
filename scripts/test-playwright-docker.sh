#!/usr/bin/env bash
set -euo pipefail

readonly image_name="diloreto-playwright:local"
readonly repository_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "${repository_root}"
mkdir -p playwright-report test-results

if [[ "${PLAYWRIGHT_SKIP_BUILD:-0}" != "1" ]]; then
	bun run build
	bun run check:output
fi

docker build \
	--file Dockerfile.playwright \
	--tag "${image_name}" \
	.

docker_args=(
	--rm
	--init
	--ipc host
	--user "$(id -u):$(id -g)"
	--env CI=1
	--env HOME=/tmp/playwright-home
	--env PLAYWRIGHT_OUTPUT_ROOT=/output
	--volume "${repository_root}/tests:/app/tests"
	--volume "${repository_root}:/output"
)

if [[ -n "${PLAYWRIGHT_BASE_URL:-}" ]]; then
	docker_args+=(--env "PLAYWRIGHT_BASE_URL=${PLAYWRIGHT_BASE_URL}")
fi

docker run "${docker_args[@]}" "${image_name}" \
	bun x playwright test "$@"
