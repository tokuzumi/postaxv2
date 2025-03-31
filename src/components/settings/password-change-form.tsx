"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: "A senha atual deve ter pelo menos 6 caracteres",
    }),
    newPassword: z.string().min(8, {
      message: "A nova senha deve ter pelo menos 8 caracteres",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type PasswordChangeFormValues = z.infer<typeof passwordChangeSchema>;

export function PasswordChangeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordChangeFormValues>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: PasswordChangeFormValues) {
    setIsLoading(true);
    setError(null);
    setIsSaved(false);

    try {
      // Simular uma chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Futuramente, implementar a alteração real da senha
      console.log("Dados a serem atualizados:", data);
      
      setIsSaved(true);
      reset();
    } catch (error) {
      setError("Ocorreu um erro ao alterar a senha.");
      console.error("Erro ao alterar senha:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-[rgba(255,53,134,0.1)] border border-[#ff3586] text-[#ff3586] p-3 rounded-md">
          {error}
        </div>
      )}
      
      {isSaved && (
        <div className="bg-[rgba(35,226,95,0.1)] border border-[#23e25f] text-[#23e25f] p-3 rounded-md">
          Senha alterada com sucesso!
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="currentPassword" required>
          Senha Atual
        </Label>
        <Input
          id="currentPassword"
          type="password"
          {...register("currentPassword")}
        />
        {errors.currentPassword && (
          <p className="text-xs text-[#ff3586] mt-1">
            {errors.currentPassword.message}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="newPassword" required>
          Nova Senha
        </Label>
        <Input
          id="newPassword"
          type="password"
          {...register("newPassword")}
        />
        {errors.newPassword && (
          <p className="text-xs text-[#ff3586] mt-1">
            {errors.newPassword.message}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" required>
          Confirmar Nova Senha
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-[#ff3586] mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      
      <div>
        <Button type="submit" isLoading={isLoading}>
          Alterar Senha
        </Button>
      </div>
    </form>
  );
} 