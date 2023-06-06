"use server";

import { prisma } from "@/db";
import { getLast30days } from "@/lib/utils";
import dayjs from "dayjs";

export async function getInventoryRecipes() {
  const { startDate, endDate } = getLast30days(dayjs());
  const inventoryRecipes = await prisma.createdItem.findMany({
    where: {
      createdAt: {
        gte: startDate.toISOString(),
        lte: endDate.toISOString(),
      },
    },
    select: {
      id: true,
      createdAt: true,
      yieldCreated: true,
      recipe: {
        select: {
          name: true,
          id: true,
          yieldName: true,
          yieldCount: true,
          priceHistory: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
            select: {
              price: true,
            },
          },
        },
      },
    },
  });

  return inventoryRecipes.map((inventoryRecipe) => {
    return {
      id: inventoryRecipe.id,
      recipeId: inventoryRecipe.recipe.id,
      name: inventoryRecipe.recipe.name,
      yieldName: inventoryRecipe.recipe.yieldName,
      yieldCreated: inventoryRecipe.yieldCreated,
      price: inventoryRecipe.recipe.priceHistory[0].price.toNumber() / inventoryRecipe.recipe.yieldCount,
      createdAt: inventoryRecipe.createdAt,
    };
  });
}

export async function getIngredientInventory() {
  const { startDate, endDate } = getLast30days(dayjs());
  const inventoryIngredients = await prisma.inventoryAdd.findMany({
    where: {
      createdAt: {
        gte: startDate.toISOString(),
        lte: endDate.toISOString(),
      },
    },
    select: {
      id: true,
      createdAt: true,
      totalPrice: true,
      quantity: true,
      unit: {
        select: {
          id: true,
          abbreviation: true,
        },
      },
      inventory: {
        select: {
          unit: {
            select: {
              id: true,
            },
          },
          ingredient: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return inventoryIngredients.map((inventoryIngredient) => {
    return {
      id: inventoryIngredient.id,
      ingredientId: inventoryIngredient.inventory.ingredient.id,
      name: inventoryIngredient.inventory.ingredient.name,
      unitAbbreviation: inventoryIngredient.unit.abbreviation,
      quantity: inventoryIngredient.quantity.toNumber(),
      totalPrice: inventoryIngredient.totalPrice.toNumber(),
      createdAt: inventoryIngredient.createdAt,
    };
  });
}
