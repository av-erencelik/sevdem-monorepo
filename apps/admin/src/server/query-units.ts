"use server";
import { prisma } from "@/db";

export async function getUnits() {
  return await prisma.measurementType.findMany({
    include: {
      unit: true,
    },
  });
}
