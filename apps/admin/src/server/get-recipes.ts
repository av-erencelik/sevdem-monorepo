import { prisma } from "@/db";
import { refactorRecipes } from "@/lib/server";

export async function getRecipes() {
  const recipes = await prisma.recipe.findMany({
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
  const refactoredRecipes = refactorRecipes(recipes);

  refactoredRecipes.forEach(async (recipe, index) => {
    if (recipe.totalCost.toFixed(2) != recipes[index].priceHistory[0].price.toNumber().toFixed(2)) {
      await prisma.recipePriceHistory.create({
        data: {
          price: recipe.totalCost,
          recipe: {
            connect: {
              id: recipe.id,
            },
          },
        },
      });
    }
  });

  return refactoredRecipes;
}

export async function getRecipesForInventory() {
  const recipes = await prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
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
  });

  return recipes.map((recipe) => ({
    id: recipe.id,
    name: recipe.name,
    price: recipe.priceHistory[0].price.toNumber() / recipe.yieldCount,
  }));
}
