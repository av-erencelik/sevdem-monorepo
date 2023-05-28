import { cn } from "@/lib/utils";
import { getTasks } from "@/server/tasks";
import { AlertTriangle, CheckCheck } from "lucide-react";
import Link from "next/link";
import { Button, Card, CardContent, CardHeader, CardTitle, Separator } from "ui";

const Tasks = async () => {
  const { createdItemCount, ingredientCount, inventoryCount, recipeCount, saleCount } = await getTasks();
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
      <Card className="col-span-5">
        <CardHeader>
          <CardTitle>Yapılması Gerekenler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex-col justify-center overflow-hidden rounded-md border border-border">
            <div
              className={cn("flex items-center justify-between bg-amber-100 p-4 text-amber-600", {
                "bg-green-100 text-green-600 line-through": ingredientCount > 0,
              })}
            >
              <div className="flex items-center space-x-2">
                {ingredientCount > 0 ? (
                  <CheckCheck className="h-4 min-h-[1rem] w-4 min-w-[1rem]" />
                ) : (
                  <AlertTriangle className="h-4 min-h-[1rem] w-4 min-w-[1rem]" />
                )}
                <p className="text-sm">İlk tarifini oluşturmak için önce bir malzeme eklemelisin</p>
              </div>
              {ingredientCount <= 0 && (
                <Link href="/malzemeler/yeni" className="text-sm font-semibold hover:underline">
                  <span className="hover:underline lg:hidden">Ekle</span>
                  <span className="hidden hover:underline lg:inline-block">Malzeme Ekle</span>
                </Link>
              )}
            </div>
            <Separator />
            <div
              className={cn("flex items-center justify-between bg-amber-100 p-4 text-amber-600", {
                "bg-green-100 text-green-600 line-through": recipeCount > 0,
              })}
            >
              <div className="flex items-center space-x-2">
                {recipeCount > 0 ? (
                  <CheckCheck className="h-4 min-h-[1rem] w-4 min-w-[1rem]" />
                ) : (
                  <AlertTriangle className="h-4 min-h-[1rem] w-4 min-w-[1rem]" />
                )}
                <p className="text-sm">Malzemeleri ekledikten sonra ilk tarifini oluşturabilirsin</p>
              </div>
              {recipeCount <= 0 && (
                <Link href="/tarifler/yeni" className="text-sm font-semibold hover:underline">
                  <span className="hover:underline lg:hidden">Ekle</span>
                  <span className="hidden hover:underline lg:inline-block">Tarif Ekle</span>
                </Link>
              )}
            </div>
            <Separator />
            <div
              className={cn("flex items-center justify-between bg-amber-100 p-4 text-amber-600", {
                "bg-green-100 text-green-600 line-through": inventoryCount > 0,
              })}
            >
              <div className="flex items-center space-x-2">
                {inventoryCount > 0 ? (
                  <CheckCheck className="h-4 min-h-[1rem] w-4 min-w-[1rem]" />
                ) : (
                  <AlertTriangle className="h-4 min-h-[1rem] w-4 min-w-[1rem]" />
                )}
                <p className="text-sm">Satın aldığın malzemeleri envantere ekleyebilirsin</p>
              </div>
              {inventoryCount <= 0 && (
                <Link href="/tarifler/yeni" className="text-sm font-semibold hover:underline">
                  <span className="hover:underline lg:hidden">Ekle</span>
                  <span className="hidden hover:underline lg:inline-block">Envantere Malzeme Ekle</span>
                </Link>
              )}
            </div>
            <Separator />
            <div
              className={cn("flex items-center justify-between bg-amber-100 p-4 text-amber-600", {
                "bg-green-100 text-green-600 line-through": createdItemCount > 0,
              })}
            >
              <div className="flex items-center space-x-2">
                {createdItemCount > 0 ? (
                  <CheckCheck className="h-4 min-h-[1rem] w-4 min-w-[1rem]" />
                ) : (
                  <AlertTriangle className="h-4 min-h-[1rem] w-4 min-w-[1rem]" />
                )}
                <p className="text-sm">Ürettiğin tarifleri daha sonra satmak üzere envanter ekleyebilirsin</p>
              </div>
              {createdItemCount <= 0 && (
                <Link href="/tarifler/yeni" className="text-sm font-semibold hover:underline">
                  <span className="hover:underline lg:hidden">Ekle</span>
                  <span className="hidden hover:underline lg:inline-block">Ürettiklerini Ekle</span>
                </Link>
              )}
            </div>
            <Separator />
            <div
              className={cn("flex items-center justify-between bg-amber-100 p-4 text-amber-600", {
                "bg-green-100 text-green-600 line-through": saleCount > 0,
              })}
            >
              <div className="flex items-center space-x-2">
                {saleCount > 0 ? (
                  <CheckCheck className="h-4 min-h-[1rem] w-4 min-w-[1rem]" />
                ) : (
                  <AlertTriangle className="h-4 min-h-[1rem] w-4 min-w-[1rem]" />
                )}
                <p className="text-sm">Daha sonra bu ürettiklerinin satışını ekleyebilirsin</p>
              </div>
              {saleCount <= 0 && (
                <Link href="/tarifler/yeni" className="text-sm font-semibold">
                  <span className="hover:underline lg:hidden">Ekle</span>
                  <span className="hidden hover:underline lg:inline-block">Satış Ekle</span>
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="col-span-5 flex flex-col gap-4 xl:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Hızlı İşlem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex-col text-sm text-muted-foreground">
              <Link
                href="/malzemeler/yeni"
                className={cn(
                  "flex w-full items-center whitespace-nowrap rounded-md p-2 transition-colors hover:bg-muted hover:text-foreground"
                )}
              >
                Yeni Malzeme Ekle
              </Link>
              <Link
                href="/malzemeler/yeni"
                className={cn(
                  "flex w-full items-center whitespace-nowrap rounded-md p-2 transition-colors hover:bg-muted hover:text-foreground"
                )}
              >
                Yeni Tarif Ekle
              </Link>
              <Link
                href="/malzemeler/yeni"
                className={cn(
                  "flex w-full items-center whitespace-nowrap rounded-md p-2 transition-colors hover:bg-muted hover:text-foreground"
                )}
              >
                Envantere Yeni Malzeme Ekle
              </Link>
              <Link
                href="/malzemeler/yeni"
                className={cn(
                  "flex w-full items-center whitespace-nowrap rounded-md p-2 transition-colors hover:bg-muted hover:text-foreground"
                )}
              >
                Yeni Satış Ekle
              </Link>
            </div>
          </CardContent>
        </Card>
        <div className="grid w-full grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Malzemeler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ingredientCount} Adet</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tarifler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recipeCount} Adet</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
