# Skill: prisma-migration

## Purpose

Make changes to `prisma/schema.prisma` and apply them to the database safely.  
Schema is the source of truth for the data model — never edit the database directly.

---

## When to use

When the spec requires adding, modifying, or removing models, fields, relations, or enums.

---

## Process

1. **Read the spec.** Check the "Data model changes" section. Do not modify schema without it.
2. **Read the current schema.** Always read `prisma/schema.prisma` before making any changes.
3. **Propose the change.** Show the developer the diff (what will be added/changed/removed) before touching the file.
4. **Wait for approval.** Do not modify the schema until the developer confirms.
5. **Apply the change** to `schema.prisma`.
6. **Run the migration.** See commands below.
7. **Verify.** Confirm the migration was applied and the client was regenerated.
8. **Stop and ask** if the migration has any destructive consequences (data loss, breaking changes).

---

## Commands

```bash
# Create and apply a migration (development)
pnpm prisma migrate dev --name <descriptive-name>

# Regenerate Prisma client after schema change
pnpm prisma generate

# Open Prisma Studio to inspect data
pnpm prisma studio
```

Migration name convention: `<action>-<subject>` — e.g. `add-transaction-model`, `add-currency-to-account`, `rename-amount-field`.

---

## Schema conventions

```prisma
model Example {
  id        Int      @id @default(autoincrement())
  // ... fields ...
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

- Every model has `id`, `createdAt`. Add `updatedAt` when the record is mutable.
- Use `Int @id @default(autoincrement())` for primary keys.
- Use `Float` for monetary amounts (until a `Decimal` migration is explicitly requested).
- Use enums for fixed sets of values (e.g. `CategoryType`).
- All relations must have explicit `@relation` with `fields` and `references`.

---

## Destructive changes — stop and ask

Always stop and explicitly ask the developer before:

- Removing a field or model
- Renaming a field (Prisma treats this as drop + add → data loss)
- Changing a field type in a breaking way
- Making an optional field required on a non-empty table

Propose a safe migration strategy (e.g. add new field → backfill → remove old field).

---

## Rules

- Never run `prisma migrate dev` without developer confirmation.
- Never run `prisma migrate reset` without explicit developer instruction — it wipes the database.
- Never edit files in `app/generated/prisma/` — they are auto-generated.
- After every schema change, always run `pnpm prisma generate` to keep the client in sync.
- One migration per logical change — do not batch unrelated schema changes.
