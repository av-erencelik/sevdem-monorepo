"use server";

import { prisma } from "@/db";
import { InventoryAddIngredientFormValues, InventoryAddRecipeFormValues } from "@/types/types";
import { redirect } from "next/navigation";

export async function addRecipeInventory(data: InventoryAddRecipeFormValues) {
  const recipeInventory = await prisma.createdItem.createMany({
    data: data.recipes.map((recipe) => ({
      yieldCreated: recipe.amount,
      createdAt: data.date,
      recipeId: parseInt(recipe.recipeId),
    })),
  });

  data.recipes.forEach(async (recipe) => {
    const recipeDatas = await prisma.recipe.findMany({
      where: {
        id: parseInt(recipe.recipeId),
      },
      select: {
        ingredients: {
          select: {
            unit: true,
            size: true,
            ingredient: {
              select: {
                inventory: {
                  select: {
                    id: true,
                    unit: {
                      select: {
                        conversionFactorTo: true,
                        id: true,
                      },
                    },
                    adds: {
                      include: {
                        unit: true,
                      },
                    },
                    subtracts: {
                      include: {
                        unit: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    recipeDatas.forEach(async (recipeData) => {
      recipeData.ingredients.forEach(async (ingredient) => {
        const usedOnRecipe =
          ingredient.unit.id === ingredient.ingredient.inventory!.unit.id
            ? ingredient.size.toNumber() * recipe.amount
            : ingredient.size.toNumber() *
              recipe.amount *
              ingredient.ingredient
                .inventory!.unit.conversionFactorTo.filter((unit) => unit.id === ingredient.unit.id)[0]
                .conversionFactor.toNumber();
        const sumAdd = ingredient.ingredient.inventory!.adds.reduce((acc, add) => {
          if (add.unit.id === ingredient.ingredient.inventory!.unit.id) {
            return (acc += add.quantity.toNumber());
          } else {
            return (
              acc +
              add.quantity.toNumber() *
                ingredient.ingredient
                  .inventory!.unit.conversionFactorTo.filter((unit) => unit.fromUnitId === add.unit.id)[0]
                  .conversionFactor.toNumber()
            );
          }
        }, 0);
        const sumSubstract = ingredient.ingredient.inventory!.subtracts.reduce((acc, subtract) => {
          if (subtract.unit.id === ingredient.ingredient.inventory!.unit.id) {
            return (acc += subtract.quantity.toNumber());
          } else {
            return (
              acc +
              subtract.quantity.toNumber() *
                ingredient.ingredient
                  .inventory!.unit.conversionFactorTo.filter((unit) => unit.fromUnitId === subtract.unit.id)[0]
                  .conversionFactor.toNumber()
            );
          }
        }, 0);
        const differenceBetweenAddAndSubstract = (sumAdd ?? 0) - (sumSubstract ?? 0);
        const difference = differenceBetweenAddAndSubstract - usedOnRecipe;
        const newQuantity = Math.max(difference, 0);
        const subtract = await prisma.inventorySubtract.create({
          data: {
            quantity:
              newQuantity > 0
                ? usedOnRecipe
                : differenceBetweenAddAndSubstract > 0
                ? differenceBetweenAddAndSubstract
                : 0,
            inventoryId: ingredient.ingredient.inventory!.id,
            unitId: ingredient.unit.id,
          },
        });
      });
    });
  });
  return redirect("/envanter/tarifler");
}

export async function addIngredientInventory(data: InventoryAddIngredientFormValues) {
  const ingredientInventory = await prisma.inventoryAdd.createMany({
    data: data.ingredients.map((ingredient) => ({
      quantity: ingredient.amount,
      totalPrice: ingredient.price,
      inventoryId: parseInt(ingredient.ingredientInventoryId),
      unitId: ingredient.ingredientUnitId,
      createdAt: data.date,
    })),
  });

  data.ingredients.forEach(async (ingredient) => {
    await prisma.ingredient.update({
      where: {
        id: parseInt(ingredient.ingredientId),
      },
      data: {
        price: {
          create: {
            price: ingredient.price,
            createdAt: data.date,
            measurement: {
              create: {
                unitId: ingredient.ingredientUnitId,
                size: ingredient.amount,
                quantity: 1,
              },
            },
          },
        },
      },
    });
  });

  return redirect("/envanter/malzemeler");
}

export async function deleteCreatedItem(id: number) {
  const createdItem = await prisma.createdItem.delete({
    where: {
      id,
    },
  });

  return createdItem;
}

export async function deleteInventoryAdd(id: number) {
  const inventoryAdd = await prisma.inventoryAdd.delete({
    where: {
      id,
    },
  });

  return inventoryAdd;
}
