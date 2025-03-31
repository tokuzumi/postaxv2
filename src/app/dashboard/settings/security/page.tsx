import { Metadata } from "next";
import { PasswordChangeForm } from "@/components/settings/password-change-form";

export const metadata: Metadata = {
  title: "Segurança | Postax",
  description: "Gerencie suas configurações de segurança",
};

export default function SecurityPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Segurança</h2>
      <p className="text-gray-400 mb-6">
        Gerencie suas configurações de segurança
      </p>

      <div className="postax-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Alterar Senha
        </h3>
        <PasswordChangeForm />
      </div>
    </div>
  );
} 