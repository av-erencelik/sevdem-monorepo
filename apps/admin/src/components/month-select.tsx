"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "ui";

const MonthSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <Select
      onValueChange={(value) => {
        if (value === "12") {
          router.push(pathname);
          return;
        }
        router.push(pathname + "?" + createQueryString("month", value));
      }}
      defaultValue={(searchParams.get("month") as string) ?? "12"}
    >
      <SelectTrigger className="w-full md:w-[150px]">
        <SelectValue placeholder="Ay seç" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="12">Yıllık</SelectItem>
          <SelectItem value="0">Ocak</SelectItem>
          <SelectItem value="1">Şubat</SelectItem>
          <SelectItem value="2">Mart</SelectItem>
          <SelectItem value="3">Nisan</SelectItem>
          <SelectItem value="4">Mayıs</SelectItem>
          <SelectItem value="5">Haziran</SelectItem>
          <SelectItem value="6">Temmuz</SelectItem>
          <SelectItem value="7">Ağustos</SelectItem>
          <SelectItem value="8">Eylül</SelectItem>
          <SelectItem value="9">Ekim</SelectItem>
          <SelectItem value="10">Kasım</SelectItem>
          <SelectItem value="11">Aralık</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default MonthSelect;
