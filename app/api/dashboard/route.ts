import { Prisma } from "@/app/generated/prisma/client";
import { api } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

async function GETHandler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const accountId = searchParams.get("accountId");
  const categoryId = searchParams.get("categoryId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const where = {
    userId: 1,
  };

  if (accountId) Object.assign(where, { accountId: Number(accountId) });

  if (categoryId) Object.assign(where, { categoryId: Number(categoryId) });

  if (from || to) {
    Object.assign(where, {
      date: {
        ...(from && { gte: new Date(from) }),
        ...(to && { lte: new Date(to) }),
      },
    });
  }

  const incomeWhere: Prisma.IncomeWhereInput = where;
  const expenseWhere: Prisma.ExpenseWhereInput = where;
  const accountWhere: Prisma.AccountWhereInput = {
    userId: where.userId,
    ...(accountId && { id: Number(accountId) }),
  };

  const incomes = await prisma.income.aggregate({
    where: incomeWhere,
    _sum: { amount: true },
  });

  const expenses = await prisma.expense.aggregate({
    where: expenseWhere,
    _sum: { amount: true },
  });

  const accounts = await prisma.account.findMany({
    where: accountWhere,
  });

  return api.success({
    incomes: incomes._sum.amount ?? 0,
    expenses: expenses._sum.amount ?? 0,
    accounts: accounts,
  });
}

export const GET = api.withErrorHandling(GETHandler);
