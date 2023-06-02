"use server";
import { prisma } from "@/db";

export async function totalOrders(startDate: Date, endDate: Date) {
  return await prisma.inventoryAdd.aggregate({
    where: {
      createdAt: {
        gte: startDate.toISOString(),
        lte: endDate.toISOString(),
      },
    },
    _sum: {
      totalPrice: true,
    },
  });
}
