import { z } from "zod";
import {
  NewRecipeSchema,
  editIngredientSchema,
  inventoryAddIngredientSchema,
  inventoryAddRecipeSchema,
  newIngredientSchema,
  signInSchema,
} from "./schemas";
import type { LucideIcon } from "lucide-react";

export type SignInFormData = z.infer<typeof signInSchema>;

export type SidebarNavItem = {
  title: string;
  icon?: LucideIcon;
} & (
  | {
      path: string;
      items?: never;
    }
  | {
      path?: string;
      items: NavItem[];
    }
);

export type NavItem = {
  title: string;
  path: string;
};

export type NewIngredientFormValues = z.infer<typeof newIngredientSchema>;

export type NewRecipeFormValues = z.infer<typeof NewRecipeSchema>;

export type InventoryAddRecipeFormValues = z.infer<typeof inventoryAddRecipeSchema>;

export type InventoryAddIngredientFormValues = z.infer<typeof inventoryAddIngredientSchema>;

export type EditIngredient = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: number;
  mlToGram: number | undefined;
  priceId: number;
  unitId: number;
  type: {
    unit: MeasurementUnit[];
    id: number;
    name: string;
  };
};

export type EditIngredientFormValues = z.infer<typeof editIngredientSchema>;

export type RecipeTable = {
  id: number;
  name: string;
  yield: number;
  yieldName: string;
  totalCost: number;
  sellPrice: number;
  profitMarginPercentage: number;
  targetMargin: number;
};

export type RecipeInventoryTable = {
  id: number;
  recipeId: number;
  name: string;
  yieldName: string;
  yieldCreated: number;
  price: number;
  createdAt: Date;
};

export type IngredientInventoryTable = {
  id: number;
  ingredientId: number;
  name: string;
  unitAbbreviation: string;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
};
