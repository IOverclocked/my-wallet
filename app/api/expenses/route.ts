import { api } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { validation } from "@/lib/validation";
import { NextRequest } from "next/server";

async function POSTHandler(req: NextRequest) {
  const body = await req.json();

  const parsed = validation.schema.expense.safeParse(body);

  if (!parsed.success) {
    return api.clientError(validation.getErrorMessage(parsed), 400);
  }

  const data = parsed.data;

  const expense = await prisma.expense.create({
    data: {
      amount: data.amount,
      description: data.description,
      date: data.date ?? new Date(),
      accountId: data.accountId,
      categoryId: data.categoryId,
      userId: 1, //TODO: tymczasowo bez auth
    },
    include: {
      account: true,
      category: true,
    },
  });

  return api.success(expense, 201);
}

export const POST = api.withErrorHandling(POSTHandler);

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

  const expenses = await prisma.expense.findMany({
    where,
    orderBy: {
      date: "desc",
    },
    include: {
      account: true,
      category: true,
    },
  });

  return api.success(expenses);
}

export const GET = api.withErrorHandling(GETHandler);
