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
import { InputGroup } from "./InputGroup";
import { localizeError } from "@/lib/utils";
const LoginForm = () => {
  const router = useRouter();

  const { isSignedIn } = useAuth();

  const { trigger, isMutating, error } = useSignInClerk();
  useEffect(() => {
    if (isSignedIn) {
      router.push("/admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });
  const onSubmit = (data: SignInFormData) => trigger(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-80 flex-col gap-2">
      <InputGroup
        errorMessage={errors.identifier?.message}
        type="text"
        placeholder="Email"
        {...register("identifier")}
      />
      <InputGroup
        errorMessage={errors.password?.message}
        type="password"
        placeholder="Şifre"
        {...register("password")}
      />
      <Button type="submit" variant="default" disabled={isMutating}>
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
  );
};

export default LoginForm;
