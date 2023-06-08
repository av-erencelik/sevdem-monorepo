"use client";
import { cn } from "@/lib/utils";
import { newExternalCost } from "@/server/mutations/economy";
import { newExternalCostSchema } from "@/types/schemas";
import { NewExternalCostFormValues } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { CalendarIcon, Loader2 } from "lucide-react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
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
} from "ui";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
dayjs.locale("tr");
const NewExternalCostForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<NewExternalCostFormValues>({
    resolver: zodResolver(newExternalCostSchema),
  });
  function onSubmit(data: NewExternalCostFormValues) {
    startTransition(() => {
      return newExternalCost(data);
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
                  <Input placeholder="Elektrik Faturası" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Fiyat*</FormLabel>
                <FormControl>
                  <Input placeholder="30" inputMode="decimal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
        <Button type="submit" className="w-full md:w-max" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Ekleniyor
            </>
          ) : (
            "Yeni Gider Ekle"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default NewExternalCostForm;
