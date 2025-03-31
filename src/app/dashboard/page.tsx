import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "Dashboard | Postax",
  description: "Gerencie seus conteúdos nas redes sociais",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || "Usuário";
  const firstName = userName.split(" ")[0];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Bem-vindo, {firstName}!</h1>
        <p className="text-gray-400 mt-2">
          Gerencie suas redes sociais e agende seus posts em um só lugar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCardLarge
          title="Alcance Total"
          value="1,544"
          trend="+12%"
          trendUp={true}
          description="em comparação com o mês anterior"
          color="from-cyan-500 to-blue-500"
        />
        
        <StatCardLarge
          title="Engajamento"
          value="2,487"
          trend="+8%"
          trendUp={true}
          description="em comparação com o mês anterior"
          color="from-pink-500 to-purple-500"
        />
        
        <StatCardLarge
          title="Novos Seguidores"
          value="1,544"
          trend="+5%"
          trendUp={true}
          description="em comparação com o mês anterior"
          color="from-yellow-400 to-yellow-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-[#1D1F2B] rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Ações Rápidas</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ActionCard
                title="Agendar Conteúdo"
                description="Crie e agende posts para suas redes sociais"
                href="/dashboard/schedule"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
              />
              
              <ActionCard
                title="Conectar Redes"
                description="Conecte e configure suas redes sociais"
                href="/dashboard/social"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              />
            </div>
            
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Estatísticas Rápidas</h2>
                <select className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-1.5">
                  <option>Últimos 7 dias</option>
                  <option>Últimos 30 dias</option>
                  <option>Este mês</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  title="Posts Agendados"
                  value="14"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                />
                
                <StatCard
                  title="Posts Publicados"
                  value="26"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                />
                
                <StatCard
                  title="Alcance"
                  value="64%"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  }
                />
                
                <StatCard
                  title="Engajamento"
                  value="28%"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  }
                />
              </div>
              
              <div className="mt-6 bg-gray-800/60 p-4 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Desempenho por Rede</h3>
                  <span className="text-xs text-gray-400">Últimos 30 dias</span>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Facebook</span>
                      <span className="text-green-400">75%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-teal-400 to-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Instagram</span>
                      <span className="text-purple-400">82%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full" style={{ width: "82%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>TikTok</span>
                      <span className="text-blue-400">48%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 rounded-full" style={{ width: "48%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-[#1D1F2B] rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Calendário</h2>
            <div className="text-center">
              <div className="flex justify-between items-center mb-4">
                <button className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-lg font-medium">Janeiro</h3>
                <button className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                <div className="text-xs text-gray-500">D</div>
                <div className="text-xs text-gray-500">S</div>
                <div className="text-xs text-gray-500">T</div>
                <div className="text-xs text-gray-500">Q</div>
                <div className="text-xs text-gray-500">Q</div>
                <div className="text-xs text-gray-500">S</div>
                <div className="text-xs text-gray-500">S</div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-sm">
                <div className="py-2 text-gray-500">26</div>
                <div className="py-2 text-gray-500">27</div>
                <div className="py-2 text-gray-500">28</div>
                <div className="py-2 text-gray-500">29</div>
                <div className="py-2 text-gray-500">30</div>
                <div className="py-2 text-gray-500">31</div>
                <div className="py-2">1</div>
                
                <div className="py-2">2</div>
                <div className="py-2">3</div>
                <div className="py-2">4</div>
                <div className="py-2">5</div>
                <div className="py-2">6</div>
                <div className="py-2">7</div>
                <div className="py-2">8</div>
                
                <div className="py-2">9</div>
                <div className="py-2">10</div>
                <div className="py-2">11</div>
                <div className="py-2 rounded-full bg-purple-600 text-white">12</div>
                <div className="py-2 relative">
                  13
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>
                </div>
                <div className="py-2 relative">
                  14
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>
                </div>
                <div className="py-2">15</div>
                
                <div className="py-2">16</div>
                <div className="py-2 relative">
                  17
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full"></span>
                </div>
                <div className="py-2">18</div>
                <div className="py-2">19</div>
                <div className="py-2 relative">
                  20
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-500 rounded-full"></span>
                </div>
                <div className="py-2">21</div>
                <div className="py-2">22</div>
                
                <div className="py-2">23</div>
                <div className="py-2">24</div>
                <div className="py-2">25</div>
                <div className="py-2">26</div>
                <div className="py-2">27</div>
                <div className="py-2">28</div>
                <div className="py-2">29</div>
                
                <div className="py-2">30</div>
                <div className="py-2">31</div>
                <div className="py-2 text-gray-500">1</div>
                <div className="py-2 text-gray-500">2</div>
                <div className="py-2 text-gray-500">3</div>
                <div className="py-2 text-gray-500">4</div>
                <div className="py-2 text-gray-500">5</div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <h4 className="text-sm font-medium mb-2">Próximos Posts</h4>
              <div className="space-y-3">
                <div className="flex items-center p-2 rounded-lg bg-gray-800/60 border border-gray-700">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400">13 Jan · Instagram</div>
                    <div className="text-sm">Lançamento do novo produto</div>
                  </div>
                </div>
                
                <div className="flex items-center p-2 rounded-lg bg-gray-800/60 border border-gray-700">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400">14 Jan · Facebook</div>
                    <div className="text-sm">Dicas de uso do aplicativo</div>
                  </div>
                </div>
                
                <div className="flex items-center p-2 rounded-lg bg-gray-800/60 border border-gray-700">
                  <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400">17 Jan · TikTok</div>
                    <div className="text-sm">Tutorial em vídeo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1D1F2B] rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Análise de Tendências</h2>
            <select className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-1.5">
              <option>Últimos 30 dias</option>
              <option>Últimos 90 dias</option>
            </select>
          </div>
          
          <div className="relative h-60">
            <div className="absolute bottom-0 left-10 text-xs text-gray-500">Data 01</div>
            <div className="absolute bottom-0 left-1/3 text-xs text-gray-500">Data 02</div>
            <div className="absolute bottom-0 right-10 text-xs text-gray-500">Data 03</div>
            
            <div className="absolute left-0 top-0 w-full h-full flex items-center">
              <div className="w-full h-24 relative">
                <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
                  <path d="M0,50 C50,30 100,60 150,40 C200,20 250,80 300,60 C350,40 400,50 400,50" fill="none" stroke="url(#gradient)" strokeWidth="3" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="50%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#1D1F2B] rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Desempenho por Conteúdo</h2>
          </div>
          
          <div className="grid grid-cols-10 gap-1 mb-2">
            <div className="col-span-4 text-sm text-gray-400">Tipo</div>
            <div className="col-span-6 text-sm text-gray-400">Engajamento</div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-10 gap-1 items-center">
              <div className="col-span-4 text-sm">Imagens</div>
              <div className="col-span-6">
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-purple-500 h-3 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-10 gap-1 items-center">
              <div className="col-span-4 text-sm">Vídeos</div>
              <div className="col-span-6">
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{ width: "90%" }}></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-10 gap-1 items-center">
              <div className="col-span-4 text-sm">Texto</div>
              <div className="col-span-6">
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-10 gap-1 items-center">
              <div className="col-span-4 text-sm">Links</div>
              <div className="col-span-6">
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-yellow-500 h-3 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-10 gap-1 items-center">
              <div className="col-span-4 text-sm">Promoções</div>
              <div className="col-span-6">
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-pink-500 h-3 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block bg-gray-800/60 hover:bg-gray-700/60 rounded-lg p-4 transition-colors border border-gray-700"
    >
      <div className="flex items-start">
        <div className="w-10 h-10 rounded-full bg-purple-600/30 flex items-center justify-center text-purple-400">
          {icon}
        </div>
        <div className="ml-3">
          <h3 className="font-medium text-white">{title}</h3>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </Link>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-gray-800/60 rounded-lg p-3 border border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-gray-400 font-medium">{title}</div>
        <div className="w-6 h-6 rounded-full bg-purple-600/30 flex items-center justify-center text-purple-400">
          {icon}
        </div>
      </div>
      <div className="text-xl font-bold text-white">{value}</div>
    </div>
  );
}

function StatCardLarge({
  title,
  value,
  trend,
  trendUp,
  description,
  color,
}: {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  description: string;
  color: string;
}) {
  return (
    <div className="bg-[#1D1F2B] rounded-lg p-6 shadow-lg relative overflow-hidden">
      <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <div className="text-3xl font-bold mb-2">{value}</div>
      
      <div className="flex items-center">
        <span className={`text-sm font-medium ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
          {trend}
        </span>
        <span className="mx-1 text-gray-400">•</span>
        <span className="text-xs text-gray-400">{description}</span>
      </div>
      
      <div className="mt-3 w-full bg-gray-700 rounded-full h-1">
        <div className={`bg-gradient-to-r ${color} h-1 rounded-full`} style={{ width: "70%" }}></div>
      </div>
    </div>
  );
} 