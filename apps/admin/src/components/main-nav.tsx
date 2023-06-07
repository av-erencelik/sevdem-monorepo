"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MainNav = () => {
  const pathname = usePathname();
  return (
    <div className="ml-4 mr-4 hidden md:block">
      <nav className="flex items-center space-x-2 text-sm font-medium">
        <Link
          href="/"
          className={cn(
            "rounded-md p-2 transition-colors",
            pathname === "/" ? "bg-sky-100 text-sky-600" : "text-foreground/70 hover:text-foreground"
          )}
        >
          Ana Sayfa
        </Link>
        <Link
          href="/malzemeler"
          className={cn(
            "rounded-md p-2 transition-colors",
            pathname?.startsWith("/malzemeler") ? "bg-sky-100 text-sky-600" : "text-foreground/70 hover:text-foreground"
          )}
        >
          Malzemeler
        </Link>
        <Link
          href="/tarifler"
          className={cn(
            "rounded-md p-2 transition-colors",
            pathname?.startsWith("/tarifler") ? "bg-sky-100 text-sky-600" : "text-foreground/70 hover:text-foreground"
          )}
        >
          Tarifler
        </Link>
        <Link
          href="/envanter/tarifler"
          className={cn(
            "rounded-md p-2 transition-colors",
            pathname?.startsWith("/envanter") ? "bg-sky-100 text-sky-600" : "text-foreground/70 hover:text-foreground"
          )}
        >
          Envanter
        </Link>
        <Link
          href="/envanter"
          className={cn(
            "rounded-md p-2 transition-colors",
            pathname?.startsWith("/ekonomi") || pathname?.startsWith("/satis")
              ? "bg-sky-100 text-sky-600"
              : "text-foreground/70 hover:text-foreground"
          )}
        >
          Ekonomi
        </Link>
      </nav>
    </div>
  );
};

export default MainNav;
