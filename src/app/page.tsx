import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from 'next/link';
import Image from "next/image";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#13001E] text-white">
      {/* Header */}
      <header className="border-b border-[rgba(255,255,255,0.1)] backdrop-blur-md bg-[rgba(24,3,36,0.8)] fixed w-full z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-[#00E1FF]">Postax</h1>
          </div>
          <div className="space-x-4">
            <Link 
              href="/login" 
              className="text-white hover:text-[#00E1FF] transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="bg-[#00E1FF] text-[#13001E] px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Registrar
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-10 mb-10 lg:mb-0">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              <span className="text-[#00E1FF]">Gerenciamento Inteligente</span> de Redes Sociais
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Crie, agende e gerencie conteúdo para todas as suas redes sociais em um só lugar.
              Potencialize sua presença digital com nossa plataforma intuitiva.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/register" 
                className="bg-gradient-to-r from-[#00E1FF] to-[#8833FF] text-white px-8 py-3 rounded-lg font-medium text-center hover:opacity-90 transition-all"
              >
                Comece Agora
              </Link>
              <Link 
                href="#recursos" 
                className="border border-[#00E1FF] text-[#00E1FF] px-8 py-3 rounded-lg font-medium text-center hover:bg-[rgba(0,225,255,0.1)] transition-all"
              >
                Saiba Mais
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="bg-gradient-to-br from-[#00E1FF] to-[#8833FF] absolute -inset-1 rounded-lg blur-md"></div>
              <div className="bg-[#200030] rounded-lg p-6 relative">
                <div className="rounded-lg shadow-2xl bg-[#180324] flex items-center justify-center h-[400px] text-center p-4">
                  <p className="text-gray-300 text-xl">Imagem do Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20 bg-[#200030] px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            <span className="text-[#00E1FF]">Recursos</span> Principais
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#180324] bg-opacity-80 rounded-xl shadow-lg p-6 hover:transform hover:scale-105 transition-all">
              <div className="w-14 h-14 rounded-full bg-[rgba(0,225,255,0.2)] flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#00E1FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Criação de Conteúdo</h3>
              <p className="text-gray-300">
                Crie posts impressionantes com ferramentas intuitivas ou faça upload de suas próprias mídias.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-[#180324] bg-opacity-80 rounded-xl shadow-lg p-6 hover:transform hover:scale-105 transition-all">
              <div className="w-14 h-14 rounded-full bg-[rgba(255,53,134,0.2)] flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#ff3586]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Agendamento</h3>
              <p className="text-gray-300">
                Programe seus posts com antecedência e mantenha suas redes sociais sempre atualizadas.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-[#180324] bg-opacity-80 rounded-xl shadow-lg p-6 hover:transform hover:scale-105 transition-all">
              <div className="w-14 h-14 rounded-full bg-[rgba(35,226,95,0.2)] flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#23e25f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Métricas e Análises</h3>
              <p className="text-gray-300">
                Acompanhe o desempenho de suas publicações e obtenha insights valiosos sobre sua audiência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para transformar sua <span className="text-[#00E1FF]">presença digital</span>?
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto">
            Junte-se a milhares de criadores e empresas que já estão utilizando o Postax para simplificar seu gerenciamento de redes sociais.
          </p>
          <Link 
            href="/register" 
            className="bg-gradient-to-r from-[#00E1FF] to-[#8833FF] text-white px-10 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-all"
          >
            Criar minha conta
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#180324] py-10 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold text-[#00E1FF]">Postax</h2>
              <p className="text-gray-400 mt-2">Gerenciamento Inteligente de Redes Sociais</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/login" className="text-gray-300 hover:text-[#00E1FF]">Login</Link>
              <Link href="/register" className="text-gray-300 hover:text-[#00E1FF]">Registrar</Link>
              <Link href="#" className="text-gray-300 hover:text-[#00E1FF]">Sobre</Link>
              <Link href="#" className="text-gray-300 hover:text-[#00E1FF]">Contato</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[rgba(255,255,255,0.1)] text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Postax. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 