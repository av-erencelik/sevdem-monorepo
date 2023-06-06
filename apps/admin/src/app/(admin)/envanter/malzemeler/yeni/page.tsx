import InventoryAddIngredientForm from "@/components/forms/inventory-add-ingredient-form";
import { getInventoryIngredients } from "@/server/get-ingredients";
import { getUnits } from "@/server/query-units";
import { Separator } from "ui";

const InventoryAddIngredient = async () => {
  const units = await getUnits();
  const ingredients = await getInventoryIngredients();
  return (
    <div className="space-y-6 rounded-lg border border-border p-10 pb-16 shadow-md">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Malzeme Stoğu Ekle</h2>
        <p className="text-muted-foreground">Satın aldığın malzemeleri stoğa ekle</p>
      </div>
      <Separator className="my-6" />
      <div>
        <InventoryAddIngredientForm units={units} ingredients={ingredients} />
      </div>
    </div>
  );
};

export default InventoryAddIngredient;
