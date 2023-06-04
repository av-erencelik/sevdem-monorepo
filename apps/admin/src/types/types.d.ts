import { z } from "zod";
import { NewRecipeSchema, editIngredientSchema, newIngredientSchema, signInSchema } from "./schemas";
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
