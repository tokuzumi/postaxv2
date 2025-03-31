export const metadata = {
  title: "Criar Conteúdo | Postax",
  description: "Criar novos conteúdos para redes sociais",
};

export default function CreateContentPage() {
  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Criar Conteúdo</h1>
      
      <div className="bg-[#1D1F2B] rounded-lg p-12 flex items-center justify-center text-center shadow-lg">
        <div>
          <div className="text-purple-400 text-6xl mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Em breve...</h2>
          <p className="text-gray-400 text-xl">
            Estamos trabalhando para trazer uma experiência de criação de conteúdo incrível para você.
          </p>
        </div>
      </div>
    </div>
  );
} 