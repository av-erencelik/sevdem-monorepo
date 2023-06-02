"use server";
import { prisma } from "@/db";

export const getExternalCosts = async (startDate: Date, endDate: Date) => {
  return await prisma.externalCost.aggregate({
    where: {
      createdAt: {
        gte: startDate.toISOString(),
        lte: endDate.toISOString(),
      },
    },
    _sum: {
      cost: true,
    },
  });
};

export const getMonthlySales = async (startDate: Date, endDate: Date) => {
  return await prisma.sale.findMany({
    select: {
      saleItem: {
        select: {
          sellPrice: {
            select: {
              price: true,
            },
          },
          yieldSold: true,
          recipe: {
            select: {
              name: true,
              yieldCount: true,
              ingredients: {
                select: {
                  size: true,
                  ingredient: {
                    select: {
                      price: {
                        orderBy: {
                          createdAt: "desc",
                        },
                        take: 1,
                        select: {
                          price: true,
                          measurement: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    where: {
      saleDate: {
        gte: startDate.toISOString(),
        lte: endDate.toISOString(),
      },
    },
  });
};
