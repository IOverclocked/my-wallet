import { api } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { validation } from "@/lib/validation";
import { NextRequest } from "next/server";

export async function PUTHandler(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const incomeId = Number(id);

  const body = await req.json();

  const parsed = validation.schema.income.safeParse(body);

  if (!parsed.success) {
    return api.clientError(validation.getErrorMessage(parsed));
  }

  if (!incomeId) return api.clientError("Invalid income id", 400);

  const existing = await prisma.income.findUnique({
    where: { id: incomeId },
  });

  if (!existing) return api.clientError("Income not found", 404);

  const oldAmount = existing.amount;
  const newAmount = parsed.data.amount;
  const delta = newAmount - oldAmount;

  const update = await prisma.income.update({
    where: { id: incomeId },
    data: { ...parsed.data, date: parsed.data.date ?? new Date() },
    include: {
      account: true,
      category: true,
    },
  });

  await prisma.account.update({
    where: { id: existing.accountId },
    data: { balance: { increment: delta } },
  });

  return api.success(update);
}

export const PUT = api.withErrorHandling(PUTHandler);

export async function DELETEHandler(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const incomeId = Number(id);

  if (!incomeId) return api.clientError("Invalid income id", 400);

  const existing = await prisma.income.findUnique({
    where: { id: incomeId },
  });

  if (!existing) return api.clientError("Income not found", 404);

  await prisma.account.update({
    where: { id: existing.accountId },
    data: { balance: { decrement: existing.amount } },
  });

  const update = await prisma.income.delete({
    where: { id: incomeId },
  });

  return api.success(update);
}

export const DELETE = api.withErrorHandling(DELETEHandler);
