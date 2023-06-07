"use client";

import { type EditIngredient } from "@/types/types";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import {
  ArrowDown,
  ArrowUp,
  Banknote,
  CalendarDays,
  LineChart,
  Refrigerator,
  TrendingDown,
  TrendingUp,
  UtensilsCrossed,
} from "lucide-react";
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
    priceChangePercantage: number | undefined;
  };
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-md">
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
      <Card className="shadow-md">
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
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Fiyat Değişimi</CardTitle>
          <LineChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getPercantageText(ingredient.priceChangePercantage)}</div>
        </CardContent>
      </Card>
      <Card className="shadow-md">
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

const getPercantageText = (percantage: number | undefined) => {
  if (percantage === undefined) return <span>Veri Yok</span>;
  if (percantage > 0)
    return (
      <div className="flex items-center text-red-600">
        <ArrowUp className="h-6 w-6 " />
        <span>{`%${percantage.toFixed(2)}`}</span>
      </div>
    );
  if (percantage < 0)
    return (
      <div className="flex items-center text-green-600">
        <ArrowDown className="h-6 w-6 " />
        <span>{`-%${Math.abs(percantage).toFixed(2)}`}</span>
      </div>
    );
  if (percantage == 0)
    return (
      <div className="flex items-center">
        <ArrowDown className="h-6 w-6" />
        <span>{`%${Math.abs(percantage).toFixed(2)}`}</span>
      </div>
    );
};
