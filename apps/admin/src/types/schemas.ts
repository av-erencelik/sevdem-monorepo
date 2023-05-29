import { z } from "zod";

export const signInSchema = z
  .object({
    identifier: z.string({ required_error: "Gerekli" }).email("Lütfen geçerli bir e-posta adresi giriniz"),
    password: z.string({ required_error: "Gerekli" }).min(6, "Şifre en az 6 karakter olmalıdır"),
  })
  .required();

export const newIngredientSchema = z.object({
  name: z.string({ required_error: "Gerekli" }).trim().max(255, "En fazla 255 karakter olabilir"),
  price: z.string({ required_error: "Gerekli" }).transform((val, ctx) => {
    const parsed = parseFloat(val);
    if (isNaN(parsed) || parsed <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Geçerli bir fiyat giriniz",
      });
      return z.NEVER;
    }
    return parsed;
  }),
  case: z.string({ required_error: "Gerekli" }).transform((val, ctx) => {
    const parsed = parseFloat(val);
    if (isNaN(parsed) || parsed <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Geçerli bir adet giriniz",
      });
      return z.NEVER;
    }
    return parsed;
  }),
  size: z.string({ required_error: "Gerekli" }).transform((val, ctx) => {
    const parsed = parseFloat(val);
    if (isNaN(parsed) || parsed <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Geçerli bir boyut giriniz",
      });
      return z.NEVER;
    }
    return parsed;
  }),
  unit: z.string({ required_error: "Gerekli" }).transform((val, ctx) => {
    const parsed = parseFloat(val);
    if (isNaN(parsed) || parsed < 1 || parsed > 15) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Geçerli bir birim seçiniz",
      });
      return z.NEVER;
    }
    return parsed;
  }),
  mlToGram: z.number().min(0, "0'dan küçük olamaz").optional(),
});
