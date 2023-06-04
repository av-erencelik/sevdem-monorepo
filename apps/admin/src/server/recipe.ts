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

export async function getEditFormRecipe(recipeId: string) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: parseInt(recipeId),
    },
    select: {
      id: true,
      name: true,
      description: true,
      yieldCount: true,
      yieldName: true,
      sellPrice: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
      },
      targetMargin: true,
      ingredients: {
        select: {
          size: true,
          unitId: true,
          ingredientId: true,
        },
      },
    },
  });

  if (!recipe) {
    throw new Error("Recipe not found");
  }

  return {
    id: recipe.id,
    name: recipe.name,
    description: recipe.description ?? undefined,
    yieldCount: recipe.yieldCount,
    yieldName: recipe.yieldName,
    sellPrice: recipe.sellPrice[0].price.toNumber(),
    targetMargin: recipe.targetMargin.toNumber(),
    ingredients: recipe.ingredients.map((ingredient) => ({
      amount: ingredient.size.toNumber(),
      unitId: ingredient.unitId,
      ingredientId: ingredient.ingredientId.toString(),
    })),
  };
}
