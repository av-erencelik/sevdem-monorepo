import { Banknote, Percent, PiggyBank, Refrigerator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "ui";

type RecipeDetailsProps = {
  totalCost: number;
  targetMargin: number;
  profitMarginPercentage: number;
  sellQuantity: number;
  createdItems: number;
  yieldCount: number;
};

const RecipeDetails = (recipe: RecipeDetailsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mevcut Stok</CardTitle>
          <Refrigerator className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{recipe.createdItems} Adet</div>
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ürün Maliyeti</CardTitle>
          <Banknote className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{(recipe.totalCost / recipe.yieldCount).toFixed(2)} TL</div>
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Satış</CardTitle>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{recipe.sellQuantity} Adet</div>
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Kar Marjı</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {recipe.profitMarginPercentage >= recipe.targetMargin ? (
            <div className="text-2xl font-bold text-green-600">{`%${recipe.profitMarginPercentage.toFixed(2)}`}</div>
          ) : (
            <div className="text-2xl font-bold text-red-600">{`%${recipe.profitMarginPercentage.toFixed(2)}`}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeDetails;
