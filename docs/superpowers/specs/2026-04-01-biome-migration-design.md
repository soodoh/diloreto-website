# Replace oxlint + Prettier with Biome

**Date:** 2026-04-01
**Status:** Approved

## Goal

Consolidate linting and formatting into a single tool (Biome) to reduce tooling complexity. Start fresh with Biome's recommended defaults rather than matching the previous configuration exactly.

## Approach

Clean swap: remove oxlint and Prettier entirely, install Biome, reformat the codebase in one pass, update all related config/scripts/hooks.

## Dependencies

### Remove

- `oxlint`
- `oxlint-tsgolint`
- `@standard-config/oxlint`
- `prettier`

### Add

- `@biomejs/biome`

### Keep

- `lefthook`
- `@commitlint/cli`, `@commitlint/config-conventional`, `@commitlint/types`

## Configuration

A single `biome.json` at the project root replaces `.prettierrc`, `.prettierignore`, and `oxlint.config.ts`.

### Formatter

Biome defaults: tabs, double quotes, semicolons, trailing commas.

**Note:** Biome supports formatting JS/TS/JSX/TSX, JSON, and CSS. It does not format HTML, Markdown, or YAML. Those file types will no longer be auto-formatted by a pre-commit hook. If this becomes an issue, a dedicated formatter (e.g., Prettier for just those types) can be added later.

### Linter

Biome's `recommended` ruleset, plus a custom rule to ban default React imports (`import React from 'react'`).

### Ignore patterns

- `node_modules`
- `.output`
- `dist`
- `src/routeTree.gen.ts`

## Scripts

**package.json:**

- `lint` -> `biome check .`
- `lint:fix` -> `biome check --fix .`
- `prepare` -> unchanged (`lefthook install`)

## Lefthook

**pre-commit** merges the previous two commands into one:

```yaml
pre-commit:
  parallel: true
  commands:
    check:
      glob: "*.{js,jsx,ts,tsx,css,json}"
      run: bunx biome check --fix {staged_files}
      stage_fixed: true

commit-msg:
  commands:
    commitlint:
      run: bunx commitlint --edit {1}
```

## Files to delete

- `.prettierrc`
- `.prettierignore`
- `oxlint.config.ts`

## Migration steps

1. Remove old dependencies, add `@biomejs/biome`
2. Create `biome.json` with recommended defaults, ignore patterns, and the no-default-React-import rule
3. Run `biome check --fix .` to reformat/lint-fix the entire codebase
4. Update `package.json` scripts (`lint`, `lint:fix`)
5. Update `lefthook.yml` (merge lint + format commands into one `biome check` command)
6. Delete `.prettierrc`, `.prettierignore`, `oxlint.config.ts`
7. Commit the reformatting separately so it can be added to `.git-blame-ignore-revs`
8. Update `CLAUDE.md` to reflect the new tooling (replace Prettier/oxlint references with Biome, update commands)

## CLAUDE.md updates

- Replace Prettier formatting description with Biome defaults (tabs, double quotes)
- Update lint/format commands to reference `biome check`
- Remove references to `.prettierrc`
