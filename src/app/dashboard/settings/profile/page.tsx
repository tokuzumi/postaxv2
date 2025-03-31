import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ProfileForm } from "@/components/settings/profile-form";

export const metadata: Metadata = {
  title: "Perfil | Postax",
  description: "Gerencie suas informações de perfil",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Perfil</h2>
      <p className="text-gray-400 mb-6">
        Gerencie suas informações pessoais
      </p>

      <div className="postax-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Informações do Usuário
        </h3>
        <ProfileForm
          defaultValues={{
            name: session.user.name,
            email: session.user.email,
          }}
        />
      </div>
    </div>
  );
} 