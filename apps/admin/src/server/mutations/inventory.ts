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
