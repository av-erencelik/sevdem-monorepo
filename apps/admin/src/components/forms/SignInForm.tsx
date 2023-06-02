"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "ui";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSignInClerk } from "@/lib/auth";
import { signInSchema } from "@/types/schemas";
import { SignInFormData } from "@/types/types";
import { localizeError } from "@/lib/utils";

import { Input } from "ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "ui";
const LoginForm = () => {
  const router = useRouter();

  const { isSignedIn } = useAuth();

  const { trigger, isMutating, error } = useSignInClerk();
  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });
  const onSubmit = (data: SignInFormData) => trigger(data);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-72 space-y-4 rounded-lg border border-border bg-white p-5 shadow-xl"
      >
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="örnek@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Şifre</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isMutating} className="w-full">
          {isMutating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </>
          ) : (
            "Giriş Yap"
          )}
        </Button>
        <p className="mt-1 px-1 text-center text-xs text-destructive">
          {error !== undefined ? (error instanceof Error ? localizeError(error) : "Bir hata oluştu!") : ""}
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
