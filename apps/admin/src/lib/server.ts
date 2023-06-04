import { prisma } from "@/db";
import { RecipesWithIngredients } from "@/types/prisma";

export function refactorRecipes(recipes: RecipesWithIngredients) {
  return recipes.map((recipe) => {
    const totalCost = recipe.ingredients.reduce((acc, ingredient) => {
      const ingredientPrice = ingredient.ingredient.price[0];
      const ingredientUnit = ingredient.ingredient.price[0].measurement!.unit;
      const recipeIngredientUnit = ingredient.unitId;
      const ingredientRecipeSize = ingredient.size;
      const conversionFactorsFrom = ingredientUnit.conversionFactorFrom;

      if (ingredientUnit.id === recipeIngredientUnit) {
        const pricePerUnit =
          ingredientPrice.price.toNumber() /
          (ingredientPrice.measurement!.size.toNumber() * ingredientPrice.measurement!.quantity.toNumber());
        return acc + pricePerUnit * ingredientRecipeSize.toNumber();
      } else {
        const coversionFactor = conversionFactorsFrom.find(
          (conversionFactor) => conversionFactor.toUnitId === recipeIngredientUnit
        )!;
        const pricePerUnit =
          ingredientPrice.price.toNumber() /
          (ingredientPrice.measurement!.size.toNumber() *
            ingredientPrice.measurement!.quantity.toNumber() *
            coversionFactor.conversionFactor.toNumber());
        return acc + pricePerUnit * ingredientRecipeSize.toNumber();
      }
    }, 0);

    if (totalCost !== recipe.priceHistory[0].price.toNumber()) {
      prisma.recipePriceHistory.create({
        data: {
          price: totalCost,
          recipe: {
            connect: {
              id: recipe.id,
            },
          },
        },
      });
    }

    return {
      id: recipe.id,
      name: recipe.name,
      yield: recipe.yieldCount,
      yieldName: recipe.yieldName,
      totalCost: totalCost,
      sellPrice: recipe.sellPrice[0].price.toNumber(),
      targetMargin: recipe.targetMargin.toNumber(),
      profitMarginPercentage:
        ((recipe.sellPrice[0].price.toNumber() - totalCost / recipe.yieldCount) /
          recipe.sellPrice[0].price.toNumber()) *
        100,
    };
  });
}
