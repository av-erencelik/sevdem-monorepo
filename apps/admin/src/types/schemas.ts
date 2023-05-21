import { z } from "zod";

export const signInSchema = z
  .object({
    identifier: z.string({ required_error: "Gerekli" }).email("Lütfen geçerli bir e-posta adresi giriniz"),
    password: z.string({ required_error: "Gerekli" }).min(6, "Şifre en az 6 karakter olmalıdır"),
  })
  .required();
