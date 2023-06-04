"use server";

import { prisma } from "@/db";
import { refactorRecipes } from "@/lib/server";
import { NewRecipeFormValues } from "@/types/types";
import { Ingredient, Measurement, Price, RecipeIngredient } from "@prisma/client";
import { redirect } from "next/navigation";

export async function addRecipe(data: NewRecipeFormValues) {
  const recipe = await prisma.recipe.create({
    data: {
      name: data.name,
      description: data.description,
      sellQuantity: 0,
      sellPrice: {
        create: {
          price: data.sellPrice,
        },
      },
      targetMargin: data.targetMargin,
      yieldCount: data.yieldCount,
      yieldName: data.yieldName,
      ingredients: {
        create: data.ingredients.map((ingredient) => ({
          size: ingredient.amount,
          ingredient: {
            connect: {
              id: parseInt(ingredient.ingredientId),
            },
          },
          unit: {
            connect: {
              id: ingredient.unitId,
            },
          },
        })),
      },
    },
    select: {
      id: true,
      name: true,
      yieldCount: true,
      yieldName: true,
      targetMargin: true,
      sellPrice: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      priceHistory: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      ingredients: {
        select: {
          size: true,
          unitId: true,
          ingredient: {
            select: {
              price: {
                select: {
                  price: true,
                  measurement: {
                    select: {
                      quantity: true,
                      size: true,
                      unit: {
                        select: {
                          type: true,
                          id: true,
                          conversionFactorFrom: true,
                          conversionFactorTo: true,
                        },
                      },
                    },
                  },
                },
                orderBy: {
                  createdAt: "desc",
                },
              },
            },
          },
        },
      },
    },
  });

  const recipeRefactored = refactorRecipes([recipe])[0];

  const priceHistory = await prisma.recipePriceHistory.create({
    data: {
      price: recipeRefactored.totalCost,
      recipe: {
        connect: {
          id: recipe.id,
        },
      },
    },
  });
  redirect(`/tarifler`);
}

export async function deleteRecipe(id: number) {
  await prisma.recipe.delete({
    where: {
      id,
    },
  });
}

export async function updateRecipe(id: number, data: NewRecipeFormValues) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
    select: {
      sellPrice: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  const updated = await prisma.recipe.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      description: data.description,
      sellPrice: {
        delete: { id: recipe?.sellPrice[0].id },
        create: {
          price: data.sellPrice,
        },
      },
      targetMargin: data.targetMargin,
      yieldCount: data.yieldCount,
      yieldName: data.yieldName,
      ingredients: {
        deleteMany: {},
        create: data.ingredients.map((ingredient) => ({
          size: ingredient.amount,
          ingredient: {
            connect: {
              id: parseInt(ingredient.ingredientId),
            },
          },
          unit: {
            connect: {
              id: ingredient.unitId,
            },
          },
        })),
      },
    },
  });

  redirect(`/tarifler`);
}
