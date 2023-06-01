import { prisma } from "@/db";
import { IngredientInventory, InventoryAdd, InventorySubtract } from "@prisma/client";

export async function getIngredient(id: string) {
  const ingredient = await prisma.ingredient.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      inventory: {
        include: {
          subtracts: true,
          adds: true,
        },
      },
      price: {
        include: {
          measurement: {
            include: {
              unit: {
                select: {
                  id: true,
                  abbreviation: true,
                  type: {
                    select: {
                      id: true,
                      name: true,
                      unit: true,
                    },
                  },
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
  });

  const recipe = await prisma.recipe.findMany({
    where: {
      ingredients: {
        some: {
          ingredientId: ingredient?.id,
        },
      },
    },
    include: {
      priceHistory: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      ingredients: {
        include: {
          ingredient: {
            include: {
              price: {
                include: {
                  measurement: {
                    include: {
                      unit: true,
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

  const recipeRefactored = recipe.map((recipe) => {
    let totalCost = 0;
    recipe.ingredients.forEach((ingredient, index) => {
      const ingredientCost =
        ingredient.ingredient.price[0].price.toNumber() /
        (ingredient.ingredient.price[0].measurement!.quantity.toNumber() *
          ingredient.ingredient.price[0].measurement!.size.toNumber());
      totalCost += ingredientCost * ingredient.size.toNumber();
    });

    return {
      id: recipe.id,
      name: recipe.name,
      yield: recipe.yieldCount,
      yieldName: recipe.yieldName,
      totalCost: totalCost,
      sellPrice: recipe.priceHistory[0].price.toNumber(),
      profitPercantage: ((recipe.priceHistory[0].price.toNumber() - totalCost) / totalCost) * 100,
    };
  });

  if (ingredient) {
    const ingredientRefactored = {
      id: ingredient.id,
      name: ingredient.name,
      price: ingredient.price[0].price.toNumber(),
      priceId: ingredient.price[0].id,
      quantity: ingredient.price[0].measurement!.quantity.toNumber(),
      size: ingredient.price[0].measurement!.size.toNumber(),
      mlToGram: ingredient.price[0].measurement!.mlToGram?.toNumber(),
      unitId: ingredient.price[0].measurement!.unit.id,
      type: ingredient.price[0].measurement!.unit.type,
      createdAt: ingredient.createdAt,
      updatedAt: ingredient.updatedAt,
      inventory: totalInventory(ingredient.inventory),
      abbreviation: ingredient.price[0].measurement!.unit.abbreviation,
      recipeCount: recipe.length,
      recipes: recipeRefactored,
    };
    return ingredientRefactored;
  }

  return null;
}

function totalInventory(
  inventory:
    | (IngredientInventory & {
        adds: InventoryAdd[];
        subtracts: InventorySubtract[];
      })
    | null
) {
  if (!inventory) return 0;
  const adds = inventory.adds.reduce((acc, curr) => acc + curr.quantity.toNumber(), 0);
  const subtracts = inventory.subtracts.reduce((acc, curr) => acc + curr.quantity.toNumber(), 0);
  return adds - subtracts;
}
