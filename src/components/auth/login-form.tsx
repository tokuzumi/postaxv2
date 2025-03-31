"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/user";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Verificar se o usuário acabou de se registrar
  const justRegistered = searchParams?.get("registered") === "true";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou senha inválidos.");
        return;
      }

      // Redirecionamento para dashboard após login bem-sucedido
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setError("Ocorreu um erro ao fazer login.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="postax-card w-full max-w-md mx-auto">
      <div className="mb-4 text-center">
        <h1 className="text-xl font-bold text-white">Entrar no Postax</h1>
        <p className="text-gray-400 mt-1">
          Bem-vindo de volta! Acesse sua conta abaixo
        </p>
      </div>

      {justRegistered && (
        <div className="bg-[rgba(35,226,95,0.1)] border border-[#23e25f] text-[#23e25f] p-3 rounded-md mb-4">
          Conta criada com sucesso! Faça login para continuar.
        </div>
      )}

      {error && (
        <div className="bg-[rgba(255,53,134,0.1)] border border-[#ff3586] text-[#ff3586] p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="email" required>
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-[#ff3586]">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <Label htmlFor="password" required>
              Senha
            </Label>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="******"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-[#ff3586]">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mt-6">
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Entrar
          </Button>
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            Não possui uma conta?{" "}
            <Link
              href="/register"
              className="text-[#00E1FF] hover:underline"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
} 