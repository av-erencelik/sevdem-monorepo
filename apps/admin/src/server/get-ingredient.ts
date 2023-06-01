import { prisma } from "@/db";

export async function getIngredient(id: string) {
  const ingredient = await prisma.ingredient.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      price: {
        include: {
          measurement: {
            include: {
              unit: {
                select: {
                  id: true,
                  type: {
                    select: {
                      id: true,
                      name: true,
                      unit: true,
                    },
                  },
                },
              },
            },
          },
        },
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (ingredient) {
    const ingredientRefactored = {
      id: ingredient.id,
      name: ingredient.name,
      price: ingredient.price[0].price.toNumber(),
      priceId: ingredient.price[0].id,
      quantity: ingredient.price[0].measurement!.quantity.toNumber(),
      size: ingredient.price[0].measurement!.size.toNumber(),
      mlToGram: ingredient.price[0].measurement!.mlToGram?.toNumber(),
      unitId: ingredient.price[0].measurement!.unit.id,
      type: ingredient.price[0].measurement!.unit.type,
    };
    return ingredientRefactored;
  }

  return null;
}
