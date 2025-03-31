"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const profileSchema = z.object({
  name: z.string().min(3, {
    message: "O nome deve ter pelo menos 3 caracteres",
  }),
  email: z.string().email({
    message: "Por favor, informe um email válido",
  }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  defaultValues: Partial<ProfileFormValues>;
}

export function ProfileForm({ defaultValues }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    setError(null);
    setIsSaved(false);

    try {
      // Simular uma chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Futuramente, implementar a atualização real dos dados
      console.log("Dados a serem atualizados:", data);
      
      setIsSaved(true);
    } catch (error) {
      setError("Ocorreu um erro ao salvar as alterações.");
      console.error("Erro ao atualizar perfil:", error);
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
          Perfil atualizado com sucesso!
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name" required>
          Nome Completo
        </Label>
        <Input
          id="name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-[#ff3586] mt-1">
            {errors.name.message}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" required>
          Email
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          disabled // O email não deve ser alterado na versão atual
        />
        {errors.email && (
          <p className="text-xs text-[#ff3586] mt-1">
            {errors.email.message}
          </p>
        )}
      </div>
      
      <div>
        <Button type="submit" isLoading={isLoading}>
          Salvar Alterações
        </Button>
      </div>
    </form>
  );
} 