module.exports = {
  types: [
    { value: "feat", name: "feat:      A new feature" },
    { value: "fix", name: "fix:       A bug fix" },
    { value: "docs", name: "docs:      Documentation only changes" },
    {
      value: "style",
      name: "style:     Changes that do not affect the meaning of the code (formatting, missing semi-colons, etc)",
    },
    {
      value: "refactor",
      name: "refactor:  A code change that neither fixes a bug nor adds a feature",
    },
    { value: "perf", name: "perf:      A code change that improves performance" },
    {
      value: "test",
      name: "test:      Adding missing tests or correcting existing tests",
    },
    {
      value: "build",
      name: "build:     Changes that affect the build system or external dependencies",
    },
    { value: "ci", name: "ci:        Changes to CI configuration files and scripts" },
    {
      value: "chore",
      name: "chore:     Other changes that don't modify src or test files",
    },
    { value: "revert", name: "revert:    Reverts a previous commit" },
  ],

  // Add new scopes here as the project grows
  scopes: [
    { name: "expenses" },
    { name: "incomes" },
    { name: "dashboard" },
    { name: "auth" },
    { name: "ui" },
    { name: "db" },
    { name: "config" },
  ],

  allowCustomScopes: false,
  allowBreakingChanges: ["feat", "fix"],

  messages: {
    type: "Select the type of change you are committing:",
    scope: "Select the scope of this change (required):",
    subject: "Write a short, imperative tense description of the change:\n",
    body: 'Provide a longer description of the change (optional). Use "|" to break new line:\n',
    breaking: "List any breaking changes (optional):\n",
    footer: "List any issues closed by this change (optional, e.g. #123):\n",
    confirmCommit: "Are you sure you want to proceed with the commit above?",
  },

  subjectLimit: 100,
};
