import Summary from "@/components/summary";
import Container from "./container";
import DataTable from "@/components/tables/external-costs-table";
import { getExternalCostsEconomy } from "@/server/external-costs";
import { columns } from "@/components/tables/external-costs-columns";
import { getSalesEconomy } from "@/server/sales";
import SaleTable from "@/components/tables/sale-table";
import { saleColumns } from "@/components/tables/sales-columns";
import MonthSelect from "@/components/month-select";

const EconomyPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  console.log(searchParams);
  const month = searchParams.month ? parseInt(searchParams.month as string) : undefined;
  const externalCosts = await getExternalCostsEconomy(month);
  const sales = await getSalesEconomy(month);
  return (
    <section className="space-y-5">
      <div className="mt-6 flex flex-col gap-4 rounded-lg border border-border p-5 shadow-md md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Ekonomi</h2>
          <p className="text-muted-foreground">İşletmenizin ekonomisini ayrıntılı inceleyin</p>
        </div>
        <MonthSelect />
      </div>
      {/* @ts-expect-error Server Component */}
      <Summary isYearly={searchParams.month ? false : true} month={month} />
      <Container title="Satışlar">
        <SaleTable data={sales} columns={saleColumns} />
      </Container>
      <Container title="Giderler">
        <DataTable data={externalCosts} columns={columns} />
      </Container>
    </section>
  );
};

export default EconomyPage;
