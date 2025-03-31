import { Suspense } from "react";
import { SocialNetworkManagement } from "@/components/social/social-network-management";

export const metadata = {
  title: "Conectar Redes | Postax",
  description: "Conecte e gerencie suas redes sociais no Postax",
};

export default function SocialPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Conectar Redes</h1>
      <p className="text-gray-400 mb-8">
        Conecte suas redes sociais para agendar e publicar conteúdo
      </p>

      <div className="grid grid-cols-1">
        <Suspense fallback={<LoadingNetworks />}>
          <SocialNetworkManagement />
        </Suspense>
      </div>
    </div>
  );
}

function LoadingNetworks() {
  return (
    <div className="bg-[#1D1F2B] rounded-lg p-6 shadow-lg animate-pulse">
      <div className="h-7 bg-gray-700 rounded w-1/3 mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-800 h-48 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
} 