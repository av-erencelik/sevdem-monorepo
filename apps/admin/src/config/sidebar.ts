import { SidebarNavItem } from "@/types/types";
import { ChefHat, Refrigerator, Wallet, Wheat } from "lucide-react";

export const sidebarConfig: SidebarNavItem[] = [
  {
    title: "Malzemeler",
    icon: Wheat,
    items: [
      {
        title: "Genel Bakış",
        path: "/malzemeler",
      },
      {
        title: "Hepsini Gör",
        path: "/malzemeler/hepsi",
      },
      {
        title: "Yeni Malzeme Ekle",
        path: "/malzemeler/yeni",
      },
    ],
  },
  {
    title: "Tarifler",
    icon: ChefHat,
    items: [
      {
        title: "Genel Bakış",
        path: "/tarifler",
      },
      {
        title: "Hepsini Gör",
        path: "/tarifler/hepsi",
      },
      {
        title: "Yeni Tarif Ekle",
        path: "/tarifler/yeni",
      },
    ],
  },
  {
    title: "Envanter",
    icon: Refrigerator,
    items: [
      {
        title: "Genel Bakış",
        path: "/envanter",
      },
      {
        title: "Envanter Yönetimi",
        path: "/envanter/yonet",
      },
      {
        title: "Yeni Stok Ekle",
        path: "/envanter/yeni",
      },
    ],
  },
  {
    title: "Mali",
    icon: Wallet,
    items: [
      {
        title: "Genel Bakış",
        path: "/mali",
      },
      {
        title: "Satışlar",
        path: "/satis",
      },
      {
        title: "Yeni Satış Ekle",
        path: "/satis/yeni",
      },
      {
        title: "Yeni Gider Ekle",
        path: "/mali/gider/yeni",
      },
    ],
  },
];
