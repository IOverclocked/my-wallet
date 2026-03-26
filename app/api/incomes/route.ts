import { api } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { validation } from '@/lib/validation';
import { NextRequest } from 'next/server';

async function POSTHandler(req: NextRequest) {
  const body = await req.json();

  const parsed = validation.schema.income.safeParse(body);

  if (!parsed.success) {
    return api.clientError(validation.getErrorMessage(parsed), 400);
  }

  const data = parsed.data;

  const income = await prisma.income.create({
    data: {
      amount: data.amount,
      description: data.description,
      date: data.date ?? new Date(),
      accountId: data.accountId,
      categoryId: data.categoryId,
      userId: 1 //TODO: tymczasowo bez auth
    },
    include: {
      account: true,
      category: true
    }
  });

  await prisma.account.update({
    where: { id: income.accountId },
    data: { balance: { increment: income.amount } }
  });

  return api.success(income, 201);
}

export const POST = api.withErrorHandling(POSTHandler);
