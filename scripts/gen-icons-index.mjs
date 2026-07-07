import { readdirSync, writeFileSync } from "fs";
import { join, basename } from "path";

const outDir = join(process.cwd(), "src/components/common/Icon/generated");
const files = readdirSync(outDir).filter((f) => f.endsWith(".tsx"));

const exports = files
  .map((f) => {
    const name = basename(f, ".tsx");
    return `export { default as ${name} } from './${name}'`;
  })
  .join("\n");

const iconNames = files.map((f) => `'${basename(f, ".tsx")}'`).join(" | ");

const content = `${exports}

export type IconName = ${iconNames}
`;

writeFileSync(join(outDir, "index.ts"), content);
console.log(`Generated index.ts with ${files.length} icons`);
