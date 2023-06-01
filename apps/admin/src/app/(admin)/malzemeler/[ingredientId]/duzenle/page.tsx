import EditIngredientForm from "@/components/forms/edit-ingredient-form";
import { getIngredient } from "@/server/get-ingredient";

import { Separator } from "ui";

const EditIngredientPage = async ({ params }: { params: { ingredientId: string } }) => {
  const ingredient = await getIngredient(params.ingredientId);

  if (!ingredient) return <div>Malzeme bulunamadı</div>;
  return (
    <div className="space-y-6 rounded-lg border border-border p-10 pb-16 shadow-sm">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{ingredient.name}</h2>
        <p className="text-muted-foreground">Eklediğin bir malzemenin bilgilerini güncelle.</p>
      </div>
      <Separator className="my-6" />
      <div>
        <EditIngredientForm ingredient={ingredient} />
      </div>
    </div>
  );
};

export default EditIngredientPage;
