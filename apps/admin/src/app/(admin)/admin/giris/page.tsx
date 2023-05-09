import LoginForm from "@/components/forms/SignInForm";
import React from "react";
import { Button } from "ui";
const LoginPage = () => {
  return (
    <main className="flex min-h-[100vh] flex-col items-center justify-center gap-10 bg-cyan-50">
      <div className="flex flex-col items-center">
        <h1 className="mt-2 scroll-m-20 text-2xl font-semibold tracking-tight text-primary">Giriş Yap</h1>
      </div>
      <LoginForm />
    </main>
  );
};

export default LoginPage;
