# Skill: component

## Purpose

Create a new React component in `src/components/`.  
Every component is a folder with a fixed set of files.

---

## When to use

When the spec requires a new UI component — whether common, field, feature, or layout.

---

## Process

1. **Read the spec.** Locate the relevant `/specs/*.md` file. Do not start without it.
2. **Determine the category.** See the category guide below.
3. **Use Plop.** Run `pnpm plop component` to scaffold the folder. Do not create files manually.
4. **Implement one component at a time.** Present it to the developer before moving to the next.
5. **Stop and ask** if anything in the spec is unclear or missing.

---

## Category guide

| Category   | Location                   | Use for                                                              |
| ---------- | -------------------------- | -------------------------------------------------------------------- |
| `common`   | `src/components/common/`   | Generic, reusable UI — Button, Input, Modal, Badge, Card             |
| `fields`   | `src/components/fields/`   | Form field wrappers — TextField, SelectField, DateField, AmountField |
| `features` | `src/components/features/` | Domain-specific — ExpenseForm, IncomeList, CategoryBadge             |
| `layouts`  | `src/components/layouts/`  | Structural — Sidebar, Header, PageWrapper, BottomNav                 |

If unsure which category fits, ask the developer before creating.

---

## File structure

Every component lives in its own folder:

```
src/components/<category>/<ComponentName>/
  index.ts                 # re-export only
  <ComponentName>.tsx      # component implementation
  <ComponentName>.styles.ts  # Panda CSS recipes / patterns
  <ComponentName>.test.tsx   # Vitest unit tests
  <ComponentName>.stories.tsx  # Storybook stories
```

---

## File templates

### `index.ts`

```ts
export { <ComponentName> } from "./<ComponentName>";
```

### `<ComponentName>.tsx`

```tsx
import { css } from "@/styled-system/css";
import { <componentName>Styles } from "./<ComponentName>.styles";

interface <ComponentName>Props {
  // props here
}

export function <ComponentName>({ ...props }: <ComponentName>Props) {
  return (
    <div className={<componentName>Styles.root()}>
      {/* implementation */}
    </div>
  );
}
```

### `<ComponentName>.styles.ts`

```ts
import { sva } from "@/styled-system/css";

export const <componentName>Styles = sva({
  slots: ["root"],
  base: {
    root: {
      // base styles
    },
  },
  variants: {
    // variants here
  },
});
```

### `<ComponentName>.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { <ComponentName> } from "./<ComponentName>";

describe("<ComponentName>", () => {
  it("renders without crashing", () => {
    render(<ComponentName />);
    // assertions here
  });
});
```

### `<ComponentName>.stories.tsx`

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { <ComponentName> } from "./<ComponentName>";

const meta: Meta<typeof <ComponentName>> = {
  title: "<category>/<ComponentName>",
  component: <ComponentName>,
};

export default meta;
type Story = StoryObj<typeof <ComponentName>>;

export const Default: Story = {
  args: {
    // default props
  },
};
```

---

## Panda CSS conventions

- Use `sva` (slot recipe) for components with multiple parts.
- Use `cva` (recipe) for single-element components with variants.
- Use `css()` for one-off styles that don't need variants.
- Never use inline styles.
- Never use Tailwind classes.

---

## Rules

- Always use `'use client'` only when the component needs browser APIs, event handlers, or React state/effects. Server Component is the default.
- Never put business logic inside a component — keep components presentational where possible.
- Every component must have a test file and a stories file, even if minimal.
- After scaffolding and implementing each component, wait for developer approval before continuing.
