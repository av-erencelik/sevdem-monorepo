"use server";
import { prisma } from "@/db";

export const getExternalCosts = async (startDate: Date, endDate: Date) => {
  return await prisma.externalCost.aggregate({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: {
      cost: true,
    },
  });
};

export const getMonthlySales = async (startDate: Date, endDate: Date) => {
  const sales = await prisma.sale.findMany({
    select: {
      saleDate: true,
      saleItem: {
        select: {
          recipeId: true,
          sellPrice: {
            select: {
              price: true,
            },
          },
          yieldSold: true,
        },
      },
    },
    where: {
      saleDate: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const salesRefactored: SaleItemRefactored[][] = [];

  for (const sale of sales) {
    const saleItems: SaleItemRefactored[] = [];
    for (const saleItem of sale.saleItem) {
      const costDefault = await prisma.recipePriceHistory.findMany({
        where: {
          recipeId: saleItem.recipeId,
        },
        select: {
          price: true,
        },
        orderBy: {
          createdAt: "asc",
        },
        take: 1,
      });
      const cost = await prisma.recipe.findMany({
        where: {
          id: saleItem.recipeId,
        },
        select: {
          yieldCount: true,
          name: true,
          priceHistory: {
            orderBy: {
              createdAt: "asc",
            },
            where: {
              createdAt: {
                lte: sale.saleDate,
              },
            },
            take: 1,
            select: {
              price: true,
            },
          },
        },
      });
      saleItems.push({
        recipeId: saleItem.recipeId,
        sellPrice: saleItem.sellPrice.price.toNumber(),
        yieldSold: saleItem.yieldSold,
        cost:
          cost[0].priceHistory.length > 0 ? cost[0].priceHistory[0].price.toNumber() : costDefault[0].price.toNumber(),
        yieldCount: cost[0].yieldCount,
        name: cost[0].name,
      });
    }
    salesRefactored.push(saleItems);
  }
  return salesRefactored;
};

export type SaleItemRefactored = {
  recipeId: number;
  sellPrice: number;
  yieldSold: number;
  cost: number;
  yieldCount: number;
  name: string;
};
