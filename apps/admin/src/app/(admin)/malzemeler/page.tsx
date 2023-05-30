import { getIngredients } from "@/server/get_ingredients";
import React from "react";
import { Separator } from "ui";
import DataTable from "./data-table";
import { columns } from "./columns";

const Page = async () => {
  const ingredients = await getIngredients();
  return (
    <div className="space-y-6 rounded-lg border border-border p-10 pb-16 shadow-sm">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Malzemeler</h2>
        <p className="text-muted-foreground">Şimdiye kadar eklediğin tüm malzemeleri buradan inceleyebilirsin</p>
      </div>
      <Separator className="my-6" />
      <div>
        <DataTable data={ingredients} data-superjson columns={columns} />
      </div>
    </div>
  );
};

export default Page;
