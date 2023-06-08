import NewExternalCostForm from "@/components/forms/new-external-cost-form";
import { Separator } from "ui";

const NewExternalCostPage = () => {
  return (
    <div className="space-y-6 rounded-lg border border-border p-10 pb-16 shadow-md">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Gider Ekle</h2>
        <p className="text-muted-foreground">Harici giderlerinizi buradan ekleyebilirsiniz</p>
      </div>
      <Separator className="my-6" />
      <div>
        <NewExternalCostForm />
      </div>
    </div>
  );
};

export default NewExternalCostPage;
