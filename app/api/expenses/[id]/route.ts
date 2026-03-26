import { api } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { validation } from '@/lib/validation';
import { NextRequest } from 'next/server';

async function PUTHandler(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const expenseId = Number(id);

  if (!expenseId) return api.clientError('Invalid expense id', 400);

  const body = await req.json();

  const parsed = validation.schema.expense.safeParse(body);

  if (!parsed.success) {
    return api.clientError(validation.getErrorMessage(parsed));
  }

  const existing = await prisma.expense.findUnique({
    where: { id: expenseId }
  });

  if (!existing) return api.clientError('Expense not found', 404);

  const oldAmount = existing.amount;
  const newAmount = parsed.data.amount;
  const delta = oldAmount - newAmount;

  const updated = await prisma.expense.update({
    where: { id: expenseId },
    data: {
      ...parsed.data,
      date: parsed.data.date ?? new Date()
    },
    include: {
      account: true,
      category: true
    }
  });

  await prisma.account.update({
    where: { id: existing.accountId },
    data: { balance: { increment: delta } }
  });

  return api.success(updated);
}

export const PUT = api.withErrorHandling(PUTHandler);

async function DELETEHandler(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const expenseId = Number(id);

  if (!expenseId) return api.clientError('Invalid expense id', 400);

  const existing = await prisma.expense.findUnique({
    where: { id: expenseId }
  });

  if (!existing) return api.clientError('Expense not found', 404);

  await prisma.account.update({
    where: { id: existing.accountId },
    data: { balance: { increment: existing.amount } }
  });

  await prisma.expense.delete({
    where: { id: expenseId }
  });

  return api.success({ message: 'Expense deleted' });
}

export const DELETE = api.withErrorHandling(DELETEHandler);
