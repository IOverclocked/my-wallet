# Spec: Tooling — Conventional Commits

## Goal

Enforce consistent commit message format using Conventional Commits, with an interactive prompt (commitizen) that guides the developer through type, scope, and description selection.

## Scope

**Included:**

- Install and configure `commitizen` with `cz-customizable` adapter
- Install and configure `commitlint` with `@commitlint/config-conventional`
- Add `commit-msg` husky hook to validate commit messages via commitlint
- Add `pnpm commit` script as the entry point for interactive commits
- Define initial predefined scope list (extensible via config file)

**Out of scope:**

- Changelog generation (e.g. `standard-version`, `release-please`)
- Semantic versioning or automated releases
- CI enforcement of commit format (pre-commit hook is the enforcement mechanism)

## Data model changes

None

## API

None

## UI

None — tooling only.

## Zod schemas

None

---

## Implementation steps

### 1. Install dependencies

```bash
pnpm add -D commitizen cz-customizable @commitlint/cli @commitlint/config-conventional
```

### 2. Configure commitizen in `package.json`

Add the following to `package.json`:

```json
"config": {
  "commitizen": {
    "path": "cz-customizable"
  }
}
```

### 3. Create `.cz-config.js`

This is the extensible config file — add new scopes here as the project grows.

```js
module.exports = {
  types: [
    { value: "feat", name: "feat:      A new feature" },
    { value: "fix", name: "fix:       A bug fix" },
    { value: "docs", name: "docs:      Documentation only changes" },
    {
      value: "style",
      name: "style:     Changes that do not affect the meaning of the code (formatting, missing semi-colons, etc)",
    },
    {
      value: "refactor",
      name: "refactor:  A code change that neither fixes a bug nor adds a feature",
    },
    { value: "perf", name: "perf:      A code change that improves performance" },
    { value: "test", name: "test:      Adding missing tests or correcting existing tests" },
    {
      value: "build",
      name: "build:     Changes that affect the build system or external dependencies",
    },
    { value: "ci", name: "ci:        Changes to CI configuration files and scripts" },
    { value: "chore", name: "chore:     Other changes that don't modify src or test files" },
    { value: "revert", name: "revert:    Reverts a previous commit" },
  ],

  scopes: [
    { name: "expenses" },
    { name: "incomes" },
    { name: "dashboard" },
    { name: "auth" },
    { name: "ui" },
    { name: "db" },
    { name: "config" },
  ],

  allowCustomScopes: false,
  allowBreakingChanges: ["feat", "fix"],

  messages: {
    type: "Select the type of change you are committing:",
    scope: "Select the scope of this change (required):",
    subject: "Write a short, imperative tense description of the change:\n",
    body: 'Provide a longer description of the change (optional). Use "|" to break new line:\n',
    breaking: "List any breaking changes (optional):\n",
    footer: "List any issues closed by this change (optional, e.g. #123):\n",
    confirmCommit: "Are you sure you want to proceed with the commit above?",
  },

  subjectLimit: 100,
};
```

### 4. Create `commitlint.config.js`

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-empty": [2, "never"],
  },
};
```

`"scope-empty": [2, "never"]` enforces that scope is always required.

### 5. Add `commit-msg` husky hook

```bash
echo 'pnpm exec commitlint --edit $1' > .husky/commit-msg
```

On Windows, create `.husky/commit-msg` manually:

```sh
pnpm exec commitlint --edit $1
```

### 6. Add `commit` script to `package.json`

```json
"commit": "cz"
```

Developer workflow: instead of `git commit`, run `pnpm commit`.

---

## Edge cases & error states

- `allowCustomScopes: false` in `.cz-config.js` ensures only predefined scopes are selectable — to add a new scope, edit the `scopes` array in `.cz-config.js`.
- `commitlint` validates messages even when written manually (e.g. via IDE git integration) — the `commit-msg` hook blocks non-conforming messages regardless of how the commit is created.
- `cz-customizable` requires the config to be in `.cz-config.js` at the project root by default — do not rename or move this file without updating `package.json` config path.

## Open questions

None — all decisions confirmed by the developer.
