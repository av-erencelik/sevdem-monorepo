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
