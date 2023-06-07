"use server";
import { prisma } from "@/db";
import { getLast30days } from "@/lib/utils";
import dayjs from "dayjs";

export async function getExternalCostsEconomy(month = dayjs().month()) {
  const { startDate, endDate } = getLast30days(dayjs().month(month));
  return await prisma.externalCost.findMany({
    where: {
      createdAt: {
        gte: startDate.toISOString(),
        lte: endDate.toISOString(),
      },
    },
    select: {
      id: true,
      name: true,
      cost: true,
      createdAt: true,
    },
  });
}

export async function deleteExternalCost(id: number) {
  return await prisma.externalCost.delete({
    where: {
      id,
    },
  });
}
