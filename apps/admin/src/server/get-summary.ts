"use server";
import { getLast30days, getLastOneYear, percIncrease } from "@/lib/utils";
import dayjs from "dayjs";
import { SaleItemRefactored, getExternalCosts, getMonthlySales } from "./revenue";
import { totalOrders } from "./recipe";

export default async function getSummary(month: number) {
  if (month > 12) throw new Error("Invalid month");
  if (month < 0) throw new Error("Invalid month");
  let startDate: Date;
  let endDate: Date;
  let compareStartDate: Date;
  let compareEndDate: Date;
  if (month === 12) {
    const { startDate: currentYearStartDate, endDate: currentYearEndDate } = getLastOneYear(dayjs());
    const { startDate: lastYearStartDate, endDate: lastYearEndDate } = getLastOneYear(dayjs().subtract(1, "year"));
    startDate = currentYearStartDate;
    endDate = currentYearEndDate;
    compareStartDate = lastYearStartDate;
    compareEndDate = lastYearEndDate;
  } else {
    const { startDate: currentMonthStartDate, endDate: currentMonthEndDate } = getLast30days(
      dayjs().set("month", month)
    );
    const { startDate: lastMonthStartDate, endDate: lastMonthEndDate } = getLast30days(
      dayjs().set("month", month).subtract(1, "month")
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
    (thisMonthOrders._sum.totalPrice ? thisMonthOrders._sum.totalPrice.toNumber() : 0) -
    (thisMonthExternalCosts._sum.cost ? thisMonthExternalCosts._sum.cost.toNumber() : 0);
  const calculatedLastMonthProfit =
    calculateMonthlyTotalSales(lastMonthSales) -
    (lastMonthCosts._sum.cost ? lastMonthCosts._sum.cost.toNumber() : 0) -
    (lastMonthOrders._sum.totalPrice ? lastMonthOrders._sum.totalPrice.toNumber() : 0);
  const calculatedThisMonthSales = totalSoldItems(thisMonthlySales);
  const calculatedLastMonthSales = totalSoldItems(lastMonthSales);
  return {
    thisMonthProfit: calculatedThisMonthProfit,
    diffProfit: calculatedThisMonthProfit - calculatedLastMonthProfit,
    thisMonthSales: calculatedThisMonthSales,
    diffSales: percIncrease(calculatedLastMonthSales, calculatedThisMonthSales),
    thisMonthOrders: thisMonthOrders._sum!.totalPrice ? thisMonthOrders._sum!.totalPrice.toNumber() : 0,
    diffOrders: percIncrease(
      lastMonthOrders._sum!.totalPrice ? lastMonthOrders._sum!.totalPrice.toNumber() : 0,
      thisMonthOrders._sum!.totalPrice ? thisMonthOrders._sum!.totalPrice.toNumber() : 0
    ),
    thisMonthMostSoldRecipe: calculatedThisMonthMostSoldRecipe,
    lastMonthMostSoldRecipe: calculatedLastMonthMostSoldRecipe,
  };
}

function calculateMonthlyTotalSales(sales: SaleItemRefactored[][]) {
  return sales.reduce((acc, cur) => {
    let total = 0;
    cur.forEach((item) => {
      const recipeCost = item.cost;
      const sellPrice = item.sellPrice;
      const profit = (sellPrice - recipeCost) / item.yieldCount;
      total += profit * item.yieldSold;
    });
    return total + acc;
  }, 0);
}

function totalSoldItems(sales: SaleItemRefactored[][]) {
  return sales.reduce((acc, cur) => {
    return acc + cur.reduce((acc, cur) => acc + cur.yieldSold, 0);
  }, 0);
}

function getMonthlyMostSoldRecipe(sales: SaleItemRefactored[][]) {
  const recipeMap = new Map<string, number>();
  sales.forEach((sale) => {
    sale.forEach((item) => {
      const recipeName = item.name;
      const currentCount = recipeMap.get(recipeName) || 0;
      recipeMap.set(recipeName, currentCount + item.yieldSold);
    });
  });
  const sorted = [...recipeMap.entries()].sort((a, b) => b[1] - a[1]);
  return sorted[0];
}
