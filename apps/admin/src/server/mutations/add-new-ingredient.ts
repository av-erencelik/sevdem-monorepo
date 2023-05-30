"use server";

import { prisma } from "@/db";
import { newIngredientFormValues } from "@/types/types";
import { revalidatePath } from "next/cache";
export const action = async (data: newIngredientFormValues) => {
  await prisma.ingredient.create({
    data: {
      name: data.name,
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
