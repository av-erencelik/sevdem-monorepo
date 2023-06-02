import IngredientDetails from "@/components/ingredient-details";
import RecipeTable from "@/components/tables/recipe-table";
import { getIngredient } from "@/server/get-ingredient";
import { Separator } from "ui";
import { columns } from "@/components/tables/columns";
import PriceHistory from "@/components/charts/price-history";

const IngredientDetailsPage = async ({ params }: { params: { ingredientId: string } }) => {
  const ingredient = await getIngredient(params.ingredientId);
  if (!ingredient) return <div>Malzeme bulunamadı</div>;
  return (
    <div className="space-y-6 rounded-lg border border-border p-10 pb-16 shadow-sm">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{ingredient.name}</h2>
        <p className="text-muted-foreground">{ingredient.name} hakkında detayları incele.</p>
      </div>
      <Separator className="my-6" />
      <div>
        <IngredientDetails ingredient={ingredient} />
      </div>
      <Separator className="my-6" />
      <div>
        <RecipeTable columns={columns} data={ingredient.recipes} />
      </div>
      <div>
        <PriceHistory data={ingredient.priceHistory} />
      </div>
    </div>
  );
};

export default IngredientDetailsPage;
