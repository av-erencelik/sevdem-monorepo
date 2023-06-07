"use client";
import { SaleTable } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "ui";
import "dayjs/locale/tr";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "ui";
import { deleteSale } from "@/server/sales";

dayjs.locale("tr");
export const saleColumns: ColumnDef<SaleTable>[] = [
  {
    accessorKey: "name",
    id: "isim",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          İsim
          <ArrowUpDown className="ml-2 h-4 min-h-[1rem] w-4 min-w-[1rem]" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
      const id = row.original.id;
      return (
        <div>
          <Link href={`tarifler/${id}`} className="font-medium text-sky-600 hover:underline">
            {name}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "totalSale",
    id: "toplamBedel",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Toplam Bedel
          <ArrowUpDown className="ml-2 h-4 min-h-[1rem] w-4 min-w-[1rem]" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.original.totalSale;
      const formatted = new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
      }).format(price);
      return (
        <div>
          <div className="w-20 text-center">{formatted}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "totalSoldItem",
    id: "Toplam Satılan Ürün",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Toplam Satılan Ürün
          <ArrowUpDown className="ml-2 h-4 min-h-[1rem] w-4 min-w-[1rem]" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const totalSold = row.original.totalSoldItem;

      return (
        <div>
          <div className="w-20 text-center">{totalSold + " Adet"}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "saleDate",
    id: "tarih",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Üretildiği Tarih
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.original.saleDate;
      const formatted = dayjs(date).format("DD/MM/YYYY");
      return (
        <div>
          <div className="w-28 text-center">{formatted}</div>
        </div>
      );
    },
  },
  {
    id: "eylemler",
    header: () => {
      return <div className="flex justify-end">Eylemler</div>;
    },
    maxSize: 100,
    size: 50,
    cell: ({ row }) => {
      const id = row.original.id;
      const [isPending, startTransition] = useTransition();
      const router = useRouter();
      const action = () => {
        startTransition(() => {
          deleteSale(id);
        });
        router.refresh();
      };
      return (
        <DropdownMenu>
          <div className="mr-4 flex justify-end">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex h-8 w-8 p-0">
                <span className="sr-only">Menüyü aç</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer text-red-500 hover:text-red-600 focus:text-red-500"
              onClick={action}
            >
              Sil
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
