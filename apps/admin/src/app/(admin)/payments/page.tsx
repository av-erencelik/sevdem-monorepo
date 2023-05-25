import { Card, CardContent } from "ui";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "7282d52f",
      amount: 150,
      status: "failed",
      email: "n@example.com",
    },
    {
      id: "7282d52f",
      amount: 150,
      status: "failed",
      email: "n@example.com",
    },
    {
      id: "7282d52f",
      amount: 150,
      status: "failed",
      email: "n@example.com",
    },
    {
      id: "7282d52f",
      amount: 150,
      status: "failed",
      email: "n@example.com",
    },
    {
      id: "7282d52f",
      amount: 150,
      status: "failed",
      email: "n@example.com",
    },
    {
      id: "7282d52f",
      amount: 150,
      status: "failed",
      email: "n@example.com",
    },
    {
      id: "7282d52f",
      amount: 150,
      status: "failed",
      email: "n@example.com",
    },
    {
      id: "7282d52f",
      amount: 150,
      status: "failed",
      email: "n@example.com",
    },
    {
      id: "7282d52f",
      amount: 150,
      status: "pending",
      email: "n@example.com",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <section className="p-3">
      <Card>
        <CardContent className="flex justify-center p-10">
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </section>
  );
}
