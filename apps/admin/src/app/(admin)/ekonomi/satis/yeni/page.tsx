import NewSaleForm from "@/components/forms/new-sale-form";
import { getRecipesForEconomy } from "@/server/get-recipes";
import { Separator } from "ui";

const NewSalePage = async () => {
  const recipes = await getRecipesForEconomy();
  return (
    <div className="space-y-6 rounded-lg border border-border p-10 pb-16 shadow-md">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Satış Ekle</h2>
        <p className="text-muted-foreground">Satış yaptığın ürünleri buradan ekleyebilirisiniz</p>
      </div>
      <Separator className="my-6" />
      <div>
        <NewSaleForm recipes={recipes} />
      </div>
    </div>
  );
};

export default NewSalePage;
