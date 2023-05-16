import { z } from "zod";

export const signInSchema = z
  .object({
    identifier: z.string().email("Lütfen geçerli bir e-posta adresi giriniz"),
    password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
  })
  .required();
