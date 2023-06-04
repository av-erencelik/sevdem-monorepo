import PriceHistory from "@/components/charts/price-history";
import RecipeCostByIngredientChart from "@/components/charts/recipe-cost-ingredient";
import RecipeDetails from "@/components/recipe-details";
import { getRecipe } from "@/server/get-recipe";
import Link from "next/link";
import { TypographyH4 } from "ui";
import DataTable from "../../malzemeler/data-table";
import { columns } from "../../malzemeler/columns";

const RecipeDetailsPage = async ({ params }: { params: { recipeId: string } }) => {
  const recipe = await getRecipe(params.recipeId);
  return (
    <>
      <div className="mt-6 flex flex-col gap-4 rounded-lg border border-border p-5 shadow-md md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">{recipe.name}</h2>
          <p className="text-muted-foreground">{recipe.name} hakkında detayları incele.</p>
        </div>
        <Link
          href={`/tarifler/${recipe.id}/duzenle`}
          className="w-max rounded-md bg-secondary px-3 py-2 text-sm text-sky-600 transition-colors hover:bg-secondary/80"
        >
          Düzenle
        </Link>
      </div>

      <div className="mt-6">
        <RecipeDetails
          createdItems={recipe.createdItems ?? 0}
          profitMarginPercentage={recipe.profitMarginPercentage}
          sellQuantity={recipe.sellQuantity}
          targetMargin={recipe.targetMargin}
          totalCost={recipe.totalCost}
          yieldCount={recipe.yield}
        />
      </div>

      <div className="mt-6 rounded-lg border border-border p-10 pb-16 shadow-md">
        <TypographyH4>Malzeme Başı Maliyet</TypographyH4>
        <RecipeCostByIngredientChart data={recipe.ingredientCosts} />
      </div>
      <div className="mt-6 rounded-lg border border-border p-10 pb-16 shadow-md">
        <PriceHistory data={recipe.costHistory} title="Tarif Maliyet Değişimi" />
      </div>
      <div className="mt-6 rounded-lg border border-border p-10 pb-16 shadow-md">
        <PriceHistory data={recipe.sellPriceHistory} title="Tarif Fiyat Değişimi" />
      </div>
      <div className="mt-6 rounded-lg border border-border p-10 pb-16 shadow-md">
        <TypographyH4>Kullanılan Malzemeler</TypographyH4>
        <DataTable data={recipe.ingredientsDataTable} columns={columns} />
      </div>
    </>
  );
};

export default RecipeDetailsPage;
