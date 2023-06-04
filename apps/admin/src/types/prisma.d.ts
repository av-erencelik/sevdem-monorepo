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

export type RecipesWithIngredients = Prisma.RecipeGetPayload<typeof recipesWithIngredients>[];
