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
        title: "Tarifler",
        path: "/envanter/tarifler",
      },
      {
        title: "Malzemeler",
        path: "/envanter/malzemeler",
      },
      {
        title: "Tarif Stoğu Ekle",
        path: "/envanter/tarifler/yeni",
      },
      {
        title: "Malzeme Stoğu Ekle",
        path: "/envanter/malzemeler/yeni",
      },
    ],
  },
  {
    title: "Ekonomi",
    icon: Wallet,
    items: [
      {
        title: "Genel Bakış",
        path: "/ekonomi",
      },
      {
        title: "Yeni Satış Ekle",
        path: "/ekonomi/satis/yeni",
      },
      {
        title: "Yeni Gider Ekle",
        path: "/ekonomi/gider/yeni",
      },
    ],
  },
];
