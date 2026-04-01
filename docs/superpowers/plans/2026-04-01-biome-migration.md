# Biome Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace oxlint + Prettier with Biome as the single linter/formatter, using Biome's recommended defaults.

**Architecture:** Remove four packages (oxlint, oxlint-tsgolint, @standard-config/oxlint, prettier), add @biomejs/biome. Replace three config files with one `biome.json`. Update package.json scripts and lefthook hooks.

**Tech Stack:** Biome, Lefthook, bun

**Spec:** `docs/superpowers/specs/2026-04-01-biome-migration-design.md`

---

### Task 1: Remove old dependencies and add Biome

**Files:**

- Modify: `package.json`

- [ ] **Step 1: Remove oxlint, oxlint-tsgolint, @standard-config/oxlint, and prettier**

```bash
bun remove oxlint oxlint-tsgolint @standard-config/oxlint prettier
```

- [ ] **Step 2: Add @biomejs/biome as a dev dependency**

```bash
bun add -d @biomejs/biome
```

- [ ] **Step 3: Verify package.json no longer has the old deps and has biome**

Run: `grep -E "oxlint|prettier|biome" package.json`

Expected: only `@biomejs/biome` appears in devDependencies (plus any unrelated matches like `tw-animate-css`).

- [ ] **Step 4: Commit**

```bash
git add package.json bun.lock
git commit -m "chore: replace oxlint + prettier with biome"
```

---

### Task 2: Create biome.json

**Files:**

- Create: `biome.json`

- [ ] **Step 1: Create `biome.json` at the project root**

```json
{
  "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
  "files": {
    "ignore": [
      "node_modules/**",
      ".output/**",
      "dist/**",
      "src/routeTree.gen.ts"
    ]
  },
  "linter": {
    "rules": {
      "style": {
        "noRestrictedImports": {
          "level": "error",
          "options": {
            "paths": {
              "react": {
                "importNames": ["default"],
                "message": "Use named imports from 'react' instead."
              }
            }
          }
        }
      }
    }
  }
}
```

This uses Biome's recommended defaults for both formatter and linter, adds the custom no-default-React-import rule, and sets the ignore patterns from the spec.

- [ ] **Step 2: Verify biome can parse the config**

```bash
bunx biome check --max-diagnostics=0 biome.json
```

Expected: no config errors.

- [ ] **Step 3: Commit**

```bash
git add biome.json
git commit -m "chore: add biome.json configuration"
```

---

### Task 3: Run Biome to reformat and lint-fix the codebase

**Files:**

- Modify: all `.ts`, `.tsx`, `.json`, `.css` files in `src/` and root

- [ ] **Step 1: Run biome check with fix on the entire codebase**

```bash
bunx biome check --fix .
```

This will reformat all supported files to Biome defaults (tabs, double quotes, etc.) and apply safe lint fixes.

- [ ] **Step 2: Review the output for any errors that couldn't be auto-fixed**

If there are remaining lint errors, review and fix them manually. Run again:

```bash
bunx biome check .
```

Expected: no errors (or only warnings).

- [ ] **Step 3: Commit the reformatted codebase**

```bash
git add -A
git commit -m "style: reformat codebase with biome defaults"
```

This commit should be added to `.git-blame-ignore-revs` later (see Task 7).

---

### Task 4: Update package.json scripts

**Files:**

- Modify: `package.json`

- [ ] **Step 1: Update the `lint` and `lint:fix` scripts**

Change the scripts in `package.json` from:

```json
"lint": "oxlint && prettier --check .",
"lint:fix": "oxlint --fix && prettier --write .",
```

To:

```json
"lint": "biome check .",
"lint:fix": "biome check --fix .",
```

- [ ] **Step 2: Verify the scripts work**

```bash
bun run lint
```

Expected: exits 0 with no errors.

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "chore: update lint scripts to use biome"
```

---

### Task 5: Update lefthook.yml

**Files:**

- Modify: `lefthook.yml`

- [ ] **Step 1: Replace the pre-commit section**

Replace the entire contents of `lefthook.yml` with:

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

This merges the previous `lint` and `format` commands into a single `check` command, and scopes the glob to file types Biome supports. The `commit-msg` hook is unchanged.

- [ ] **Step 2: Verify the hook works by making a trivial change and committing**

```bash
bun run lint
```

Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add lefthook.yml
git commit -m "chore: update lefthook to use biome"
```

---

### Task 6: Delete old config files

**Files:**

- Delete: `.prettierrc`
- Delete: `.prettierignore`
- Delete: `oxlint.config.ts`

- [ ] **Step 1: Remove the old config files**

```bash
rm .prettierrc .prettierignore oxlint.config.ts
```

- [ ] **Step 2: Commit**

```bash
git add .prettierrc .prettierignore oxlint.config.ts
git commit -m "chore: remove oxlint and prettier config files"
```

---

### Task 7: Add .git-blame-ignore-revs

**Files:**

- Create or modify: `.git-blame-ignore-revs`

- [ ] **Step 1: Get the commit hash of the reformatting commit from Task 3**

```bash
git log --oneline | grep "reformat codebase with biome"
```

- [ ] **Step 2: Create `.git-blame-ignore-revs`**

```
# Biome migration: reformat codebase with Biome defaults
<commit-hash-from-step-1>
```

- [ ] **Step 3: Configure git to use it locally**

```bash
git config blame.ignoreRevsFile .git-blame-ignore-revs
```

- [ ] **Step 4: Commit**

```bash
git add .git-blame-ignore-revs
git commit -m "chore: add git-blame-ignore-revs for biome reformat"
```

---

### Task 8: Update CLAUDE.md

**Files:**

- Modify: `CLAUDE.md`

- [ ] **Step 1: Update the "Coding Style & Naming Conventions" section**

Replace:

```markdown
Formatting is enforced via Prettier (`.prettierrc`):

- 2-space indentation, semicolons, trailing commas, single quotes.
- `printWidth: 140`.
```

With:

```markdown
Formatting and linting are enforced via Biome (`biome.json`):

- Tab indentation, semicolons, trailing commas, double quotes (Biome defaults).
- Biome supports JS/TS/JSX/TSX, JSON, and CSS. It does not format HTML, Markdown, or YAML.
```

- [ ] **Step 2: Add lint commands to the "Build, Test, and Development Commands" section**

Add these two lines after the existing commands:

```markdown
- `bun run lint`: check formatting and lint rules.
- `bun run lint:fix`: auto-fix formatting and lint issues.
```

- [ ] **Step 3: Verify the file reads correctly**

Read through `CLAUDE.md` to confirm the changes make sense in context.

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for biome migration"
```

---

### Task 9: Final verification

- [ ] **Step 1: Run the full lint check**

```bash
bun run lint
```

Expected: exits 0 with no errors.

- [ ] **Step 2: Run the build to make sure nothing is broken**

```bash
bun run build
```

Expected: successful build.

- [ ] **Step 3: Verify the dev server starts**

```bash
bun run dev &
sleep 5
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
kill %1
```

Expected: HTTP 200.
