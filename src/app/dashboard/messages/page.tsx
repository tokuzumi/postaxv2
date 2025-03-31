export const metadata = {
  title: "Mensagens | Postax",
  description: "Gerenciar mensagens e comunicações da plataforma",
};

export default function MessagesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Mensagens</h1>
      <p className="text-gray-400 mb-8">
        Gerencie suas mensagens e comunicações com a equipe
      </p>
      
      <div className="bg-[#1D1F2B] rounded-lg p-10 shadow-lg">
        <div className="flex flex-col items-center text-center max-w-xl mx-auto">
          <div className="text-purple-400 mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold mb-3">Sistema de Mensagens</h2>
          <p className="text-gray-300 mb-6">
            Estamos desenvolvendo nosso sistema de mensagens para permitir comunicação 
            entre membros da equipe e suporte diretamente na plataforma.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
            <div className="bg-[#252736] p-4 rounded-lg">
              <div className="text-purple-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-1">Chat em Tempo Real</h3>
              <p className="text-gray-400 text-sm">Comunicação instantânea com sua equipe e suporte</p>
            </div>
            
            <div className="bg-[#252736] p-4 rounded-lg">
              <div className="text-purple-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-1">Compartilhamento de Arquivos</h3>
              <p className="text-gray-400 text-sm">Compartilhe facilmente arquivos e mídias</p>
            </div>
          </div>
          
          <p className="text-gray-400 mt-8 text-sm">
            Em breve! Estamos trabalhando para disponibilizar esta funcionalidade o mais rápido possível.
          </p>
        </div>
      </div>
    </div>
  );
} 