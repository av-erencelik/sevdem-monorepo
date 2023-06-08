"use server";
import { prisma } from "@/db";
import { NewExternalCostFormValues, NewSaleFormValus } from "@/types/types";
import { redirect } from "next/navigation";

export async function newExternalCost(data: NewExternalCostFormValues) {
  const response = await prisma.externalCost.create({
    data: {
      cost: data.cost,
      name: data.name,
      createdAt: data.date,
    },
  });
  return redirect("/ekonomi");
}

export async function deleteExternalCost(id: number) {
  return await prisma.externalCost.delete({
    where: {
      id,
    },
  });
}

export async function newSale(data: NewSaleFormValus) {
  const totalCost = data.items.reduce((acc, item) => (acc += item.sellPrice), 0);
  const response = await prisma.sale.create({
    data: {
      name: data.name,
      total: totalCost,
      saleDate: data.date,
      saleItem: {
        create: data.items.map((item) => ({
          recipe: {
            connect: {
              id: item.recipeId,
            },
          },
          sellPrice:
            item.sellPriceDefault === item.sellPrice
              ? {
                  connect: {
                    id: item.sellPriceId,
                  },
                }
              : {
                  create: {
                    price: item.sellPrice,
                    createdAt: data.date,
                    recipe: {
                      connect: {
                        id: item.recipeId,
                      },
                    },
                  },
                },
          yieldSold: item.yieldSold,
        })),
      },
    },
  });
  return redirect("/ekonomi");
}
