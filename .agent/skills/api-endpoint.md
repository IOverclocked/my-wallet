# Skill: api-endpoint

## Purpose

Create or modify a Route Handler in `app/api/`.  
Always follow the project API conventions defined in `CLAUDE.md`.

---

## When to use

When the spec requires a new endpoint or a change to an existing one.

---

## Process

1. **Read the spec.** Locate the relevant `/specs/*.md` file. Do not start without it.
2. **Check for existing route.** If `route.ts` already exists, read it before making any changes.
3. **Implement one endpoint at a time.** Present it to the developer before moving to the next.
4. **Stop and ask** if anything in the spec is unclear or missing.

---

## File location

```
app/api/<resource>/route.ts           # collection: GET, POST
app/api/<resource>/[id]/route.ts      # single resource: GET, PATCH, DELETE
app/api/<resource>/<sub>/route.ts     # derived data: GET
```

---

## Route Handler template

```ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { db } from "@/lib/db";

// Zod schema — define close to the handler
const bodySchema = z.object({
  // fields here
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: { message: "Validation failed", code: "VALIDATION_ERROR" } },
        { status: 400 }
      );
    }

    const result = await db.<model>.create({
      data: parsed.data,
    });

    return NextResponse.json({ data: result }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: { message: "Internal server error", code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}
```

---

## Response conventions

Always use the shapes defined in `CLAUDE.md`:

```ts
// Success
return NextResponse.json({ data: result }, { status: 200 });

// Created
return NextResponse.json({ data: result }, { status: 201 });

// Not found
return NextResponse.json(
  { error: { message: "Resource not found", code: "NOT_FOUND" } },
  { status: 404 },
);

// Validation error
return NextResponse.json(
  { error: { message: "Validation failed", code: "VALIDATION_ERROR" } },
  { status: 400 },
);

// Internal error
return NextResponse.json(
  { error: { message: "Internal server error", code: "INTERNAL_ERROR" } },
  { status: 500 },
);
```

---

## Prisma client

Always import from the singleton:

```ts
import { db } from "@/lib/db";
```

Never instantiate `PrismaClient` directly in a route file.

---

## Zod import

Project uses Zod 4. Always import as:

```ts
import { z } from "zod/v4";
```

---

## Rules

- One `route.ts` per resource level — do not mix collection and single-resource handlers in one file.
- Validate every incoming request body and query param with Zod.
- Never return raw Prisma errors to the client.
- Always handle the `try/catch` — never leave an unhandled promise.
- After writing each handler, wait for developer approval before continuing to the next.
