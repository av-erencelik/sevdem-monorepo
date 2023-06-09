import getSummary from "@/server/get-summary";
import { Banknote, Cookie, CreditCard, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "ui";

const Summary = async ({ month }: { month: number }) => {
  const {
    diffProfit,
    diffSales,
    thisMonthProfit,
    thisMonthSales,
    diffOrders,
    thisMonthOrders,
    thisMonthMostSoldRecipe,
  } = await getSummary(month);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Kâr</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{thisMonthProfit} TL</div>
          <p className="text-xs text-muted-foreground">
            {month === 12 ? "Geçen yıla göre" : "Geçen aya göre"} ₺{Math.abs(diffProfit)}{" "}
            {diffProfit < 0 ? "düşüş" : "artış"}
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Satış</CardTitle>
          <Banknote className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{thisMonthSales} Adet</div>
          <p className="text-xs text-muted-foreground">
            {month === 12 ? "Geçen yıla göre" : "Geçen aya göre"} %{diffSales} {diffSales < 0 ? "düşüş" : "artış"}
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Satın Alım</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{thisMonthOrders} TL</div>
          <p className="text-xs text-muted-foreground">
            {month === 12 ? "Geçen yıla göre" : "Geçen aya göre"} %{diffOrders} {diffOrders < 0 ? "düşüş" : "artış"}
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">En Çok Satan</CardTitle>
          <Cookie className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{thisMonthMostSoldRecipe ? thisMonthMostSoldRecipe[0] : "Yok"}</div>
          <p className="text-xs text-muted-foreground">
            {thisMonthMostSoldRecipe
              ? `${month === 12 ? "Bu yıl" : "Bu ay"} ${thisMonthMostSoldRecipe[1]} adet satıldı`
              : `${month === 12 ? "Bu yıl" : "Bu ay"} daha satış yapmadın`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Summary;
