import { defineConfig, defineRecipe } from "@pandacss/dev";

/* =====================================================================
   my-wallet — Panda CSS configuration
   Mirrors claude-design/panda.config.ts 1:1.
   Theme switches via data-theme attribute on <html>:
     conditions: { light: '[data-theme=light] &', dark: '[data-theme=dark] &' }
   Use semantic tokens in components — never raw palette.
   ===================================================================== */

const button = defineRecipe({
  className: "btn",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2",
    h: "48px",
    px: "5",
    fontFamily: "sans",
    fontSize: "sm",
    fontWeight: "semibold",
    borderRadius: "md",
    border: "1px solid transparent",
    cursor: "pointer",
    transition: "all 220ms cubic-bezier(0.16,1,0.3,1)",
    _active: { transform: "translateY(1px) scale(0.99)" },
    _focusVisible: { outline: "none", boxShadow: "0 0 0 3px token(colors.focusRing)" },
    _disabled: { opacity: 0.45, pointerEvents: "none" },
  },
  variants: {
    variant: {
      primary: {
        bg: "primary",
        color: "primaryText",
        _hover: { bg: "primaryHover", boxShadow: "glow" },
      },
      secondary: {
        bg: "surface2",
        color: "text",
        borderColor: "border",
        _hover: { bg: "surface3" },
      },
      ghost: { bg: "transparent", color: "textMuted", _hover: { bg: "surface2", color: "text" } },
      danger: { bg: "expenseSoft", color: "expenseFg" },
    },
    size: {
      sm: { h: "38px", px: "4", fontSize: "xs", borderRadius: "sm" },
      md: {},
      lg: { h: "56px", px: "6", fontSize: "md", borderRadius: "lg" },
    },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

const card = defineRecipe({
  className: "card",
  base: { bg: "surface", border: "1px solid", borderColor: "border", borderRadius: "lg", p: "5" },
  variants: { elevated: { true: { boxShadow: "md" } } },
});

const badge = defineRecipe({
  className: "badge",
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    h: "24px",
    px: "10px",
    borderRadius: "full",
    fontSize: "2xs",
    fontWeight: "semibold",
  },
  variants: {
    tone: {
      income: { bg: "incomeSoft", color: "incomeFg" },
      expense: { bg: "expenseSoft", color: "expenseFg" },
      accent: { bg: "accentSoft", color: "accent" },
      neutral: { bg: "surface3", color: "textMuted" },
    },
  },
  defaultVariants: { tone: "neutral" },
});

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  exclude: [],
  jsxFramework: "react",

  conditions: {
    light: "[data-theme=light] &",
    dark: "[data-theme=dark] &",
  },

  theme: {
    extend: {
      tokens: {
        colors: {
          n: {
            0: { value: "#ffffff" },
            50: { value: "oklch(0.978 0.004 88)" },
            100: { value: "oklch(0.955 0.005 88)" },
            200: { value: "oklch(0.912 0.006 88)" },
            300: { value: "oklch(0.842 0.007 88)" },
            400: { value: "oklch(0.715 0.008 88)" },
            500: { value: "oklch(0.595 0.008 88)" },
            600: { value: "oklch(0.480 0.008 88)" },
            700: { value: "oklch(0.372 0.008 88)" },
            800: { value: "oklch(0.282 0.008 88)" },
            850: { value: "oklch(0.232 0.008 88)" },
            900: { value: "oklch(0.190 0.008 88)" },
            950: { value: "oklch(0.155 0.007 88)" },
            975: { value: "oklch(0.128 0.006 88)" },
          },
          gold: {
            200: { value: "oklch(0.920 0.055 90)" },
            300: { value: "oklch(0.880 0.080 89)" },
            400: { value: "oklch(0.840 0.100 88)" },
            500: { value: "oklch(0.800 0.118 87)" },
            600: { value: "oklch(0.730 0.116 84)" },
            700: { value: "oklch(0.640 0.104 82)" },
            800: { value: "oklch(0.520 0.085 82)" },
          },
          neon: { 500: { value: "oklch(0.840 0.150 185)" } },
          income: { value: "oklch(0.720 0.150 157)" },
          expense: { value: "oklch(0.645 0.185 26)" },
          cat: {
            food: { value: "oklch(0.720 0.150 45)" },
            transport: { value: "oklch(0.700 0.130 245)" },
            home: { value: "oklch(0.720 0.130 162)" },
            shopping: { value: "oklch(0.700 0.150 330)" },
            health: { value: "oklch(0.690 0.160 18)" },
            fun: { value: "oklch(0.690 0.150 295)" },
            bills: { value: "oklch(0.730 0.120 205)" },
            savings: { value: "oklch(0.800 0.118 87)" },
          },
        },
        fonts: {
          display: { value: "var(--font-display), system-ui, sans-serif" },
          sans: { value: "var(--font-sans), system-ui, sans-serif" },
          mono: { value: "var(--font-mono), ui-monospace, monospace" },
        },
        fontSizes: {
          "2xs": { value: "0.6875rem" },
          xs: { value: "0.75rem" },
          sm: { value: "0.875rem" },
          md: { value: "1rem" },
          lg: { value: "1.125rem" },
          xl: { value: "1.375rem" },
          "2xl": { value: "1.75rem" },
          "3xl": { value: "2.25rem" },
          "4xl": { value: "3rem" },
        },
        fontWeights: {
          regular: { value: "400" },
          medium: { value: "500" },
          semibold: { value: "600" },
          bold: { value: "700" },
        },
        radii: {
          xs: { value: "6px" },
          sm: { value: "10px" },
          md: { value: "14px" },
          lg: { value: "18px" },
          xl: { value: "24px" },
          "2xl": { value: "32px" },
          full: { value: "999px" },
        },
        spacing: {
          1: { value: "0.25rem" },
          2: { value: "0.5rem" },
          3: { value: "0.75rem" },
          4: { value: "1rem" },
          5: { value: "1.25rem" },
          6: { value: "1.5rem" },
          8: { value: "2rem" },
          10: { value: "2.5rem" },
          12: { value: "3rem" },
          16: { value: "4rem" },
        },
      },

      semanticTokens: {
        colors: {
          bg: { value: { base: "{colors.n.975}", _light: "{colors.n.50}" } },
          surface: { value: { base: "{colors.n.950}", _light: "{colors.n.0}" } },
          surface2: { value: { base: "{colors.n.900}", _light: "{colors.n.50}" } },
          surface3: { value: { base: "{colors.n.850}", _light: "{colors.n.100}" } },
          border: { value: { base: "oklch(0.282 0.008 88 / 0.9)", _light: "{colors.n.200}" } },
          borderStrong: { value: { base: "{colors.n.700}", _light: "{colors.n.300}" } },
          text: { value: { base: "{colors.n.50}", _light: "{colors.n.900}" } },
          textMuted: { value: { base: "{colors.n.400}", _light: "{colors.n.600}" } },
          textSubtle: { value: { base: "{colors.n.500}", _light: "{colors.n.500}" } },
          primary: { value: { base: "{colors.gold.500}", _light: "{colors.n.900}" } },
          primaryHover: { value: { base: "{colors.gold.400}", _light: "{colors.n.800}" } },
          primaryText: { value: { base: "oklch(0.20 0.02 88)", _light: "{colors.n.0}" } },
          accent: { value: { base: "{colors.gold.400}", _light: "{colors.gold.700}" } },
          accentSoft: {
            value: { base: "oklch(0.800 0.118 87 / 0.14)", _light: "oklch(0.800 0.118 87 / 0.16)" },
          },
          incomeFg: { value: { base: "oklch(0.800 0.150 158)", _light: "oklch(0.620 0.140 157)" } },
          incomeSoft: { value: "oklch(0.720 0.150 157 / 0.16)" },
          expenseFg: { value: { base: "oklch(0.730 0.160 26)", _light: "oklch(0.560 0.180 26)" } },
          expenseSoft: { value: "oklch(0.645 0.185 26 / 0.16)" },
          focusRing: {
            value: { base: "oklch(0.800 0.118 87 / 0.55)", _light: "oklch(0.640 0.104 82 / 0.5)" },
          },
        },
        shadows: {
          sm: {
            value: {
              base: "0 1px 2px oklch(0 0 0 / 0.4)",
              _light: "0 1px 2px oklch(0.4 0.01 88 / 0.06)",
            },
          },
          md: {
            value: {
              base: "0 6px 20px -6px oklch(0 0 0 / 0.55)",
              _light: "0 8px 24px -10px oklch(0.3 0.01 88 / 0.16)",
            },
          },
          lg: {
            value: {
              base: "0 24px 60px -18px oklch(0 0 0 / 0.7)",
              _light: "0 28px 60px -24px oklch(0.3 0.01 88 / 0.22)",
            },
          },
          glow: {
            value:
              "0 0 0 1px oklch(0.800 0.118 87 / 0.30), 0 8px 32px -8px oklch(0.800 0.118 87 / 0.35)",
          },
        },
      },

      recipes: { button, card, badge },
    },
  },

  outdir: "styled-system",
});
