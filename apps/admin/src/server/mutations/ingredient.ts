"use server";

import { prisma } from "@/db";
import { EditIngredientFormValues, NewIngredientFormValues } from "@/types/types";
import { redirect } from "next/navigation";
export const addIngredient = async (data: NewIngredientFormValues) => {
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

  redirect(`/tarifler`);
};

export const deleteIngredient = async (id: number) => {
  await prisma.ingredient.delete({
    where: {
      id: id,
    },
  });
};

export const updateIngredient = async (data: EditIngredientFormValues, id: number, priceId: number) => {
  const update = await prisma.ingredient.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      inventory: {
        update: {
          unitId: data.unit,
        },
      },
      price: !data.newPrice
        ? {
            update: {
              where: {
                id: priceId,
              },
              data: {
                price: data.price,
                measurement: {
                  update: {
                    size: data.size,
                    quantity: data.case,
                    unitId: data.unit,
                  },
                },
              },
            },
          }
        : {
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
  redirect(`/tarifler`);
};
