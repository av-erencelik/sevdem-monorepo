import { prisma } from "@/db";

export async function getTasks() {
  const recipeCount = await prisma.recipe.count();
  const ingredientCount = await prisma.ingredient.count();
  const inventoryCount = await prisma.inventoryAdd.count();
  const createdItemCount = await prisma.createdItem.count();
  const saleCount = await prisma.sale.count();
  return { recipeCount, ingredientCount, inventoryCount, createdItemCount, saleCount };
}
