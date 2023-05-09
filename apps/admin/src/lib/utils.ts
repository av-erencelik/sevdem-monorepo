import { ClassValue, clsx } from "clsx";
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
