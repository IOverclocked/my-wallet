import { api } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GETHandler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const accountId = searchParams.get('accountId');
  const categoryId = searchParams.get('categoryId');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const where = {
    userId: 1
  };

  if (accountId) Object.assign(where, { accountId: Number(accountId) });

  if (categoryId) Object.assign(where, { categoryId: Number(categoryId) });

  if (from || to) {
    Object.assign(where, {
      date: {
        ...(from && { gte: new Date(from) }),
        ...(to && { lte: new Date(to) })
      }
    });
  }

  const result = await prisma.expense.aggregate({
    where,
    _sum: { amount: true }
  });

  return api.success({
    total: result._sum.amount ?? 0
  });
}

export const GET = api.withErrorHandling(GETHandler);
