# Spec: Plop Generators — component, hook, store

## Goal

Standardize file creation in the project using Plop.js generators.  
The developer runs `pnpm plop`, selects a generator, and gets a ready folder structure with boilerplate files.

## Scope

**Included:**

- `component` generator — creates a React component with styles, tests, stories, and barrel export
- `hook` generator — creates a custom hook with a test file and barrel export
- `store` generator — creates a Zustand store with types, test, and barrel export
- Automatic PascalCase correction of the first letter of the base name
- Automatic `use` prefix (hook, store) and `Store` suffix (store) added by the generator

**Out of scope:**

- `api-route` generator (separate spec)
- Modification of existing files
- Integration / e2e test generation

## Data model changes

None

## API

None

## UI

None — this feature concerns developer tooling only (CLI).

## Zod schemas

None

---

## Generators

### `component`

**Invocation:** `pnpm plop` → select `component`

**CLI prompts:**

1. `Component name` — base name (e.g. `button` → auto-corrected to `Button`)
2. `Category` — select from: `common` | `fields` | `features` | `layouts`

**Generated files** in `src/components/<category>/<Name>/`:

| File                 | Content                                                                          |
| -------------------- | -------------------------------------------------------------------------------- |
| `<Name>.tsx`         | Functional React component with TypeScript                                       |
| `<Name>.styles.ts`   | Panda CSS `recipe` with `cva`, empty `variants: {}`                              |
| `<Name>.test.tsx`    | Vitest boilerplate: `describe('<Name>', () => { it('renders', () => { ... }) })` |
| `<Name>.stories.tsx` | Storybook: `meta` + one `Default` story                                          |
| `index.ts`           | Re-export: `export { default } from './<Name>'`                                  |

---

### `hook`

**Invocation:** `pnpm plop` → select `hook`

**CLI prompts:**

1. `Hook name` — base name without `use` prefix (e.g. `auth` → auto-corrected to `Auth` → file `useAuth`)

**Generated files** in `src/hooks/use<Name>/`:

| File                | Content                                                                         |
| ------------------- | ------------------------------------------------------------------------------- |
| `use<Name>.ts`      | `use<Name>` function with TypeScript, returns empty object                      |
| `use<Name>.test.ts` | Vitest boilerplate: `describe('use<Name>', () => { it('...', () => { ... }) })` |
| `index.ts`          | Re-export: `export { use<Name> } from './use<Name>'`                            |

---

### `store`

**Invocation:** `pnpm plop` → select `store`

**CLI prompts:**

1. `Store name` — base name without `use` prefix and `Store` suffix (e.g. `wallet` → auto-corrected to `Wallet` → file `useWalletStore`)

**Generated files** in `src/stores/use<Name>Store/`:

| File                     | Content                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `use<Name>Store.ts`      | Zustand `create<T>()` with types imported from `./types`                             |
| `types.ts`               | `<Name>State` and `<Name>Actions` interfaces                                         |
| `use<Name>Store.test.ts` | Vitest boilerplate: `describe('use<Name>Store', () => { it('...', () => { ... }) })` |
| `index.ts`               | Re-export: `export { use<Name>Store } from './use<Name>Store'`                       |

---

## Edge cases & error states

- Developer provides a lowercase name → generator automatically capitalizes the first letter
- Developer adds `use` prefix to hook or store name → generator strips it before adding its own (prevents `useUseAuth`)
- Developer adds `Store` suffix to store name → generator strips it (prevents `useWalletStoreStore`)
- Folder already exists → Plop prompts about overwrite by default; no forced skip

## Open questions

None — all decisions confirmed by the developer.
