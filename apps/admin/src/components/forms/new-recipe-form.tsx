"use client";

import { IngredientForForm } from "@/server/get-ingredients";
import { addRecipe } from "@/server/mutations/recipe";
import { NewRecipeSchema } from "@/types/schemas";
import { NewRecipeFormValues } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { MeasurementType, MeasurementUnit } from "@prisma/client";
import { Loader2, Plus, Trash } from "lucide-react";
import { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
  TypographyH3,
  TypographyH4,
} from "ui";

const NewRecipeForm = ({
  units,
  ingredients,
}: {
  units: (MeasurementType & {
    unit: MeasurementUnit[];
  })[];
  ingredients: IngredientForForm[];
}) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<NewRecipeFormValues>({
    resolver: zodResolver(NewRecipeSchema),
    defaultValues: {
      name: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control: form.control,
  });
  function onSubmit(data: NewRecipeFormValues) {
    startTransition(() => {
      return addRecipe(data);
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>İsim*</FormLabel>
                <FormControl>
                  <Input placeholder="Ekşi Maya Ekmek" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sellPrice"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Satış Fiyatı*</FormLabel>
                <FormControl>
                  <Input placeholder="30" inputMode="decimal" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-xs">Ürünü sattığınız fiyatı giriniz.</FormDescription>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-8 md:flex-row">
          <FormField
            control={form.control}
            name="yieldCount"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Ürün Sayısı*</FormLabel>
                <FormControl>
                  <Input placeholder="2" inputMode="decimal" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-xs">Tarifle üretilen toplam ürün sayısını giriniz.</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yieldName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Ürün Adı*</FormLabel>
                <FormControl>
                  <Input placeholder="Ekmek" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-xs">
                  Tarifte üretilen ürünün adını giriniz. Örneğin ekmek.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-8 md:flex-row">
          <FormField
            control={form.control}
            name="targetMargin"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Kar Yüzdesi*</FormLabel>
                <FormControl>
                  <Input placeholder="70" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-xs">Hedeflediğiniz kar yüzdesini giriniz.</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Tarifin Yapılışı (zorunlu değil)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Suya tuz ekle tuzlu su elde et..." {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-xs">
                  Tarifte üretilen ürünün adını giriniz. Örneğin ekmek.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-3">
          <TypographyH3 classname="text-lg font-semibold">Malzemeler</TypographyH3>
          {fields.map((field, index) => (
            <>
              <TypographyH4 classname="text-sm font-medium">
                {ingredients.filter((ingredient) => ingredient.id.toString() === field.ingredientId)[0].name}
              </TypographyH4>
              <div className="flex flex-col gap-3 md:flex-row">
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`ingredients.${index}.amount`}
                  render={({ field: fieldIndividual }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input {...fieldIndividual} placeholder="miktar" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  key={field.id + "unit"}
                  name={`ingredients.${index}.unitId`}
                  render={({ field: fieldIndividual }) => (
                    <FormItem className="flex-1">
                      <Select onValueChange={fieldIndividual.onChange} defaultValue={field.unitId.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Birim seç" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-72">
                          {units.map(
                            (type) =>
                              type.id ==
                                ingredients.filter((ingredient) => field.ingredientId === ingredient.id.toString())[0]
                                  .unitTypeId && (
                                <SelectGroup key={type.id}>
                                  <SelectLabel>{type.name}</SelectLabel>
                                  {type.unit.map((unit) => (
                                    <SelectItem value={unit.id.toString()} key={unit.id}>
                                      {unit.name} ({unit.abbreviation})
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant="destructive" onClick={() => remove(index)}>
                  <Trash className="mr-2 h-4 w-4" />
                  Sil
                </Button>
              </div>
            </>
          ))}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sky-600 hover:text-sky-600 data-[state=open]:bg-secondary">
                  <Plus className="mr-2 h-4 w-4" />
                  Malzeme Ekle
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {ingredients.map((ingredient) => (
                  <DropdownMenuItem
                    key={ingredient.id}
                    onClick={() =>
                      append({
                        ingredientId: ingredient.id.toString(),
                        amount: 0,
                        unitId: ingredient.unitId,
                      })
                    }
                  >
                    {ingredient.name}
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
            "Yeni Tarif Ekle"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default NewRecipeForm;
