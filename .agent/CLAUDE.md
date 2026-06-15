# CLAUDE.md — My Wallet

## Project

Personal finance PWA for tracking income and expenses.  
Stack: Next.js 16.1.6, App Router, TypeScript, Prisma 7.3, PostgreSQL, Panda CSS, Zod 4, Storybook, Vitest.

---

## Structure

```
app/
  api/                          # Route Handlers (backend)
    expenses/
      route.ts                  # GET /api/expenses, POST /api/expenses
      [id]/route.ts             # GET, PATCH, DELETE /api/expenses/:id
      summary/route.ts
      summary-by-category/route.ts
    incomes/
      route.ts
      [id]/route.ts
      summary/route.ts
      summary-by-category/route.ts
    dashboard/route.ts
  generated/prisma/             # Auto-generated Prisma client — never edit manually
  layout.tsx
  page.tsx

src/
  components/
    common/                     # Generic, reusable UI (Button, Input, Modal, Badge)
    fields/                     # Form field components (TextField, SelectField, DateField)
    features/                   # Domain-specific components (ExpenseForm, IncomeList)
    layouts/                    # Structural components (Sidebar, Header, PageWrapper)
  hooks/                        # Custom React hooks (use<Name>/ folders)
  stores/                       # Zustand stores (use<Name>Store/ folders)

lib/
  db.ts                         # Prisma client singleton

prisma/
  schema.prisma                 # Source of truth for the data model

plop-templates/                 # Plop.js generators
.agent/specs/                   # Feature specifications (SDD)
.agent/skills/                  # Skill files for recurring tasks
```

---

## Data model

Models: `User`, `Account`, `Category` (type: EXPENSE | INCOME), `Income`, `Expense`.  
All entities belong to a `User`. `Income` and `Expense` are linked to an `Account` and a `Category`.

---

## API conventions

All Route Handlers return one of two shapes:

```ts
// Success
{
  data: T;
}

// Error
{
  error: {
    message: string;
    code: string;
  }
}
```

Error codes: `NOT_FOUND`, `VALIDATION_ERROR`, `UNAUTHORIZED`, `INTERNAL_ERROR`.

Walidacja: Zod 4 — zarówno requestów w Route Handlers, jak i formularzy po stronie klienta.

---

## Component structure

Each component lives in its own folder:

```
src/components/common/Button/
  index.ts          # re-export
  Button.tsx
  Button.styles.ts  # Panda CSS styles (recipes / patterns)
  Button.test.tsx   # Vitest
  Button.stories.tsx
```

---

## Plop generators

Available generators (run `pnpm plop`):

| Generator   | Output location                     | What it creates                                                       |
| ----------- | ----------------------------------- | --------------------------------------------------------------------- |
| `component` | `src/components/<category>/<Name>/` | `.tsx`, `.styles.ts`, `.test.tsx`, `.stories.tsx`, `index.ts`         |
| `hook`      | `src/hooks/use<Name>/`              | `use<Name>.ts`, `use<Name>.test.ts`, `index.ts`                       |
| `store`     | `src/stores/use<Name>Store/`        | `use<Name>Store.ts`, `types.ts`, `use<Name>Store.test.ts`, `index.ts` |
| `api-route` | `app/api/<resource>/`               | `route.ts` (and optionally `[id]/route.ts`)                           |

---

## Testing

Framework: Vitest.  
Every component has a `.test.tsx` sibling.  
Run: `pnpm test`

---

## Storybook

Every component in `src/components/` has a `.stories.tsx` file.  
Run: `pnpm storybook`

---

## SDD Workflow

This project uses **Spec-Driven Development**. Follow this order strictly:

```
1. SPEC     → create or update a file in .agent/specs/
2. REVIEW   → wait for developer approval before writing any code
3. IMPLEMENT → follow the spec step by step, one logical unit at a time
4. VERIFY   → developer reviews each unit before moving to the next
```

### Rules

- **Never write code without an approved spec.**
- **Never implement multiple units at once.** One endpoint, one component, one migration at a time.
- **When the spec is ambiguous or incomplete — stop and ask.** Do not make assumptions silently.
- **When anything is unclear during implementation — stop and ask.** Do not push through.
- Use the relevant skill from `.agent/skills/` for every recurring task.

### Spec conventions

- **Language:** English only.
- **Location:** `.agent/specs/`
- **Naming:** `<NNN>-<domain>-<feature>.md` — always include a zero-padded 3-digit number prefix (e.g. `001-tooling-plop-generators.md`, `002-expenses-create.md`).

---

## Skills

| File                         | Use when                                              |
| ---------------------------- | ----------------------------------------------------- |
| `skills/grill-me.md`         | Extracting full context before writing a spec         |
| `skills/write-spec.md`       | Writing a new feature spec (runs grill-me internally) |
| `skills/api-endpoint.md`     | Creating or modifying a Route Handler                 |
| `skills/component.md`        | Creating a new component                              |
| `skills/prisma-migration.md` | Changing `schema.prisma`                              |
| `skills/plop-generator.md`   | Adding or modifying a Plop generator                  |

Always read the relevant skill before starting the task.
