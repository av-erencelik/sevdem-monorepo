"use server";
import { prisma } from "@/db";
import { getLast30days } from "@/lib/utils";
import dayjs from "dayjs";

export async function getSalesEconomy(month = dayjs().month()) {
  const { startDate, endDate } = getLast30days(dayjs().month(month));
  const sales = await prisma.sale.findMany({
    where: {
      saleDate: {
        gte: startDate.toISOString(),
        lte: endDate.toISOString(),
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
