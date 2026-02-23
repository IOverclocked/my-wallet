import { z, ZodSafeParseError } from 'zod';

function getErrorMessage<T>(parsed: ZodSafeParseError<T>) {
  return parsed.error.issues.map((e) => e.message).join(', ');
}

export const expenseSchema = z.object({
  amount: z.number().positive('Kwota musi być dodatnia'),
  description: z.string().max(200).optional(),
  date: z.coerce.date().optional(),
  accountId: z.number(),
  categoryId: z.number()
});

export const validation = {
  getErrorMessage,
  schema: {
    expense: expenseSchema
  }
};
