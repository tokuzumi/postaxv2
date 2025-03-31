"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validations/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  whatsapp_country_code: string;
  whatsapp_ddd: string;
  whatsapp_number: string;
};

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      whatsapp_country_code: "+55",
      whatsapp_ddd: "",
      whatsapp_number: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          whatsapp_country_code: data.whatsapp_country_code,
          whatsapp_ddd: data.whatsapp_ddd,
          whatsapp_number: data.whatsapp_number,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro na API:", errorData);
        if (errorData.message) {
          throw new Error(errorData.message);
        } else if (errorData.error) {
          throw new Error(errorData.error);
        } else {
          throw new Error("Erro ao cadastrar usuário.");
        }
      }

      // Redirecionamento para página de login após registro bem-sucedido
      router.push("/login?registered=true");
    } catch (error: any) {
      setError(error.message || "Ocorreu um erro ao cadastrar usuário.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="postax-card w-full max-w-md mx-auto">
      <div className="mb-4 text-center">
        <h1 className="text-xl font-bold text-white">Criar Conta</h1>
        <p className="text-gray-400 mt-1">
          Preencha o formulário abaixo para criar sua conta no Postax
        </p>
      </div>

      {error && (
        <div className="bg-[rgba(255,53,134,0.1)] border border-[#ff3586] text-[#ff3586] p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name" required>
            Nome Completo
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Seu nome completo"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-[#ff3586]">{errors.name.message}</p>
          )}
        </div>

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

        <div className="grid grid-cols-10 gap-2">
          <div className="col-span-2 space-y-1">
            <Label htmlFor="whatsapp_country_code" required>
              País
            </Label>
            <Input
              id="whatsapp_country_code"
              type="text"
              className="text-center"
              {...register("whatsapp_country_code")}
              disabled
            />
          </div>
          <div className="col-span-2 space-y-1">
            <Label htmlFor="whatsapp_ddd" required>
              DDD
            </Label>
            <Input
              id="whatsapp_ddd"
              type="text"
              placeholder="11"
              maxLength={2}
              className="text-center"
              {...register("whatsapp_ddd")}
            />
            {errors.whatsapp_ddd && (
              <p className="text-xs text-[#ff3586]">
                {errors.whatsapp_ddd.message}
              </p>
            )}
          </div>
          <div className="col-span-6 space-y-1">
            <Label htmlFor="whatsapp_number" required>
              Número
            </Label>
            <Input
              id="whatsapp_number"
              type="text"
              placeholder="987654321"
              maxLength={9}
              {...register("whatsapp_number")}
            />
            {errors.whatsapp_number && (
              <p className="text-xs text-[#ff3586]">
                {errors.whatsapp_number.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="password" required>
            Senha
          </Label>
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

        <div className="space-y-1">
          <Label htmlFor="confirmPassword" required>
            Confirmar Senha
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="******"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-[#ff3586]">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="mt-6">
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Criar Conta
          </Button>
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            Já possui uma conta?{" "}
            <Link
              href="/login"
              className="text-[#00E1FF] hover:underline"
            >
              Entrar
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
} 