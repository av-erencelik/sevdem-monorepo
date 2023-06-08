"use server";
import { prisma } from "@/db";
import { getLast30days, getLastOneYear } from "@/lib/utils";
import dayjs from "dayjs";

export async function getExternalCostsEconomy(month: number) {
  let startDate: Date;
  let endDate: Date;
  if (month === 12) {
    const { startDate: startDateYear, endDate: endDateYear } = getLastOneYear(dayjs());
    startDate = startDateYear;
    endDate = endDateYear;
  } else {
    const { startDate: startDateMonth, endDate: endDateMonth } = getLast30days(dayjs().set("month", month));
    startDate = startDateMonth;
    endDate = endDateMonth;
  }
  const costs = await prisma.externalCost.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      id: true,
      name: true,
      cost: true,
      createdAt: true,
    },
  });

  return costs.map((cost) => ({
    ...cost,
    cost: cost.cost.toNumber(),
  }));
}
