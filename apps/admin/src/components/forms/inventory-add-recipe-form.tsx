"use client";

import { cn } from "@/lib/utils";
import { addRecipeInventory } from "@/server/mutations/inventory";
import { inventoryAddRecipeSchema } from "@/types/schemas";
import { InventoryAddRecipeFormValues } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { MeasurementType, MeasurementUnit } from "@prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { CalendarIcon, Loader2, Plus, X } from "lucide-react";
import Link from "next/link";
import React, { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TypographyH3,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  FormDescription,
  TypographyP,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "ui";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
dayjs.locale("tr");
const InventoryAddRecipeForm = ({
  units,
  recipes,
}: {
  units: (MeasurementType & {
    unit: MeasurementUnit[];
  })[];
  recipes: {
    id: number;
    name: string;
    price: number;
  }[];
}) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<InventoryAddRecipeFormValues>({
    resolver: zodResolver(inventoryAddRecipeSchema),
  });
  function onSubmit(data: InventoryAddRecipeFormValues) {
    startTransition(() => {
      return addRecipeInventory(data);
    });
  }
  const { fields, append, remove } = useFieldArray({
    name: "recipes",
    control: form.control,
  });
  return (
    <Form {...form}>
      {recipes.length ? (
        <div className="space-y-3">
          <TypographyH3 classname="text-xl font-semibold">İlk önce tarif eklemelisin</TypographyH3>
          <TypographyP classname="text-muted-foreground">
            Ürettiğin ürünleri envantere ekleyebilmemiz için öncelikle ürünlerin tariflerini eklemelisin.
          </TypographyP>
          <Button asChild>
            <Link href="/tarifler/yeni">Yeni Tarif Ekle</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex max-w-xs flex-1 flex-col">
                <FormLabel className="mb-2">Tarih*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? dayjs(field.value).format("LL") : <span>Tarih seç</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-3">
            <div>
              <TypographyH3 classname="text-xl font-semibold">Tarifler</TypographyH3>
              {fields.length === 0 && (
                <TypographyP classname="text-sm text-muted-foreground">Daha bir tarif seçmediniz</TypographyP>
              )}
            </div>

            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {fields.map((field, index) => (
                <Card key={index} className="col-span-1">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{recipes.filter((recipe) => recipe.id.toString() === field.recipeId)[0].name}</CardTitle>
                    <Button
                      variant="ghost"
                      onClick={() => remove(index)}
                      size="sm"
                      className="h-max w-max rounded-sm p-0 text-red-600 opacity-70 ring-offset-background transition-opacity hover:bg-background hover:text-red-600 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardHeader>

                  <CardContent>
                    <div className="flex gap-3">
                      <FormField
                        control={form.control}
                        key={field.id}
                        name={`recipes.${index}.amount`}
                        render={({ field: fieldIndividual }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input {...fieldIndividual} placeholder="adet" />
                            </FormControl>
                            <FormDescription className="text-xs">
                              Ürettiğiniz adeti giriniz. (Toplam: ₺
                              {fieldIndividual.value *
                                recipes.filter((recipe) => recipe.id.toString() === field.recipeId)[0].price}
                              )
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sky-600 hover:text-sky-600 data-[state=open]:bg-secondary">
                    <Plus className="mr-2 h-4 w-4" />
                    Tarif Ekle
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {recipes.map((recipe) => (
                    <DropdownMenuItem
                      key={recipe.id}
                      onClick={() =>
                        append({
                          recipeId: recipe.id.toString(),
                          amount: 0,
                        })
                      }
                    >
                      {recipe.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Button type="submit" className="w-full md:w-max" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Ekleniyor
              </>
            ) : (
              "Yeni Stok Ekle"
            )}
          </Button>
        </form>
      )}
    </Form>
  );
};

export default InventoryAddRecipeForm;
