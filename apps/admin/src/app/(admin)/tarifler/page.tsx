import { columns } from "@/components/tables/recipe-columns";
import DataTable from "@/components/tables/data-table";

import { getRecipes } from "@/server/get-recipes";
import Link from "next/link";
import React from "react";
import { Separator } from "ui";

const RecipesPage = async () => {
  const recipes = await getRecipes();
  return (
    <div className="space-y-6 rounded-lg border border-border p-10 pb-16 shadow-md">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Tarifler</h2>
          <p className="text-muted-foreground">Şimdiye kadar eklediğin tüm tarifleri buradan inceleyebilirsin</p>
        </div>
        <Link
          href="/tarifler/yeni"
          className="w-max rounded-md bg-secondary px-3 py-2 text-sm text-sky-600 transition-colors hover:bg-secondary/80"
        >
          Yeni Tarif Ekle
        </Link>
      </div>
      <Separator className="my-6" />
      <div>
        <DataTable
          data={recipes}
          columns={columns}
          title="Daha önce bir tarif eklememişsiniz"
          href="/tarifler/yeni"
          buttonText="Yeni Malzeme Ekle"
        />
      </div>
    </div>
  );
};

export default RecipesPage;
