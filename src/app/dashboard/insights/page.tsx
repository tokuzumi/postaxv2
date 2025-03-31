export const metadata = {
  title: "Gerenciamento Inteligente | Postax",
  description: "Métricas e insights para suas redes sociais",
};

export default function InsightsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Gerenciamento Inteligente</h1>
      <p className="text-gray-400 mb-8">
        Obtenha métricas e insights avançados para otimizar sua presença nas redes sociais
      </p>

      <div className="bg-[#1D1F2B] rounded-lg p-8 shadow-lg">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="text-purple-400 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3">Em desenvolvimento</h2>
          <p className="text-gray-300 mb-6">
            Estamos trabalhando para trazer análises avançadas que ajudarão você a 
            entender o desempenho do seu conteúdo e otimizar sua estratégia nas redes sociais.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
            <div className="bg-[#252736] p-4 rounded-lg">
              <div className="text-purple-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-1">Análise de Desempenho</h3>
              <p className="text-gray-400 text-sm">Métricas detalhadas sobre o engajamento do seu conteúdo</p>
            </div>
            
            <div className="bg-[#252736] p-4 rounded-lg">
              <div className="text-purple-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-1">Horários Ideais</h3>
              <p className="text-gray-400 text-sm">Descubra os melhores horários para publicar em cada rede</p>
            </div>
            
            <div className="bg-[#252736] p-4 rounded-lg">
              <div className="text-purple-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-1">Crescimento de Seguidores</h3>
              <p className="text-gray-400 text-sm">Acompanhe o crescimento de sua audiência ao longo do tempo</p>
            </div>
          </div>

          <p className="text-gray-400 mt-8 text-sm">
            Fique atento, em breve esta funcionalidade estará disponível para todos os usuários.
          </p>
        </div>
      </div>
    </div>
  );
} 