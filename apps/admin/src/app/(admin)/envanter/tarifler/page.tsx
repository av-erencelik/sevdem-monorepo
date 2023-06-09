import { getInventoryRecipes } from "@/server/get-inventory";
import { Separator } from "ui";

import { columns } from "./columns";
import Link from "next/link";
import DataTable from "@/components/tables/data-table";

const InventoryRecipesPage = async () => {
  const inventoryRecipes = await getInventoryRecipes();
  return (
    <div className="space-y-6 rounded-lg border border-border p-10 pb-16 shadow-md">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Tarifler Envanteri</h2>
          <p className="text-muted-foreground">Şimdiye kadar ürettiğin tüm tarifleri burada görüntüleyebilirsin</p>
        </div>
        <Link
          href="/envanter/tarifler/yeni"
          className="w-max rounded-md bg-secondary px-3 py-2 text-sm text-sky-600 transition-colors hover:bg-secondary/80"
        >
          Yeni Stok Ekle
        </Link>
      </div>
      <Separator className="my-6" />
      <div>
        <DataTable
          data={inventoryRecipes}
          columns={columns}
          buttonText="Yeni Stok Ekle"
          href="/envanter/tarifler/yeni"
          title="Daha önce bir ürün stoğu eklememişsiniz."
        />
      </div>
    </div>
  );
};

export default InventoryRecipesPage;
