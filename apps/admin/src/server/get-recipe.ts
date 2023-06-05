"use server";
import { IngredientRefactored } from "./get_ingredients";
import { prisma } from "@/db";
import { refactorRecipes } from "@/lib/server";
import { getLastOneYear } from "@/lib/utils";
import { RecipeDetails } from "@/types/prisma";
import dayjs from "dayjs";

export async function getRecipe(recipeId: string) {
  const { startDate, endDate } = getLastOneYear(dayjs());
  const createdItemsSum = await prisma.createdItem.aggregate({
    where: {
      recipeId: parseInt(recipeId),
    },
    _sum: {
      yieldCreated: true,
    },
  });
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: parseInt(recipeId),
    },
    select: {
      id: true,
      name: true,
      description: true,
      yieldCount: true,
      yieldName: true,
      targetMargin: true,
      sellPrice: {
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      priceHistory: {
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      sellQuantity: true,
      ingredients: {
        select: {
          size: true,
          unitId: true,
          unit: true,
          ingredient: {
            select: {
              name: true,
              id: true,
              price: {
                select: {
                  price: true,
                  measurement: {
                    select: {
                      size: true,
                      quantity: true,
                      mlToGram: true,
                      unit: {
                        select: {
                          type: true,
                          id: true,
                          abbreviation: true,
                          conversionFactorFrom: true,
                          conversionFactorTo: true,
                        },
                      },
                    },
                  },
                },
                take: 1,
                orderBy: {
                  createdAt: "desc",
                },
              },
            },
          },
        },
      },
    },
  });

  if (!recipe) throw new Error("Recipe not found");

  const recipeDetails = refactorRecipeDetails(recipe);

  if (recipeDetails.totalCost !== recipe.priceHistory[0].price.toNumber()) {
    await prisma.recipePriceHistory.create({
      data: {
        price: recipeDetails.totalCost,
        recipe: {
          connect: {
            id: recipe.id,
          },
        },
      },
    });
  }

  return { ...recipeDetails, createdItems: createdItemsSum._sum.yieldCreated };
}

function refactorRecipeDetails(recipe: RecipeDetails) {
  const refactoredRecipe = refactorRecipes([recipe]);
  const refactoredIngredientCosts = individualIngredientCostPerRecipe(recipe);
  const costHistory = refactorRecipeCostHistory(recipe);
  const sellPriceHistory = refactorSellPriceHistory(recipe);
  const ingredientsDataTable = ingredientsRefactoredForDataTable(recipe);

  return {
    ...refactoredRecipe[0],
    ingredientsDataTable,
    ingredientCosts: refactoredIngredientCosts,
    sellQuantity: recipe.sellQuantity,
    costHistory: { id: recipe.id.toString(), data: costHistory },
    sellPriceHistory: { id: recipe.id.toString(), data: sellPriceHistory },
  };
}

function ingredientsRefactoredForDataTable(recipe: RecipeDetails): IngredientRefactored[] {
  const ingredientsRefactored = <IngredientRefactored[]>[];
  const ingredients = recipe.ingredients;
  ingredients.forEach((ingredient) => {
    const ingredientPrice = ingredient.ingredient.price[0];
    const ingredientUnit = ingredient.ingredient.price[0].measurement!.unit;
    const recipeIngredientUnit = ingredient.unitId;
    const ingredientRecipeSize = ingredient.size;
    const conversionFactorsFrom = ingredientUnit.conversionFactorFrom;
    let pricePerUnit = 0;
    if (ingredientUnit.id === recipeIngredientUnit) {
      pricePerUnit =
        ingredientPrice.price.toNumber() /
        (ingredientPrice.measurement!.size.toNumber() * ingredientPrice.measurement!.quantity.toNumber());
    } else {
      const coversionFactor = conversionFactorsFrom.find(
        (conversionFactor) => conversionFactor.toUnitId === recipeIngredientUnit
      )!;
      pricePerUnit =
        ingredientPrice.price.toNumber() /
        (ingredientPrice.measurement!.size.toNumber() *
          ingredientPrice.measurement!.quantity.toNumber() *
          coversionFactor.conversionFactor.toNumber());
    }
    const ingredientRefactored = {
      id: ingredient.ingredient.id,
      name: ingredient.ingredient.name,
      price: ingredient.ingredient.price[0].price.toNumber(),
      amount: ingredient.size.toNumber(),
      abbreviation: ingredient.unit.abbreviation,
      unitPrice: pricePerUnit * ingredientRecipeSize.toNumber(),
    };
    ingredientsRefactored.push(ingredientRefactored);
  });
  return ingredientsRefactored;
}

function individualIngredientCostPerRecipe(ingredient: RecipeDetails) {
  return ingredient.ingredients.map((ingredient) => {
    const ingredientPrice = ingredient.ingredient.price[0];
    const ingredientUnit = ingredient.ingredient.price[0].measurement!.unit;
    const recipeIngredientUnit = ingredient.unitId;
    const ingredientRecipeSize = ingredient.size;
    const conversionFactorsFrom = ingredientUnit.conversionFactorFrom;

    if (ingredientUnit.id === recipeIngredientUnit) {
      const pricePerUnit =
        ingredientPrice.price.toNumber() /
        (ingredientPrice.measurement!.size.toNumber() * ingredientPrice.measurement!.quantity.toNumber());
      return {
        id: ingredient.ingredient.name,
        value: pricePerUnit * ingredientRecipeSize.toNumber(),
        label: ingredient.ingredient.name,
      };
    } else {
      const coversionFactor = conversionFactorsFrom.find(
        (conversionFactor) => conversionFactor.toUnitId === recipeIngredientUnit
      )!;
      const pricePerUnit =
        ingredientPrice.price.toNumber() /
        (ingredientPrice.measurement!.size.toNumber() *
          ingredientPrice.measurement!.quantity.toNumber() *
          coversionFactor.conversionFactor.toNumber());
      return {
        id: ingredient.ingredient.name,
        label: ingredient.ingredient.name,
        value: pricePerUnit * ingredientRecipeSize.toNumber(),
      };
    }
  });
}

function refactorRecipeCostHistory(recipe: RecipeDetails) {
  return recipe.priceHistory.map((price) => {
    return {
      x: price.createdAt!,
      y: price.price.toNumber(),
    };
  });
}

function refactorSellPriceHistory(recipe: RecipeDetails) {
  return recipe.sellPrice.map((price) => {
    return {
      x: price.createdAt!,
      y: price.price.toNumber(),
    };
  });
}
