# Skill: write-spec

## Purpose

Create a feature specification file in `/specs/` before any implementation begins.  
A spec is the source of truth. No code is written without an approved spec.

---

## When to use

When the developer requests a new feature, endpoint, component, or any non-trivial change.

---

## Process

1. **Run grill-me first.** Before writing anything, follow `skills/grill-me.md` to extract full context from the developer. Do not skip this step even if the request seems clear.
2. **Write the spec** using the template below.
3. **Present the spec** to the developer for review.
4. **Wait for explicit approval** before moving to implementation. "Looks good", "ok", "yes" count as approval.
5. **Update the spec** if the developer requests changes. Repeat from step 3.

---

## File location

```
/specs/<domain>-<feature>.md
```

Examples:

- `/specs/expenses-create.md`
- `/specs/dashboard-summary.md`
- `/specs/auth-login.md`

---

## Template

````md
# Spec: [Feature name]

## Goal

One or two sentences. What problem does this solve and for whom?

## Scope

What is included. What is explicitly out of scope.

## Data model changes

List any additions or changes to `schema.prisma`.  
Write "None" if no changes are needed.

## API

List every endpoint this feature requires.

### [METHOD] /api/[resource]

**Request**
\```ts
// body / query params
\```

**Response — success**
\```ts
{ data: T }
\```

**Response — error**
\```ts
{ error: { message: string; code: string } }
\```

**Validation rules**

- field: rule

## UI

List every component or page change required.  
For each component: name, location, what it renders, what it does.  
Write "None" if this is a backend-only feature.

## Zod schemas

List schemas needed (API + forms).  
Write "None" if not applicable.

## Edge cases & error states

List what can go wrong and how it should be handled.

## Open questions

List anything that needs a decision before or during implementation.  
Remove this section when all questions are resolved.
````

---

## Rules

- Never skip the **Open questions** section if anything is unclear.
- Never start implementing until the developer explicitly approves the spec.
- If a question arises **during implementation**, stop, update the spec with the open question, and ask the developer before continuing.
