"use client";

import { IngredientRefactored } from "@/server/get_ingredients";
import { deleteIngredient } from "@/server/mutations/ingredient";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "ui";

export const columns: ColumnDef<IngredientRefactored>[] = [
  {
    accessorKey: "name",
    id: "isim",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          İsim
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
      const id = row.original.id;
      return (
        <div>
          <Link href={`malzemeler/${id}`} className="font-medium text-sky-600 hover:underline">
            {name}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    id: "miktar",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Miktar
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.original.amount;
      const abrrevation = row.original.abbreviation;
      const formatted = amount + " " + abrrevation;
      return (
        <div>
          <div className="w-20 text-center">{formatted}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    id: "fiyat",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Fiyat
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.original.price;
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
    accessorKey: "unitPrice",
    id: "birim/fiyat",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Birim/Fiyat
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.original.unitPrice;
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
          deleteIngredient(id);
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
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href={`malzemeler/${id}`}>İncele</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href={`malzemeler/${id}/duzenle`}>Düzenle</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
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
