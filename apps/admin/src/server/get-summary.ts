"use server";
import { getLast30days, getLastOneYear, percIncrease } from "@/lib/utils";
import dayjs from "dayjs";
import { getExternalCosts, getMonthlySales } from "./revenue";
import { Prisma } from "@prisma/client";
import { totalOrders } from "./recipe";

const salesWithRecipes = Prisma.validator<Prisma.SaleArgs>()({
  select: {
    saleItem: {
      select: {
        sellPrice: {
          select: {
            price: true,
          },
        },
        yieldSold: true,
        recipe: {
          select: {
            name: true,
            yieldCount: true,
            ingredients: {
              select: {
                size: true,
                ingredient: {
                  select: {
                    price: {
                      orderBy: {
                        createdAt: "desc",
                      },
                      take: 1,
                      select: {
                        price: true,
                        measurement: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});
type SalesWithRecipes = Prisma.SaleGetPayload<typeof salesWithRecipes>[];

export default async function getSummary(isYearly = false, month = dayjs().month()) {
  if (month > 11) throw new Error("Invalid month");
  if (month < 0) throw new Error("Invalid month");
  let startDate: Date;
  let endDate: Date;
  let compareStartDate: Date;
  let compareEndDate: Date;
  if (isYearly) {
    const { startDate: currentYearStartDate, endDate: currentYearEndDate } = getLastOneYear(dayjs());
    const { startDate: lastYearStartDate, endDate: lastYearEndDate } = getLastOneYear(dayjs().subtract(1, "year"));
    startDate = currentYearStartDate;
    endDate = currentYearEndDate;
    compareStartDate = lastYearStartDate;
    compareEndDate = lastYearEndDate;
  } else {
    const { startDate: currentMonthStartDate, endDate: currentMonthEndDate } = getLast30days(dayjs().month(month));
    const { startDate: lastMonthStartDate, endDate: lastMonthEndDate } = getLast30days(
      dayjs().month(month).subtract(1, "M")
    );
    startDate = currentMonthStartDate;
    endDate = currentMonthEndDate;
    compareStartDate = lastMonthStartDate;
    compareEndDate = lastMonthEndDate;
  }

  const thisMonthExternalCosts = await getExternalCosts(startDate, endDate);
  const lastMonthCosts = await getExternalCosts(compareStartDate, compareEndDate);
  const thisMonthlySales = await getMonthlySales(startDate, endDate);
  const lastMonthSales = await getMonthlySales(compareStartDate, compareEndDate);
  const thisMonthOrders = await totalOrders(startDate, endDate);
  const lastMonthOrders = await totalOrders(compareStartDate, compareEndDate);
  const calculatedThisMonthMostSoldRecipe = getMonthlyMostSoldRecipe(thisMonthlySales);
  const calculatedLastMonthMostSoldRecipe = getMonthlyMostSoldRecipe(lastMonthSales);
  const calculatedThisMonthProfit =
    calculateMonthlyTotalSales(thisMonthlySales) -
    (thisMonthOrders._sum!.totalPrice ? thisMonthOrders._sum!.totalPrice.toNumber() : 0) -
    (thisMonthExternalCosts._sum!.cost ? thisMonthExternalCosts._sum.cost.toNumber() : 0);
  const calculatedLastMonthProfit =
    calculateMonthlyTotalSales(lastMonthSales) -
    (lastMonthCosts._sum!.cost ? lastMonthCosts._sum.cost.toNumber() : 0) -
    (lastMonthOrders._sum!.totalPrice ? lastMonthOrders._sum!.totalPrice.toNumber() : 0);
  const calculatedThisMonthSales = totalSoldItems(thisMonthlySales);
  const calculatedLastMonthSales = totalSoldItems(lastMonthSales);
  return {
    thisMonthProfit: calculatedThisMonthProfit,
    diffProfit: percIncrease(calculatedLastMonthProfit, calculatedThisMonthProfit),
    thisMonthSales: calculatedThisMonthSales,
    diffSales: percIncrease(calculatedThisMonthSales, calculatedLastMonthSales),
    thisMonthOrders: thisMonthOrders._sum!.totalPrice ? thisMonthOrders._sum!.totalPrice.toNumber() : 0,
    diffOrders: percIncrease(
      lastMonthOrders._sum!.totalPrice ? lastMonthOrders._sum!.totalPrice.toNumber() : 0,
      thisMonthOrders._sum!.totalPrice ? thisMonthOrders._sum!.totalPrice.toNumber() : 0
    ),
    thisMonthMostSoldRecipe: calculatedThisMonthMostSoldRecipe,
    lastMonthMostSoldRecipe: calculatedLastMonthMostSoldRecipe,
  };
}

function calculateMonthlyTotalSales(sales: SalesWithRecipes) {
  return sales.reduce((acc, cur) => {
    let total = 0;
    cur.saleItem.forEach((item) => {
      const recipeCost = item.recipe.ingredients.reduce((acc, cur) => {
        const ingredientCost = cur.ingredient.price[0].price.toNumber();
        const ingredientSize =
          cur.ingredient.price[0].measurement!.size.toNumber() *
          cur.ingredient.price[0].measurement!.quantity.toNumber();
        const ingredientAmount = cur.size.toNumber();
        return acc + (ingredientCost / ingredientSize) * ingredientAmount;
      }, 0);
      const sellPrice = item.sellPrice.price;
      const profit = (sellPrice.toNumber() - recipeCost) / item.recipe.yieldCount;
      total += profit * item.yieldSold;
    });
    return total + acc;
  }, 0);
}

function totalSoldItems(sales: SalesWithRecipes) {
  return sales.reduce((acc, cur) => {
    return acc + cur.saleItem.reduce((acc, cur) => acc + cur.yieldSold, 0);
  }, 0);
}

function getMonthlyMostSoldRecipe(sales: SalesWithRecipes) {
  const recipeMap = new Map<string, number>();
  sales.forEach((sale) => {
    sale.saleItem.forEach((item) => {
      const recipeName = item.recipe.name;
      const currentCount = recipeMap.get(recipeName) || 0;
      recipeMap.set(recipeName, currentCount + item.yieldSold);
    });
  });
  const sorted = [...recipeMap.entries()].sort((a, b) => b[1] - a[1]);
  return sorted[0];
}
