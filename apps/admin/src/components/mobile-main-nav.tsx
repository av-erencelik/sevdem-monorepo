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
            "whitespace-nowrap px-2 py-3 transition-colors hover:text-foreground/80",
            pathname === "/" ? "border-b-2 border-slate-800 text-foreground" : "text-foreground/60"
          )}
        >
          Ana Sayfa
        </Link>
        <Link
          href="/malzemeler"
          className={cn(
            "px-2 py-3 transition-colors hover:text-foreground/80",
            pathname?.startsWith("/malzemeler") ? "border-b-2 border-slate-800 text-foreground" : "text-foreground/60"
          )}
        >
          Malzemeler
        </Link>
        <Link
          href="/tarifler"
          className={cn(
            "px-2 py-3 transition-colors hover:text-foreground/80",
            pathname?.startsWith("/tarifler") ? "border-b-2 border-slate-800 text-foreground" : "text-foreground/60"
          )}
        >
          Tarifler
        </Link>
        <Link
          href="/envanter"
          className={cn(
            "px-2 py-3 transition-colors hover:text-foreground/80",
            pathname?.startsWith("/envanter") ? "border-b-2 border-slate-800 text-foreground" : "text-foreground/60"
          )}
        >
          Envanter
        </Link>
        <Link
          href="/envanter"
          className={cn(
            "mr-3 px-2 py-3 transition-colors hover:text-foreground/80",
            pathname?.startsWith("/ekonomi") || pathname?.startsWith("/satis")
              ? "border-b-2 border-slate-800 text-foreground"
              : "text-foreground/60"
          )}
        >
          Ekonomi
        </Link>
      </nav>
    </ScrollAreaHorizontal>
  );
};

export default MobileMainNav;
