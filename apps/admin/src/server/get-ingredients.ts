"use server";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";

const ingredientsWithPrice = Prisma.validator<Prisma.IngredientArgs>()({
  select: {
    id: true,
    name: true,
    _count: {
      select: {
        recipeIngredient: true,
      },
    },
    price: {
      take: 1,
      select: {
        price: true,
        measurement: {
          select: {
            quantity: true,
            size: true,
            unit: {
              select: {
                abbreviation: true,
              },
            },
          },
        },
      },
    },
  },
});
export type IngredientWithPrice = Prisma.IngredientGetPayload<typeof ingredientsWithPrice>[];

export const getIngredients = async () => {
  const ingredients = await prisma.ingredient.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          recipeIngredient: true,
        },
      },
      price: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          price: true,
          measurement: {
            select: {
              quantity: true,
              size: true,
              unit: {
                select: {
                  abbreviation: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const ingredientsRefactored = <IngredientRefactored[]>[];

  ingredients.forEach((ingredient) => {
    const ingredientRefactored = {
      id: ingredient.id,
      name: ingredient.name,
      price: ingredient.price[0].price.toNumber(),
      amount: ingredient.price[0].measurement!.quantity.toNumber() * ingredient.price[0].measurement!.size.toNumber(),
      abbreviation: ingredient.price[0].measurement!.unit.abbreviation,
      unitPrice:
        ingredient.price[0].price.toNumber() /
        (ingredient.price[0].measurement!.quantity.toNumber() * ingredient.price[0].measurement!.size.toNumber()),
    };
    ingredientsRefactored.push(ingredientRefactored);
  });
  return ingredientsRefactored;
};
export type IngredientRefactored = {
  id: number;
  name: string;
  price: number;
  abbreviation: string;
  amount: number;
  unitPrice: number;
};

export type IngredientForForm = {
  id: number;
  name: string;
  unitTypeId: number;
  unitId: number;
};

export async function getIngredientsForForm() {
  const ingredients = await prisma.ingredient.findMany({
    select: {
      id: true,
      name: true,
      price: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          measurement: {
            select: {
              unitId: true,
              unit: {
                select: {
                  typeId: true,
                },
              },
            },
          },
        },
      },
    },
  });
  const ingredientsRefactored = <IngredientForForm[]>[];

  ingredients.forEach((ingredient) => {
    const ingredientRefactored = {
      id: ingredient.id,
      name: ingredient.name,
      unitTypeId: ingredient.price[0].measurement!.unit.typeId,
      unitId: ingredient.price[0].measurement!.unitId,
    };
    ingredientsRefactored.push(ingredientRefactored);
  });
  return ingredientsRefactored;
}

export async function getInventoryIngredients() {
  const ingredients = await prisma.ingredient.findMany({
    select: {
      id: true,
      name: true,
      price: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          price: true,
          measurement: {
            select: {
              quantity: true,
              size: true,
            },
          },
        },
      },
      inventory: {
        select: {
          unit: {
            select: {
              id: true,
              conversionFactorTo: true,
              abbreviation: true,
            },
          },
          id: true,
          adds: {
            select: {
              quantity: true,
              unitId: true,
              totalPrice: true,
            },
          },
          subtracts: {
            select: {
              quantity: true,
              unitId: true,
            },
          },
        },
      },
    },
  });

  return ingredients.map((ingredient) => {
    const unitPrice =
      ingredient.price[0].price.toNumber() /
      (ingredient.price[0].measurement!.quantity.toNumber() * ingredient.price[0].measurement!.size.toNumber());
    const totalInventory =
      ingredient.inventory!.adds.reduce((acc, curr) => {
        if (curr.unitId === ingredient.inventory!.unit.id) {
          return acc + curr.quantity.toNumber();
        } else {
          return (
            acc +
            curr.quantity.toNumber() *
              ingredient
                .inventory!.unit.conversionFactorTo.find(
                  (conversionFactor) => conversionFactor.fromUnitId === curr.unitId
                )!
                .conversionFactor.toNumber()
          );
        }
      }, 0) -
      ingredient.inventory!.subtracts.reduce((acc, curr) => {
        if (curr.unitId === ingredient.inventory!.unit.id) {
          return acc + curr.quantity.toNumber();
        } else {
          return (
            acc +
            curr.quantity.toNumber() *
              ingredient
                .inventory!.unit.conversionFactorTo.find(
                  (conversionFactor) => conversionFactor.fromUnitId === curr.unitId
                )!
                .conversionFactor.toNumber()
          );
        }
      }, 0);
    return {
      id: ingredient.inventory!.id,
      name: ingredient.name,
      ingredientId: ingredient.id,
      unitId: ingredient.inventory!.unit.id,
      abbreviation: ingredient.inventory!.unit.abbreviation,
      totalInventory,
      unitPrice,
    };
  });
}
