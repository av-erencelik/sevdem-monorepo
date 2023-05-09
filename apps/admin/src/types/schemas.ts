import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import {
  externalCost,
  ingredient,
  ingredientInventory,
  measurement,
  order,
  orderItem,
  price,
  recipe,
  recipeIngredient,
  sale,
  saleItem,
} from "@/db/schema";

export const signInSchema = z
  .object({
    identifier: z.string().email("Lütfen geçerli bir e-posta adresi giriniz"),
    password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
  })
  .required();

export const insertMeasurementSchema = createInsertSchema(measurement);
export const insertIngredientSchema = createInsertSchema(ingredient);
export const insertPriceSchema = createInsertSchema(price);
export const insertRecipeSchema = createInsertSchema(recipe);
export const insertRecipeIngredientSchema = createInsertSchema(recipeIngredient);
export const insertIngredientInventorySchema = createInsertSchema(ingredientInventory);
export const insertOrderSchema = createInsertSchema(order);
export const insertOrderItemSchema = createInsertSchema(orderItem);
export const insertSaleSchema = createInsertSchema(sale);
export const insertSaleItemSchema = createInsertSchema(saleItem);
export const insertExternalCostSchema = createInsertSchema(externalCost);
