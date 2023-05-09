import { z } from "zod";
import { postSchema, signInSchema, signUpSchema } from "./schemas";

export type SignInFormData = z.infer<typeof signInSchema>;
