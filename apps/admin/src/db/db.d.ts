import {
  conversionFactors,
  externalCost,
  ingredient,
  ingredientInventory,
  measurement,
  measurementType,
  measurementUnit,
  order,
  orderItem,
  price,
  recipe,
  recipeIngredient,
  sale,
  saleItem,
} from "./schema";
import { InferModel } from "drizzle-orm";

export type MeasurementType = InferModel<typeof measurementType>;
export type MeasurementUnit = InferModel<typeof measurementUnit>;
export type ConversionFactors = InferModel<typeof conversionFactors>;
export type Measurement = InferModel<typeof measurement>;
export type Ingredient = InferModel<typeof ingredient>;
export type Price = InferModel<typeof price>;
export type Recipe = InferModel<typeof recipe>;
export type RecipeIngredient = InferModel<typeof recipeIngredient>;
export type IngredientInventory = InferModel<typeof ingredientInventory>;
export type Order = InferModel<typeof order>;
export type OrderItem = InferModel<typeof orderItem>;
export type Sale = InferModel<typeof sale>;
export type SaleItem = InferModel<typeof saleItem>;
export type ExternalCost = InferModel<typeof externalCost>;

// insert models here
export type MeasurementInsert = InferModel<typeof measurement, "insert">;
export type IngredientInsert = InferModel<typeof ingredient, "insert">;
export type PriceInsert = InferModel<typeof price, "insert">;
export type RecipeInsert = InferModel<typeof recipe, "insert">;
export type RecipeIngredientInsert = InferModel<typeof recipeIngredient, "insert">;
export type IngredientInventoryInsert = InferModel<typeof ingredientInventory, "insert">;
export type OrderInsert = InferModel<typeof order, "insert">;
export type OrderItemInsert = InferModel<typeof orderItem, "insert">;
export type SaleInsert = InferModel<typeof sale, "insert">;
export type SaleItemInsert = InferModel<typeof saleItem, "insert">;
export type ExternalCostInsert = InferModel<typeof externalCost, "insert">;
