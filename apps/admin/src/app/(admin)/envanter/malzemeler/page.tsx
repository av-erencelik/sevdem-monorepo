import { getIngredientInventory } from "@/server/get-inventory";
import Link from "next/link";
import { Separator } from "ui";

import { columns } from "./columns";
import DataTable from "@/components/tables/data-table";

const IngredientsInventoryPage = async () => {
  const ingredients = await getIngredientInventory();
  return (
    <div className="space-y-6 rounded-lg border border-border p-10 pb-16 shadow-md">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Malzemeler Envanteri</h2>
          <p className="text-muted-foreground">
            Şimdiye kadar satın aldığın malzemelerin stoklarını burada görüntüleyebilirsin
          </p>
        </div>
        <Link
          href="/envanter/malzemeler/yeni"
          className="w-max rounded-md bg-secondary px-3 py-2 text-sm text-sky-600 transition-colors hover:bg-secondary/80"
        >
          Yeni Stok Ekle
        </Link>
      </div>
      <Separator className="my-6" />
      <div>
        <DataTable
          data={ingredients}
          columns={columns}
          title="Daha önce bir malzeme eklememişsiniz."
          href="/envanter/malzemeler/yeni"
          buttonText="Yeni Stok Ekle"
        />
      </div>
    </div>
  );
};

export default IngredientsInventoryPage;
