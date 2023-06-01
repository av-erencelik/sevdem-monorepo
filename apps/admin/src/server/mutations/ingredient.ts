"use server";

import { prisma } from "@/db";
import { newIngredientFormValues } from "@/types/types";
export const addIngredient = async (data: newIngredientFormValues) => {
  await prisma.ingredient.create({
    data: {
      name: data.name,
      inventory: {
        create: {
          unitId: data.unit,
        },
      },
      price: {
        create: {
          price: data.price,
          measurement: {
            create: {
              quantity: data.case,
              size: data.size,
              mlToGram: data.mlToGram,
              unit: {
                connect: {
                  id: data.unit,
                },
              },
            },
          },
        },
      },
    },
  });
};

export const deleteIngredient = async (id: number) => {
  await prisma.ingredient.delete({
    where: {
      id: id,
    },
  });
};
