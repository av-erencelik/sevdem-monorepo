"use client";

import { updateIngredient } from "@/server/mutations/ingredient";
import { editIngredientSchema } from "@/types/schemas";
import { EditIngredient, EditIngredientFormValues } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Button,
  Checkbox,
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
  const form = useForm<EditIngredientFormValues>({
    resolver: zodResolver(editIngredientSchema),
    defaultValues: {
      name: ingredient.name,
      case: ingredient.quantity,
      size: ingredient.size,
      price: ingredient.price,
      unit: ingredient.unitId,
      mlToGram: ingredient.mlToGram,
      newPrice: true,
    },
  });
  function onSubmit(data: EditIngredientFormValues) {
    startTransition(() => {
      return updateIngredient(data, ingredient.id, ingredient.priceId);
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
                  <Input placeholder="30" inputMode="decimal" {...field} />
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
                <Select onValueChange={field.onChange} defaultValue={ingredient.unitId.toString()}>
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
        <div>
          <FormField
            control={form.control}
            name="newPrice"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Yeni fiyat olarak eklensin mi?</FormLabel>
                  <FormDescription>
                    Eğer yeni fiyat olarak eklenirse, bu malzeme için yeni bir fiyat oluşturulur. Aksi takdirde mevcut
                    fiyatı güncellenir.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full md:w-max" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Ekleniyor
            </>
          ) : (
            "Malzemeyi Düzenle"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EditIngredientForm;
