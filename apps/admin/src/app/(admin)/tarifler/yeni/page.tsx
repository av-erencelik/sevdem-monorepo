import NewRecipeForm from "@/components/forms/new-recipe-form";
import { getIngredientsForForm } from "@/server/get_ingredients";
import { getUnits } from "@/server/query-units";
import React from "react";
import { Separator } from "ui";

const NewRecipePage = async () => {
  const units = await getUnits();
  const ingredients = await getIngredientsForForm();
  return (
    <div className="space-y-6 rounded-lg border border-border p-10 pb-16 shadow-md">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Yeni Tarif</h2>
        <p className="text-muted-foreground">Eklediğin malzemelerle yeni bir tarif oluştur.</p>
      </div>
      <Separator className="my-6" />
      <div>
        <NewRecipeForm units={units} ingredients={ingredients} />
      </div>
    </div>
  );
};

export default NewRecipePage;
