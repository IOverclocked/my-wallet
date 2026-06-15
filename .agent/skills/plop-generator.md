# Skill: plop-generator

## Purpose

Add or modify Plop.js generators in the project.  
Generators automate scaffolding of repetitive file structures — components, hooks, stores, API routes.

---

## When to use

- When a new type of file structure is needed that has no existing generator.
- When an existing generator needs to be updated (e.g. new file added to component structure).

---

## Process

1. **Read the spec.** Confirm what file structure the generator should produce.
2. **Read existing generators.** Always read `plopfile.ts` and relevant files in `plop-templates/` before making changes.
3. **Propose the generator.** Show the developer the generator definition and template files before writing anything.
4. **Wait for approval.**
5. **Implement** — update `plopfile.ts` and add template files in `plop-templates/`.
6. **Test the generator.** Run `pnpm plop <generator-name>` and verify the output.
7. **Show the output** to the developer for final confirmation.

---

## File structure

```
plopfile.ts
plop-templates/
  component/
    index.ts.hbs
    Component.tsx.hbs
    Component.styles.ts.hbs
    Component.test.tsx.hbs
    Component.stories.tsx.hbs
  hook/
    useHook.ts.hbs
    useHook.test.ts.hbs
  store/
    store.ts.hbs
  api-route/
    route.ts.hbs
```

---

## Generators

### `component`

Prompts:

- `name` — PascalCase component name (e.g. `ExpenseCard`)
- `category` — select from: `common`, `fields`, `features`, `layouts`

Output:

```
src/components/<category>/<Name>/
  index.ts
  <Name>.tsx
  <Name>.styles.ts
  <Name>.test.tsx
  <Name>.stories.tsx
```

### `hook`

Prompts:

- `name` — camelCase without `use` prefix (e.g. `expenses` → `useExpenses`)

Output:

```
src/hooks/
  use<Name>.ts
  use<Name>.test.ts
```

### `store`

Prompts:

- `name` — camelCase store name (e.g. `wallet`)

Output:

```
src/stores/
  <name>Store.ts
```

### `api-route`

Prompts:

- `resource` — kebab-case resource name (e.g. `expenses`)
- `type` — select from: `collection` (route.ts), `single` ([id]/route.ts), `both`

Output:

```
app/api/<resource>/route.ts
app/api/<resource>/[id]/route.ts     # if single or both
```

---

## Plopfile template

```ts
import { NodePlopAPI } from "plop";

export default function (plop: NodePlopAPI) {
  plop.setGenerator("component", {
    description: "Create a new component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name (PascalCase):",
      },
      {
        type: "list",
        name: "category",
        message: "Category:",
        choices: ["common", "fields", "features", "layouts"],
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{category}}/{{name}}/index.ts",
        templateFile: "plop-templates/component/index.ts.hbs",
      },
      {
        type: "add",
        path: "src/components/{{category}}/{{name}}/{{name}}.tsx",
        templateFile: "plop-templates/component/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "src/components/{{category}}/{{name}}/{{name}}.styles.ts",
        templateFile: "plop-templates/component/Component.styles.ts.hbs",
      },
      {
        type: "add",
        path: "src/components/{{category}}/{{name}}/{{name}}.test.tsx",
        templateFile: "plop-templates/component/Component.test.tsx.hbs",
      },
      {
        type: "add",
        path: "src/components/{{category}}/{{name}}/{{name}}.stories.tsx",
        templateFile: "plop-templates/component/Component.stories.tsx.hbs",
      },
    ],
  });
}
```

---

## Handlebars helpers available in Plop

| Helper                | Input          | Output         |
| --------------------- | -------------- | -------------- |
| `{{name}}`            | `ExpenseCard`  | `ExpenseCard`  |
| `{{camelCase name}}`  | `ExpenseCard`  | `expenseCard`  |
| `{{pascalCase name}}` | `expense card` | `ExpenseCard`  |
| `{{kebabCase name}}`  | `ExpenseCard`  | `expense-card` |
| `{{lowerCase name}}`  | `ExpenseCard`  | `expensecard`  |

---

## Rules

- Never modify `plop-templates/` files used by existing generators without checking the impact.
- Always test the generator after implementation — do not assume it works.
- Generated files must match the templates defined in `skills/component.md`, `skills/api-endpoint.md`, and other relevant skills.
- After implementing a generator, delete the test output before committing.
