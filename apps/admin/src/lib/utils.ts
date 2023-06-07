import { ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function localizeError(error: Error) {
  if (error.message === "Couldn't find your account.") {
    return "Hesap Bulunamadı.";
  } else if (error.message === "Password is incorrect. Try again, or use another method.") {
    return "Şifre Yanlış. Tekrar Deneyin.";
  }
  return error.message;
}

export function getLast30days(date: dayjs.Dayjs) {
  const startDate = date.startOf("M").toDate();
  const endDate = date.endOf("M").toDate();
  return { startDate, endDate };
}

export function getLastOneYear(date: dayjs.Dayjs) {
  const startDate = date.subtract(1, "year").toDate();
  const endDate = date.toDate();
  return { startDate, endDate };
}

export function percIncrease(a: number, b: number) {
  let percent;
  if (b !== 0) {
    if (a !== 0) {
      percent = ((b - a) / a) * 100;
    } else {
      percent = b * 100;
    }
  } else {
    percent = -a * 100;
  }
  return Math.floor(percent);
}
