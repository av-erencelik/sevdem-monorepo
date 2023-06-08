import IngredientDetails from "@/components/ingredient-details";
import { getIngredient } from "@/server/get-ingredient";
import { TypographyH4 } from "ui";
import { columns } from "@/components/tables/recipe-columns";
import PriceHistory from "@/components/charts/price-history";
import Link from "next/link";
import DataTable from "@/components/tables/data-table";

const IngredientDetailsPage = async ({ params }: { params: { ingredientId: string } }) => {
  const ingredient = await getIngredient(params.ingredientId);
  if (!ingredient)
    return (
      <div className="flex flex-col items-center justify-center gap-4 md:gap-0">
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-center text-2xl font-bold tracking-tight">Malzeme Kayıp</h2>
          <p className="text-muted-foreground">
            Oops! Malzemeler kayboldu. Kaybolan malzemeleri bulmak için ne yapmalıydık? Ah evet, 'Yeni Malzeme Ekle'
            butonuna tıklamak! 🧙‍♂️
          </p>
          <Link
            href={`/malzemeler/yeni`}
            className="w-max rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Yeni Malzeme Ekle
          </Link>
        </div>
      </div>
    );
  return (
    <>
      <div className="mt-6 flex flex-col gap-4 rounded-lg border border-border p-5 shadow-md md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">{ingredient.name}</h2>
          <p className="text-muted-foreground">{ingredient.name} hakkında detayları incele.</p>
        </div>
        <Link
          href={`/malzemeler/${ingredient.id}/duzenle`}
          className="w-max rounded-md bg-secondary px-3 py-2 text-sm text-sky-600 transition-colors hover:bg-secondary/80"
        >
          Düzenle
        </Link>
      </div>

      <div className="mt-6">
        <IngredientDetails ingredient={ingredient} />
      </div>

      <div className="mt-6 rounded-lg border border-border p-10 pb-16 shadow-md">
        <PriceHistory data={ingredient.priceHistory} title="Malzeme Fiyat Değişimi" />
      </div>

      <div className="mt-6 rounded-lg border border-border p-10 pb-16 shadow-md">
        <TypographyH4 classname="mb-4">Kullanan Tarifler</TypographyH4>
        <DataTable
          columns={columns}
          data={ingredient.recipes}
          title="Daha önce bir tarif eklememişsiniz"
          href="/tarifler/yeni"
          buttonText="Yeni Tarif Ekle"
        />
      </div>
    </>
  );
};

export default IngredientDetailsPage;
