import { Prisma } from "@/app/generated/prisma/client";
import { api } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GETHandler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const accountId = searchParams.get("accountId");
  const categoryId = searchParams.get("categoryId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const where: Prisma.ExpenseWhereInput = {
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

  const grouped = await prisma.expense.groupBy({
    where,
    _sum: { amount: true },
    by: ["categoryId"],
  });

  const categoryIds = grouped.map((g) => g.categoryId);

  const categories = await prisma.category.findMany({
    where: {
      id: { in: categoryIds },
    },
  });

  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  return api.success(
    grouped.map((group) => ({
      category: categoryMap.get(group.categoryId)?.name,
      total: group._sum.amount ?? 0,
    })),
  );
}

export const GET = api.withErrorHandling(GETHandler);
