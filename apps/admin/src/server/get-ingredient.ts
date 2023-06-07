"use server";
import { prisma } from "@/db";
import { refactorRecipes } from "@/lib/server";
import { getLastOneYear } from "@/lib/utils";
import { ConversionFactors, InventoryAdd, InventorySubtract, MeasurementUnit } from "@prisma/client";
import dayjs from "dayjs";

export async function getIngredient(id: string) {
  const { startDate, endDate } = getLastOneYear(dayjs());
  const ingredient = await prisma.ingredient.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      inventory: {
        select: {
          subtracts: true,
          adds: true,
          unit: {
            include: {
              conversionFactorTo: true,
            },
          },
        },
      },
      price: {
        select: {
          id: true,
          price: true,
          createdAt: true,
          measurement: {
            select: {
              quantity: true,
              size: true,
              mlToGram: true,
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
        orderBy: {
          createdAt: "desc",
        },
        where: {},
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

  const recipeRefactored = refactorRecipes(recipe);

  const priceHistory = ingredient?.price.map((price) => {
    const unitPrice =
      price.price.toNumber() / (price.measurement!.size.toNumber() * price.measurement!.quantity.toNumber());
    return {
      x: price.createdAt!,
      y:
        price.measurement!.unit.id === ingredient.inventory!.unit.id
          ? unitPrice
          : unitPrice /
            ingredient
              .inventory!.unit.conversionFactorTo.filter((unit) => unit.fromUnitId === price.measurement?.unit.id)[0]
              .conversionFactor.toNumber(),
    };
  });

  console.log(ingredient!.inventory!.unit.conversionFactorTo);

  // get the price increase or decrease percantage
  let priceChangePercantage = undefined;
  if (priceHistory && priceHistory.length > 1) {
    priceChangePercantage = ((priceHistory[0].y - priceHistory[1].y) / priceHistory[1].y) * 100;
  }

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
      inventory: totalInventory(ingredient.inventory, ingredient.inventory!.unit),
      abbreviation: ingredient.inventory!.unit.abbreviation,
      recipeCount: recipe.length,
      recipes: recipeRefactored,
      priceHistory: { id: ingredient.name, data: priceHistory?.reverse() ?? [] },
      priceChangePercantage: priceChangePercantage,
    };
    return ingredientRefactored;
  }

  return null;
}

function totalInventory(
  inventory: {
    adds: InventoryAdd[];
    subtracts: InventorySubtract[];
  } | null,
  unit: MeasurementUnit & {
    conversionFactorTo: ConversionFactors[];
  }
) {
  if (!inventory) return 0;
  const adds = inventory.adds.reduce((acc, add) => {
    if (add.unitId === unit.id) {
      return (acc += add.quantity.toNumber());
    } else {
      return (
        acc +
        add.quantity.toNumber() *
          unit.conversionFactorTo.filter((unit) => unit.fromUnitId === add.unitId)[0].conversionFactor.toNumber()
      );
    }
  }, 0);
  const subtracts = inventory.subtracts.reduce((acc, curr) => {
    if (curr.unitId === unit.id) {
      return (acc += curr.quantity.toNumber());
    } else {
      return (
        acc +
        curr.quantity.toNumber() *
          unit.conversionFactorTo.filter((unit) => unit.fromUnitId === curr.unitId)[0].conversionFactor.toNumber()
      );
    }
  }, 0);
  return adds - subtracts;
}
