# Skill: grill-me

## Purpose

Extract full context from the developer before writing a spec or starting any implementation.  
The goal is to leave no ambiguity — ask until everything needed to write a perfect spec is known.

---

## When to use

- Explicitly: when the developer says "grill me", "ask me questions", or "use grill-me".
- Automatically: as the first phase of `skills/write-spec.md` before writing anything.

---

## Process

1. **Read the initial request.** Identify what is known and what is missing.
2. **Ask questions one at a time.** Never ask multiple questions at once.
3. **With each question, provide a recommendation and alternatives.** Format every question as:
   - The question itself
   - **Recommended:** one option with a one-line rationale grounded in best practices
   - **Alternatives:** 2–3 other valid options, each with a one-line trade-off
4. **Go deep.** Each answer may reveal new unknowns — keep asking until nothing is ambiguous.
5. **Cover all areas.** Use the checklist below as a guide.
6. **Summarize.** When done, present a structured summary of everything collected and ask: "Is this complete and correct? Can I proceed?"
7. **Wait for confirmation** before moving on.

---

## Question areas checklist

Work through these areas. Not all apply to every feature — skip what is clearly irrelevant.

### Goal & context

- What problem does this feature solve?
- Who is the user and what are they trying to achieve?
- Why now — is there a trigger or dependency?

### Scope

- What is explicitly included?
- What is explicitly out of scope?
- Are there any edge cases that must be handled?

### Data

- What data is created, read, updated, or deleted?
- Are there any schema changes needed?
- What are the validation rules for each field?
- Are there any constraints (unique, required, min/max, format)?

### API

- What endpoints are needed?
- What does the request look like (body, params, query)?
- What does the success response look like?
- What errors can occur and how should they be handled?

### UI

- What does the user see?
- What interactions are there (clicks, inputs, submissions)?
- What happens on loading, empty state, error state?
- Are there any animations or transitions?
- Mobile or desktop or both?

### Business rules

- Are there any rules that go beyond simple validation?
- Are there calculations, aggregations, or derived values?
- Are there permissions or access restrictions?

### Dependencies

- Does this feature depend on another feature that is not yet built?
- Does it affect any existing feature?

---

## Rules

- Ask one question at a time — never list multiple questions in one message.
- Always accompany a question with a recommendation and alternatives based on best practices.
- Do not assume. If something could mean two different things, ask which one.
- Do not proceed to writing a spec until the summary is confirmed.
- If the developer says "you decide" or "whatever is best" on a critical decision — make a recommendation and ask them to confirm it rather than silently proceeding.
