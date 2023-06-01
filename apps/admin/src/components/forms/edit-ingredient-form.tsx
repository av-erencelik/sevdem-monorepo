"use client";

import { addIngredient, updateIngredient } from "@/server/mutations/ingredient";
import { newIngredientSchema } from "@/types/schemas";
import { NewIngredientFormValues, EditIngredient } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { MeasurementType, MeasurementUnit } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Button,
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
} from "ui";

const EditIngredientForm = ({ ingredient }: { ingredient: EditIngredient }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<NewIngredientFormValues>({
    resolver: zodResolver(newIngredientSchema),
    defaultValues: {
      name: ingredient.name,
      case: ingredient.quantity,
      size: ingredient.size,
      price: ingredient.price,
      unit: ingredient.unitId,
      mlToGram: ingredient.mlToGram,
    },
  });
  function onSubmit(data: NewIngredientFormValues) {
    toast.success(JSON.stringify(data, null, 2));
    startTransition(() => {
      updateIngredient(data, ingredient.id, ingredient.priceId);
    });
    router.refresh();
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
                  <Input placeholder="Siyez Unu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Fiyat*</FormLabel>
                <FormControl>
                  <Input placeholder="30" inputMode="decimal" {...field} value={ingredient.price} />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-xs">
                  Örneğin 2 paket 5 kg unu 100tl'ye aldıysanız 100 yazın. Paket başına değil toplam fiyatı yazın.
                </FormDescription>
              </FormItem>
            )}
          ></FormField>
        </div>
        <div className="flex flex-col gap-8 md:flex-row">
          <FormField
            control={form.control}
            name="case"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Paket Sayısı*</FormLabel>
                <FormControl>
                  <Input placeholder="2" inputMode="decimal" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-xs">Örneğin 2 paket 5 kg un için 2 yazın.</FormDescription>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Boyut*</FormLabel>
                <FormControl>
                  <Input placeholder="15" inputMode="decimal" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-xs">Örneğin 2 paket 5 kg un için 5 yazın.</FormDescription>
              </FormItem>
            )}
          ></FormField>
        </div>
        <div className="flex flex-col gap-8 md:flex-row">
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem className="md:w-[49%]">
                <FormLabel>Birim*</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Birim seç" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-72">
                    <SelectGroup key={ingredient.type.id}>
                      <SelectLabel>{ingredient.type.name}</SelectLabel>
                      {ingredient.type.unit.map((unit) => (
                        <SelectItem value={unit.id.toString()} key={unit.id}>
                          {unit.name} ({unit.abbreviation})
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="mlToGram"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  Dönüşüm Faktörü <span className="text-xs">(zorunlu değil)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="15" inputMode="decimal" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-xs">
                  Örneğin 1 litre süt 1.03 kg'dır. Birim olarak litre eklediğin malzemeler için toplam ağırlık
                  hesaplamarına dahil edilebilmeleri için bu bilgiyi girebilirsin.
                </FormDescription>
              </FormItem>
            )}
          ></FormField>
        </div>

        <Button type="submit" className="w-full md:w-max">
          {isPending ? "Ekleniyor..." : "Yeni Malzeme Ekle"}
        </Button>
      </form>
    </Form>
  );
};

export default EditIngredientForm;
