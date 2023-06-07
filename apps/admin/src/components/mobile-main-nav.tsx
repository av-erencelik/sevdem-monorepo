"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ScrollAreaHorizontal } from "ui";

const MobileMainNav = () => {
  const pathname = usePathname();
  return (
    <ScrollAreaHorizontal className="w-[calc(100vw)] border-b-[1px] md:hidden">
      <nav className="flex h-full items-center space-x-2 px-5 text-sm font-medium">
        <Link
          href="/"
          className={cn(
            "whitespace-nowrap px-2 py-3 transition-colors",
            pathname === "/" ? "border-b-2 border-sky-600 text-sky-600" : "text-foreground/70 hover:text-foreground"
          )}
        >
          Ana Sayfa
        </Link>
        <Link
          href="/malzemeler"
          className={cn(
            "px-2 py-3 transition-colors",
            pathname?.startsWith("/malzemeler")
              ? "border-b-2 border-sky-600 text-sky-600"
              : "text-foreground/70 hover:text-foreground"
          )}
        >
          Malzemeler
        </Link>
        <Link
          href="/tarifler"
          className={cn(
            "px-2 py-3 transition-colors",
            pathname?.startsWith("/tarifler")
              ? "border-b-2 border-sky-600 text-sky-600"
              : "text-foreground/70 hover:text-foreground"
          )}
        >
          Tarifler
        </Link>
        <Link
          href="/envanter/tarifler"
          className={cn(
            "px-2 py-3 transition-colors",
            pathname?.startsWith("/envanter")
              ? "border-b-2 border-sky-600 text-sky-600"
              : "text-foreground/70 hover:text-foreground"
          )}
        >
          Envanter
        </Link>
        <Link
          href="/envanter"
          className={cn(
            "mr-3 px-2 py-3 transition-colors",
            pathname?.startsWith("/ekonomi") || pathname?.startsWith("/satis")
              ? "border-b-2 border-sky-600 text-sky-600"
              : "text-foreground/70 hover:text-foreground"
          )}
        >
          Ekonomi
        </Link>
      </nav>
    </ScrollAreaHorizontal>
  );
};

export default MobileMainNav;
