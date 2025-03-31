import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login | Postax",
  description: "Faça login na sua conta Postax",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">Postax</h1>
        </div>
        <Suspense fallback={<div className="text-center p-4">Carregando...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
} 