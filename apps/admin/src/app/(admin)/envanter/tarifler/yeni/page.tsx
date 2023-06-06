import InventoryAddRecipeForm from "@/components/forms/inventory-add-recipe-form";
import { getRecipesForInventory } from "@/server/get-recipes";
import { getUnits } from "@/server/query-units";
import { Separator } from "ui";

const InventoryAddRecipePage = async () => {
  const units = await getUnits();
  const recipes = await getRecipesForInventory();
  return (
    <div className="space-y-6 rounded-lg border border-border p-10 pb-16 shadow-md">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Tarif Stoğu Ekle</h2>
        <p className="text-muted-foreground">Ürettiğin tarifleri stoğa ekle</p>
      </div>
      <Separator className="my-6" />
      <div>
        <InventoryAddRecipeForm units={units} recipes={recipes} />
      </div>
    </div>
  );
};

export default InventoryAddRecipePage;
