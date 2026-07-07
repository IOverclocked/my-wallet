# my-wallet — Design System

Premium, dark-first design system for a PWA household-finance app.
Light + dark, gold brand accent, neon reserved for data viz. Mobile-first.

## What's here

| File                    | Purpose                                                                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `Design System.html`    | **Start here.** Documentation: brand, color, type, spacing, icons, components, Panda mapping.                                       |
| `App Prototype.html`    | Fully interactive mobile prototype (login → dashboard → activity → add → accounts → insights → categories).                         |
| `styles/tokens.css`     | **Single source of truth** for all tokens (colors, type, spacing, radius, shadows). Light/dark via `[data-theme]`.                  |
| `styles/components.css` | Component CSS built on the tokens (buttons, fields, cards, lists, nav, chips, badges, sheet/modal).                                 |
| `styles/icons.js`       | Outline icon sprite (`<svg class="ico"><use href="#i-NAME"/></svg>`).                                                               |
| `panda.config.ts`       | Ready Panda CSS config — tokens + semanticTokens + button/card/badge recipes. Mirrors `tokens.css` 1:1.                             |
| `app/`                  | Prototype source (React + Babel): `data` (mock data + i18n), `ui` (primitives, charts, login, add-sheet), `screens`, `app` (shell). |
| `frames/`               | iOS device bezel used to present the prototype.                                                                                     |

## Implementing with Panda

1. Drop `panda.config.ts` into your project root (adjust `include`/`outdir`).
2. Theme is driven by `data-theme="dark|light"` on `<html>`. The config registers `light`/`dark` conditions, base = dark.
3. Use **semantic tokens** in components: `css({ bg: 'bg', color: 'text', borderColor: 'border' })` — never raw palette.
4. Recipes `button`, `card`, `badge` map to the class names shown in the docs, so porting markup is mechanical.

## Token rules (important)

- **Gold = brand.** Primary CTA in dark; in light it becomes near-black ink with gold as accent/highlight.
- **Green = income, coral = expense.** Reserved for transaction _events_ only. Balances stay neutral.
- **Neon = data viz only.** Never decorative.
- **Amounts** use the mono face with tabular figures, sign-led (`+ / −`).

## Languages

Strings ship EN + PL (`app/data.jsx → STR`). Toggle in the prototype top bar.
