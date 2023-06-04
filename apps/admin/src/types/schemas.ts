import { z } from "zod";

export const signInSchema = z
  .object({
    identifier: z.string({ required_error: "Gerekli" }).email("Lütfen geçerli bir e-posta adresi giriniz"),
    password: z.string({ required_error: "Gerekli" }).min(6, "Şifre en az 6 karakter olmalıdır"),
  })
  .required();

export const newIngredientSchema = z.object({
  name: z
    .string({ required_error: "Gerekli" })
    .trim()
    .max(255, "En fazla 255 karakter olabilir")
    .min(1, "En az 1 karakter olmalıdır"),
  price: z
    .string({ required_error: "Gerekli" })
    .transform((val, ctx) => {
      const parsed = parseFloat(val);
      if (isNaN(parsed) || parsed <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Geçerli bir fiyat giriniz",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number()),
  case: z
    .string({ required_error: "Gerekli" })
    .transform((val, ctx) => {
      const parsed = parseFloat(val);
      if (isNaN(parsed) || parsed <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Geçerli bir adet giriniz",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number()),
  size: z
    .string({ required_error: "Gerekli" })
    .transform((val, ctx) => {
      const parsed = parseFloat(val);
      if (isNaN(parsed) || parsed <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Geçerli bir boyut giriniz",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number()),
  unit: z
    .string({ required_error: "Gerekli" })
    .transform((val, ctx) => {
      const parsed = parseFloat(val);
      if (isNaN(parsed) || parsed < 1 || parsed > 15) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Geçerli bir birim seçiniz",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number()),
  mlToGram: z.number().min(0, "0'dan küçük olamaz").optional().or(z.number()),
});

export const editIngredientSchema = newIngredientSchema.extend({
  newPrice: z.boolean().default(true),
});

export const NewRecipeSchema = z.object({
  name: z
    .string({ required_error: "Gerekli" })
    .trim()
    .max(255, "En fazla 255 karakter olabilir")
    .min(1, "En az 1 karakter olmalıdır"),
  yieldName: z.string({ required_error: "Gerekli" }).trim().max(255, "En fazla 255 karakter olabilir"),
  yieldCount: z
    .string({ required_error: "Gerekli" })
    .transform((val, ctx) => {
      const parsed = parseFloat(val);
      if (isNaN(parsed) || parsed <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Geçerli bir sayı giriniz",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number()),
  targetMargin: z
    .string({ required_error: "Gerekli" })
    .transform((val, ctx) => {
      const parsed = parseFloat(val);
      if (isNaN(parsed) || parsed <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Geçerli bir yüzde giriniz",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number().min(0, "0'dan küçük olamaz")),
  description: z.string().optional(),
  sellPrice: z
    .string({ required_error: "Gerekli" })
    .transform((val, ctx) => {
      const parsed = parseFloat(val);
      if (isNaN(parsed) || parsed <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Geçerli bir fiyat giriniz",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number().min(0, "0'dan küçük olamaz")),
  ingredients: z.array(
    z.object({
      ingredientId: z.string().min(1, "Lütfen geçerli bir malzeme seçiniz"),
      unitId: z
        .string({ required_error: "Gerekli" })
        .transform((val, ctx) => {
          const parsed = parseFloat(val);
          if (isNaN(parsed) || parsed <= 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Geçerli bir birim seçiniz",
            });
            return z.NEVER;
          }
          return parsed;
        })
        .or(z.number().min(1, "Lütfen geçerli bir birim seçiniz").max(15, "Lütfen geçerli bir birim seçiniz")),
      amount: z
        .string({ required_error: "Gerekli" })
        .transform((val, ctx) => {
          const parsed = parseFloat(val);
          if (isNaN(parsed) || parsed <= 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Geçerli bir miktar giriniz",
            });
            return z.NEVER;
          }
          return parsed;
        })
        .or(z.number().min(0.1, "0'dan büyük olmalıdır")),
    })
  ),
});
