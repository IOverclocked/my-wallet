import type { NodePlopAPI } from "plop";

export default function setupPlop(plop: NodePlopAPI) {
  plop.setGenerator("component", {
    description: "Create a new component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name:",
        filter: (v: string) => v.replace(/^use/i, "").replace(/^(.)/, (c) => c.toUpperCase()),
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
      {
        type: "add",
        path: "src/components/{{category}}/{{name}}/index.ts",
        templateFile: "plop-templates/component/index.ts.hbs",
      },
    ],
  });

  plop.setGenerator("hook", {
    description: "Create a new custom hook",
    prompts: [
      {
        type: "input",
        name: "name",
        message: 'Hook name (without "use"):',
        filter: (v: string) => v.replace(/^use/i, "").replace(/^(.)/, (c) => c.toUpperCase()),
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/hooks/use{{name}}/use{{name}}.ts",
        templateFile: "plop-templates/hook/useHook.ts.hbs",
      },
      {
        type: "add",
        path: "src/hooks/use{{name}}/use{{name}}.test.ts",
        templateFile: "plop-templates/hook/useHook.test.ts.hbs",
      },
      {
        type: "add",
        path: "src/hooks/use{{name}}/index.ts",
        templateFile: "plop-templates/hook/index.ts.hbs",
      },
    ],
  });

  plop.setGenerator("store", {
    description: "Create a new Zustand store",
    prompts: [
      {
        type: "input",
        name: "name",
        message: 'Store name (without "use" / "Store"):',
        filter: (v: string) =>
          v
            .replace(/^use/i, "")
            .replace(/Store$/i, "")
            .replace(/^(.)/, (c) => c.toUpperCase()),
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/stores/use{{name}}Store/use{{name}}Store.ts",
        templateFile: "plop-templates/store/store.ts.hbs",
      },
      {
        type: "add",
        path: "src/stores/use{{name}}Store/types.ts",
        templateFile: "plop-templates/store/types.ts.hbs",
      },
      {
        type: "add",
        path: "src/stores/use{{name}}Store/use{{name}}Store.test.ts",
        templateFile: "plop-templates/store/store.test.ts.hbs",
      },
      {
        type: "add",
        path: "src/stores/use{{name}}Store/index.ts",
        templateFile: "plop-templates/store/index.ts.hbs",
      },
    ],
  });
}
