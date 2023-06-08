"use server";
import { prisma } from "@/db";
import { getLast30days, getLastOneYear } from "@/lib/utils";
import dayjs from "dayjs";

export async function getSalesEconomy(month: number) {
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

  const sales = await prisma.sale.findMany({
    where: {
      saleDate: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      id: true,
      name: true,
      saleDate: true,
      saleItem: {
        select: {
          id: true,
          yieldSold: true,
          sellPrice: true,
        },
      },
    },
  });
  return sales.map((sale) => ({
    id: sale.id,
    saleDate: sale.saleDate,
    name: sale.name,
    totalSoldItem: sale.saleItem.reduce((acc, item) => acc + item.yieldSold, 0),
    totalSale: sale.saleItem.reduce((acc, item) => acc + item.yieldSold * item.sellPrice.price.toNumber(), 0),
  }));
}

export async function deleteSale(id: number) {
  await prisma.sale.delete({
    where: {
      id,
    },
  });
}
