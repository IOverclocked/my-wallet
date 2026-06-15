import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],
  include: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
});
