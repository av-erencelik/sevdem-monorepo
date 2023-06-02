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
      count: ingredient._count.recipeIngredient,
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
  count: number;
  unitPrice: number;
};
