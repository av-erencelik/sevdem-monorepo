import { Prisma } from "@prisma/client";

const recipesWithIngredients = Prisma.validator<Prisma.RecipeArgs>()({
  where: {
    ingredients: {
      some: {
        ingredientId: ingredient?.id,
      },
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

const recipeDetails = Prisma.validator<Prisma.RecipeArgs>()({
  where: {
    id: id,
  },
  select: {
    id: true,
    name: true,
    description: true,
    yieldCount: true,
    yieldName: true,
    targetMargin: true,
    sellPrice: true,
    priceHistory: true,
    sellQuantity: true,
    ingredients: {
      select: {
        size: true,
        unitId: true,
        unit: true,
        ingredient: {
          select: {
            name: true,
            id: true,
            price: {
              select: {
                price: true,
                measurement: {
                  select: {
                    size: true,
                    quantity: true,
                    mlToGram: true,
                    unit: {
                      select: {
                        type: true,
                        abbreviation: true,
                        id: true,
                        conversionFactorFrom: true,
                        conversionFactorTo: true,
                      },
                    },
                  },
                },
              },
              take: 1,
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

export type RecipesWithIngredients = Prisma.RecipeGetPayload<typeof recipesWithIngredients>[];
export type RecipeDetails = Prisma.RecipeGetPayload<typeof recipeDetails>;
