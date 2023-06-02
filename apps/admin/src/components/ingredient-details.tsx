"use client";

import { type EditIngredient } from "@/types/types";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { Banknote, CalendarDays, Refrigerator, UtensilsCrossed } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "ui";
dayjs.locale("tr");
const IngredientDetails = ({
  ingredient,
}: {
  ingredient: EditIngredient & {
    createdAt: Date;
    updatedAt: Date;
    inventory: number;
    abbreviation: string;
    recipeCount: number;
  };
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mevcut Stok</CardTitle>
          <Refrigerator className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {ingredient.inventory} {ingredient.abbreviation}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Birim Fiyat</CardTitle>
          <Banknote className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(ingredient.price / (ingredient.quantity * ingredient.size)).toFixed(2)} TL
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Kullanan Tarifler</CardTitle>
          <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{ingredient.recipeCount} Adet</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Son Değişiklik</CardTitle>
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dayjs(ingredient.updatedAt).format("D MMMM")}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IngredientDetails;
