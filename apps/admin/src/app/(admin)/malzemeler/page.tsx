import { getIngredients } from "@/server/get-ingredients";
import React from "react";
import { Separator } from "ui";

import { columns } from "./columns";
import Link from "next/link";
import DataTable from "@/components/tables/data-table";

const Page = async () => {
  const ingredients = await getIngredients();
  return (
    <div className="space-y-6 rounded-lg border border-border p-10 pb-16 shadow-md">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Malzemeler</h2>
          <p className="text-muted-foreground">Şimdiye kadar eklediğin tüm malzemeleri buradan inceleyebilirsin</p>
        </div>
        <Link
          href="/malzemeler/yeni"
          className="w-max rounded-md bg-secondary px-3 py-2 text-sm text-sky-600 transition-colors hover:bg-secondary/80"
        >
          Yeni Malzeme Ekle
        </Link>
      </div>

      <Separator className="my-6" />
      <div>
        <DataTable
          data={ingredients}
          data-superjson
          columns={columns}
          title="Daha önce bir malzeme eklememişsiniz."
          buttonText="Yeni Malzeme Ekle"
          href="/malzemeler/yeni"
        />
      </div>
    </div>
  );
};

export default Page;
