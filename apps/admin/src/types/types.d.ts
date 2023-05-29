import { z } from "zod";
import { newIngredientSchema, signInSchema } from "./schemas";
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

export type newIngredientFormValues = z.infer<typeof newIngredientSchema>;
