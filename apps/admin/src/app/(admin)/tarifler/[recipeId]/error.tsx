"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-6 rounded-lg border border-border p-10 pb-16 shadow-md">
      <div className="flex flex-col items-center justify-center gap-4 md:gap-0">
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-center text-2xl font-bold tracking-tight">Tarif Bulunamadı</h2>
          <p className="text-muted-foreground">Aradığınız tarifi bulamıyoruz. Lütfen kendi tarifinizi ekleyin 📝🍳</p>
          <Link
            href={`/tarifler/yeni`}
            className="w-max rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Yeni Tarif Ekle
          </Link>
        </div>
      </div>
    </div>
  );
}
