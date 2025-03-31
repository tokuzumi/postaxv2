import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Postax",
  description: "Gerencie seu conteúdo e acompanhe métricas",
};

export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="postax-card p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Posts Agendados</h3>
          <p className="text-3xl font-bold text-[#00E1FF]">0</p>
          <p className="text-gray-400 mt-2">Nenhum post agendado ainda</p>
        </div>

        <div className="postax-card p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Redes Conectadas</h3>
          <p className="text-3xl font-bold text-[#00E1FF]">0</p>
          <p className="text-gray-400 mt-2">Conecte suas redes sociais</p>
        </div>

        <div className="postax-card p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Desempenho</h3>
          <p className="text-3xl font-bold text-[#00E1FF]">-</p>
          <p className="text-gray-400 mt-2">Aguardando dados</p>
        </div>
      </div>

      <div className="postax-card p-6 mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Primeiros Passos</h3>
        <ul className="space-y-4">
          <li className="flex items-start">
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(0,225,255,0.1)] text-[#00E1FF] mr-3">
              1
            </div>
            <div>
              <h4 className="text-white font-medium">Conecte suas redes sociais</h4>
              <p className="text-gray-400 mt-1">Vincule suas contas do Facebook e Instagram para começar a gerenciar seu conteúdo.</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(0,225,255,0.1)] text-[#00E1FF] mr-3">
              2
            </div>
            <div>
              <h4 className="text-white font-medium">Crie seu primeiro post</h4>
              <p className="text-gray-400 mt-1">Faça upload de imagens ou crie conteúdo com a ajuda da IA.</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(0,225,255,0.1)] text-[#00E1FF] mr-3">
              3
            </div>
            <div>
              <h4 className="text-white font-medium">Agende sua publicação</h4>
              <p className="text-gray-400 mt-1">Escolha a data e hora ideais para sua publicação ou publique imediatamente.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
} 