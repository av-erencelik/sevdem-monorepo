"use client";
import { cn } from "@/lib/utils";
import { newExternalCost, newSale } from "@/server/mutations/economy";
import { newSaleSchema } from "@/types/schemas";
import { NewSaleFormValus } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { RecipeForEconomy } from "@/types/types";
import "dayjs/locale/tr";
import { CalendarIcon, Loader2, Plus, X } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  TypographyH3,
  TypographyP,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  FormDescription,
} from "ui";
import Link from "next/link";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
dayjs.locale("tr");
const NewSaleForm = ({ recipes }: { recipes: RecipeForEconomy[] }) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<NewSaleFormValus>({
    resolver: zodResolver(newSaleSchema),
  });
  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: form.control,
  });
  function onSubmit(data: NewSaleFormValus) {
    data.date.setHours(new Date().getHours());
    data.date.setMinutes(new Date().getMinutes());
    data.date.setSeconds(new Date().getSeconds());
    startTransition(() => {
      return newSale(data);
    });
  }
  return (
    <Form {...form}>
      {recipes.length === 0 ? (
        <div className="space-y-3">
          <TypographyH3 classname="text-xl font-semibold">İlk önce tarif eklemelisin</TypographyH3>
          <TypographyP classname="text-muted-foreground">
            Yaptığın satışları ekleyebilmemiz için öncelik satışını yaptığın ürünlerin tariflerini eklemelisin.
          </TypographyP>
          <Button asChild>
            <Link href="/tarifler/yeni">Yeni Tarif Ekle</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-8 md:flex-row">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>İsim*</FormLabel>
                  <FormControl>
                    <Input placeholder="Lidya Otel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-1 flex-col">
                  <FormLabel className="mb-[0.65rem]">Tarih*</FormLabel>
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
          </div>
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
                    <CardTitle>{recipes.filter((recipe) => recipe.id === field.recipeId)[0].name}</CardTitle>
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
                        key={field.id + "yieldSold"}
                        name={`items.${index}.yieldSold`}
                        render={({ field: fieldIndividual }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input {...fieldIndividual} placeholder="Adet" />
                            </FormControl>
                            <FormDescription className="text-xs">
                              Ürettiğiniz adeti giriniz. (Toplam: ₺
                              {(
                                (fieldIndividual.value ?? 0) *
                                (form.getValues().items[index].sellPrice <= 0
                                  ? recipes.filter((recipe) => recipe.id === field.recipeId)[0].price
                                  : form.getValues().items[index].sellPrice)
                              ).toFixed(2)}
                              )
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        key={field.id + "sellPrice"}
                        name={`items.${index}.sellPrice`}
                        render={({ field: fieldIndividual }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input {...fieldIndividual} placeholder="Fiyat" />
                            </FormControl>
                            <FormDescription className="text-xs">Satış fiyatını giriniz.</FormDescription>
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
                    Ürün Ekle
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {recipes.map((recipe) => (
                    <DropdownMenuItem
                      key={recipe.id}
                      onClick={() =>
                        append({
                          recipeId: recipe.id,
                          sellPrice: recipe.price,
                          sellPriceId: recipe.sellPriceId,
                          yieldSold: 0,
                          sellPriceDefault: recipe.price,
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
              "Yeni Satış Ekle"
            )}
          </Button>
        </form>
      )}
    </Form>
  );
};

export default NewSaleForm;
