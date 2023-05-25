"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MainNav = () => {
  const pathname = usePathname();
  return (
    <div className="mr-4 hidden md:block">
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Ana Sayfa
        </Link>
        <Link
          href="/malzemeler"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/malzemeler") ? "text-foreground" : "text-foreground/60"
          )}
        >
          Malzemeler
        </Link>
        <Link
          href="/tarifler"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/tarifler") ? "text-foreground" : "text-foreground/60"
          )}
        >
          Tarifler
        </Link>
        <Link
          href="/envanter"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/envanter") ? "text-foreground" : "text-foreground/60"
          )}
        >
          Envanter
        </Link>
        <Link
          href="/envanter"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/ekonomi") || pathname?.startsWith("/satis")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Ekonomi
        </Link>
      </nav>
    </div>
  );
};

export default MainNav;
