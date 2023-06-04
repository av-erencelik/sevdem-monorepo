import EditRecipeForm from "@/components/forms/edit-recipe-form";
import { getIngredientsForForm } from "@/server/get_ingredients";
import { getUnits } from "@/server/query-units";
import { getEditFormRecipe } from "@/server/recipe";
import React from "react";
import { Separator } from "ui";

const EditRecipePage = async ({ params }: { params: { recipeId: string } }) => {
  const units = await getUnits();
  const ingredients = await getIngredientsForForm();
  const recipe = await getEditFormRecipe(params.recipeId);
  return (
    <div className="space-y-6 rounded-lg border border-border p-10 pb-16 shadow-md">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{recipe.name}</h2>
        <p className="text-muted-foreground">Eklediğin bir tarifi düzenle</p>
      </div>
      <Separator className="my-6" />
      <div>
        <EditRecipeForm units={units} ingredients={ingredients} recipe={recipe} recipeId={params.recipeId} />
      </div>
    </div>
  );
};

export default EditRecipePage;
