import { prisma } from "@/db";

export async function totalOrders(startDate: Date, endDate: Date) {
  return await prisma.order.aggregate({
    where: {
      orderDate: {
        gte: startDate.toISOString(),
        lte: endDate.toISOString(),
      },
    },
    _sum: {
      totalPrice: true,
    },
  });
}
