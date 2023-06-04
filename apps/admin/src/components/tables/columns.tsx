"use client";

import { deleteIngredient } from "@/server/mutations/ingredient";
import { deleteRecipe } from "@/server/mutations/recipe";
import { RecipeTable } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "ui";

export const columns: ColumnDef<RecipeTable>[] = [
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
    accessorKey: "yield",
    id: "Ürün",
    header: ({ column }) => {
      return <div className="ml-4">Ürün</div>;
    },
    cell: ({ row }) => {
      const yieldValue = row.original.yield;
      const yieldName = row.original.yieldName;
      return (
        <div>
          <div className="w-20 text-center">
            {yieldValue} {yieldName}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "totalCost",
    id: "Toplam Maliyet",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Toplam Maliyet
          <ArrowUpDown className="ml-2 h-4 min-h-[1rem] w-4 min-w-[1rem]" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.original.totalCost;
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
    accessorKey: "sellPrice",
    id: "Satış Fiyatı",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Satış Fiyatı
          <ArrowUpDown className="ml-2 h-4 min-h-[1rem] w-4 min-w-[1rem]" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.original.sellPrice;
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
    accessorKey: "profitMarginPercentage",
    id: "Kar Marjı",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Kar Marjı
          <ArrowUpDown className="ml-2 h-4 min-h-[1rem] w-4 min-w-[1rem]" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const profitMargin = row.original.profitMarginPercentage;
      const target = row.original.targetMargin;
      const formatted = `%${profitMargin.toFixed(2)}`;
      if (profitMargin < target) {
        return (
          <div className="text-red-600">
            <div className="w-20 text-center">{formatted}</div>
          </div>
        );
      } else {
        return (
          <div>
            <div className="w-20 text-center">{formatted}</div>
          </div>
        );
      }
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
          deleteRecipe(id);
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
              <Link href={`tarifler/${id}`}>İncele</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href={`tarifler/${id}/duzenle`}>Düzenle</Link>
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
