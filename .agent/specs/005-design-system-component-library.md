# Spec: Design System — Component Library

## Goal

Implement the my-wallet design system as a production-ready React component library built on Panda CSS.
Provides the token foundation, icon pipeline, theme management, and all UI primitives needed to assemble application screens in a subsequent spec.

## Scope

**Included:**

- Panda CSS configuration (tokens + semantic tokens + recipes) migrated from `claude-design/panda.config.ts`
- Font loading via `next/font/google` wired into `app/layout.tsx`
- SVG icon pipeline: SVGR script + source icons folder
- Zustand theme store with `data-theme` binding on `<html>`
- Component library split into four categories (atoms, molecules, fields, layouts)
- Storybook stories per variant for every component
- Vitest tests (rendering + interactions where applicable)

**Out of scope:**

- Application screens (Dashboard, Activity, Insights, Accounts, Categories, Login)
- API integration in components (all components are presentational or use local state only)
- Authentication / user session
- Real data fetching

## Data model changes

None.

## API

None.

---

## Implementation plan

### Phase 1 — Foundation

#### 1.1 Panda CSS config

Replace `panda.config.ts` in project root with the full config from `claude-design/panda.config.ts`.

Changes vs. current empty config:

- Add full token set: neutral ramp, gold ramp, neon, income, expense, category accents
- Add semantic tokens resolving per theme (`base` = dark, `_light` = light)
- Add recipes: `button`, `card`, `badge`
- Keep `include: ['./src/**/*.{ts,tsx}', './app/**/*.{ts,tsx}']` and `outdir: 'styled-system'`
- Remove `@pandacss/preset-panda` (design system is self-contained, preset would override tokens)

File: `panda.config.ts`

#### 1.2 Font loading

Update `app/layout.tsx`:

- Load `Sora` (weights: 400, 500, 600, 700) → CSS variable `--font-display`
- Load `Plus_Jakarta_Sans` (weights: 400, 500, 600, 700) → CSS variable `--font-sans`
- Load `JetBrains_Mono` (weights: 400, 500, 600, 700) → CSS variable `--font-mono`
- Apply variables on `<html>` element
- Set `data-theme="dark"` as default on `<html>`
- Update page `<title>` and `<meta description>` to "my-wallet"

Remove Geist fonts.

#### 1.3 Global CSS

Create `app/globals.css` (replaces current placeholder):

- Import `styled-system/styles.css` (Panda output)
- Copy CSS custom properties from `claude-design/styles/tokens.css` (raw palette + semantic tokens per `[data-theme]`)
- Base body styles (font-family, color, background, antialiasing)

> Note: CSS custom properties from `tokens.css` are used directly — they are the source of truth for runtime theming. Panda tokens reference them via `value` fields.

#### 1.4 Theme store

File: `src/stores/useThemeStore/useThemeStore.ts`

```ts
type Theme = "dark" | "light";

interface ThemeStore {
  theme: Theme;
  toggle: () => void;
  setTheme: (theme: Theme) => void;
}
```

- Reads initial value from `localStorage` key `mw-theme`, falls back to `'dark'`
- On every change: writes to `localStorage` and sets `document.documentElement.dataset.theme`
- Hook export: `useTheme()` — returns `{ theme, toggle, setTheme }`

Files (per plop `store` generator):

- `src/stores/useThemeStore/useThemeStore.ts`
- `src/stores/useThemeStore/types.ts`
- `src/stores/useThemeStore/useThemeStore.test.ts`
- `src/stores/useThemeStore/index.ts`

#### 1.5 Icon pipeline

Install: `@svgr/cli`

Source folder: `src/assets/icons/` — SVG files copied from `claude-design/styles/icons.js` (extracted as individual files).

Script added to `package.json`:

```json
"gen:icons": "svgr --typescript --out-dir src/components/common/Icon/generated src/assets/icons"
```

SVGR config file `.svgrrc.json`:

```json
{
  "icon": true,
  "typescript": true,
  "svgProps": { "aria-hidden": "true", "focusable": "false" },
  "template": "svgr-template.cjs"
}
```

Custom template `svgr-template.cjs` — generates components that:

- Accept `size?: number | string` (default `20`)
- Accept `className?: string`
- Accept `color?: string` (maps to `fill="currentColor"` / `stroke="currentColor"`)
- Are named exports: `export const IconWallet = ...`

Auto-generated barrel: `src/components/common/Icon/generated/index.ts`

Wrapper component: `src/components/common/Icon/Icon.tsx`

```ts
interface IconProps {
  name: keyof typeof icons; // type-safe icon name
  size?: number | string;
  className?: string;
}
```

Renders the corresponding generated component by name.

---

### Phase 2 — Atoms

> **Rule:** Follow the global plop rule from `.agent/CLAUDE.md` — every component is scaffolded with `pnpm plop` (`component` generator) before any code is written.

Each atom lives in `src/components/common/<Name>/` following the plop `component` template structure.

#### 2.1 Button

Panda recipe: `button` (from `panda.config.ts`)

Props:

```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  icon?: boolean; // square icon-only button
  loading?: boolean;
}
```

Variants: primary, secondary, ghost, danger  
Sizes: sm (38px), md (48px), lg (56px)  
Modifiers: fullWidth, icon-only, loading (disabled + spinner)  
FAB is a separate component `Fab` in the same folder — circular, 60px, primary background, large shadow + glow.

Stories: one story per variant × size combination + fullWidth + icon-only + loading + Fab.  
Tests: renders correct Panda class per variant/size, `onClick` fires, disabled prevents click, loading renders spinner.

#### 2.2 Icon

Described in Phase 1.5. Wrapper component only — no additional stories beyond a grid of all icons.  
Tests: renders SVG element, applies size prop.

#### 2.3 Badge

Panda recipe: `badge`

Props:

```ts
interface BadgeProps {
  tone?: "income" | "expense" | "accent" | "neutral";
  children: React.ReactNode;
}
```

Stories: one per tone.  
Tests: renders correct tone class.

#### 2.4 Chip

Props:

```ts
interface ChipProps {
  pressed?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

Renders `<button>` with `aria-pressed`. Active state: inverted (text bg, inverse text color).

Stories: default, pressed, with icon prefix.  
Tests: renders `aria-pressed` correctly, `onClick` fires.

#### 2.5 Amount

Props:

```ts
interface AmountProps {
  value: number;
  currency?: string; // default 'PLN'
  showCurrency?: boolean; // default true
  sign?: boolean; // force show sign (default: sign shown only for non-neutral tone)
  tone?: "income" | "expense" | "neutral";
  size?: string; // CSS font-size value
  weight?: number;
}
```

Rules:

- Positive + tone=income → green, prefix `+`
- Negative + tone=expense → coral, prefix `−`
- tone=neutral → no color override
- Monospace font, `tnum` feature setting
- Currency shown as muted suffix (0.7em, text-subtle)

Formatting: `Intl.NumberFormat` with `minimumFractionDigits: 2`.

Stories: income, expense, neutral, large balance hero (no currency).  
Tests: correct sign prefix, correct class per tone, currency rendering.

#### 2.6 CategoryTile

Props:

```ts
interface CategoryTileProps {
  category:
    | "food"
    | "transport"
    | "home"
    | "shopping"
    | "health"
    | "fun"
    | "bills"
    | "savings"
    | "salary";
  size?: "sm" | "md" | "lg"; // default 'md'
}
```

Maps category → icon name + CSS class `cat--<category>`. Sizes: sm (36px), md (44px), lg (56px).

Category-to-icon map (static constant, co-located in `CategoryTile.tsx`):

```ts
const CATEGORY_META: Record<Category, { icon: IconName; cls: string }> = { ... }
```

Stories: all categories × all sizes.  
Tests: renders correct icon and class per category.

#### 2.7 Card

Panda recipe: `card`

Props:

```ts
interface CardProps {
  elevated?: boolean;
  flush?: boolean; // no padding
  children: React.ReactNode;
  className?: string;
}
```

Stories: default, elevated, flush.  
Tests: renders elevated class when prop set.

#### 2.8 BalanceCard

Props:

```ts
interface BalanceCardProps {
  children: React.ReactNode;
  className?: string;
}
```

Purely a styled surface (gradient background, gold glow, xl radius). Content is passed as children. No data props — assembling content is the screen's responsibility.

Stories: one story with mock balance content inside.  
Tests: renders without crashing.

---

### Phase 3 — Molecules

#### 3.1 TransactionRow

Props:

```ts
interface TransactionRowProps {
  title: string;
  category: Category;
  account: string;
  time: string;
  amount: number;
  currency?: string;
  recurring?: boolean;
  onClick?: () => void;
}
```

Composes: `CategoryTile` + text block + `Amount` + optional recurring `Badge`.  
Hover: `surface-2` background.

Stories: expense row, income row, recurring row.  
Tests: renders title, amount with correct tone, recurring badge when prop set, `onClick` fires.

#### 3.2 AccountRow

Props:

```ts
interface AccountRowProps {
  name: string;
  subtitle: string;
  icon: IconName;
  category: Category;
  balance: number;
  currency?: string;
  goal?: number;
  onClick?: () => void;
}
```

Composes: `CategoryTile` (lg) + text block + `Amount` + optional progress bar (when `goal` provided).

Stories: basic account, account with goal progress.  
Tests: renders balance, progress bar only when goal provided.

#### 3.3 Sheet

Props:

```ts
interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
```

- Renders `overlay` + `sheet` divs
- Overlay click → `onClose`
- Scroll lock on `<body>` when open
- Grip handle at top
- `z-index: var(--z-overlay)`

Stories: open sheet with mock content.  
Tests: renders children when open, calls `onClose` on overlay click.

---

### Phase 4 — Fields

#### 4.1 Field

Wrapper component providing label + input slot + helper/error text.

Props:

```ts
interface FieldProps {
  label?: string;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}
```

Stories: with label, with error state.  
Tests: renders label, renders error class on children wrapper.

#### 4.2 Input

Props:

```ts
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "amount";
  prefix?: React.ReactNode; // icon or element shown left
  suffix?: React.ReactNode; // element shown right (e.g. eye toggle)
  error?: boolean;
}
```

Amount variant: mono font, 2xl size, right-aligned, 64px height.  
Prefix renders in `input-group` wrapper with left padding offset.

Stories: default, with prefix icon, amount variant, error state.  
Tests: renders prefix, applies error class, onChange fires.

#### 4.3 Select

Props:

```ts
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}
```

Styled `<select>` using same token classes as `Input`.

Stories: default, with options, error state.  
Tests: renders options, onChange fires.

#### 4.4 Switch

Props:

```ts
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}
```

Stories: off, on, disabled.  
Tests: calls onChange with toggled value, does not fire when disabled.

#### 4.5 Segment

Props:

```ts
interface SegmentProps {
  value: "income" | "expense";
  onChange: (value: "income" | "expense") => void;
}
```

Two-button segmented control. Active button highlighted per tone (income=green label, expense=coral label).  
`role="tablist"` + `role="tab"` + `aria-selected` on buttons.

Stories: income selected, expense selected.  
Tests: calls onChange with correct value on click, aria-selected reflects current value.

---

### Phase 5 — Layouts

#### 5.1 TabBar + Tab

TabBar props:

```ts
interface TabBarProps {
  children: React.ReactNode;
}
```

Tab props:

```ts
interface TabProps {
  icon: IconName;
  label: string;
  active?: boolean;
  onClick?: () => void;
  fab?: boolean; // renders as FAB slot (no label, elevated)
}
```

`TabBar` renders the frosted-glass bottom bar with `safe-area-inset-bottom` padding.  
Active `Tab` uses `aria-current="page"`, icon color = `--accent`.  
FAB tab renders `<Fab>` component inside the tab slot, floating 28px above bar.

Stories: full nav bar with all 5 tabs, home active, activity active.  
Tests: active tab has `aria-current="page"`, `onClick` fires.

---

## Zod schemas

None — this spec covers presentational components only. Form validation schemas will be defined in screen-level specs.

## Edge cases & error states

| Case                | Handling                                                                             |
| ------------------- | ------------------------------------------------------------------------------------ |
| Amount = 0          | Rendered as `0.00` with no sign, neutral tone                                        |
| Amount value is NaN | Render `—` fallback                                                                  |
| Icon name not found | TypeScript prevents invalid names at compile time; runtime: render nothing           |
| Theme store on SSR  | `localStorage` access guarded by `typeof window !== 'undefined'`; default = `'dark'` |
| Sheet open + scroll | `overflow: hidden` on `<body>` while Sheet is open, restored on close                |
| Category not in map | CategoryTile falls back to generic tag icon + muted color                            |

## Open questions

None — all decisions resolved during grill-me session.
