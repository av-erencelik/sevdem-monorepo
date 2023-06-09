"use client";
import Link from "next/link";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "ui";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-center text-2xl">404: Sayfa Bulunamadı</CardTitle>
          <CardDescription className="text-center text-lg">Aradığınız ekmek daha fırından çıkmamış</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild>
            <Link href="/">Anasayfaya Dön</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
