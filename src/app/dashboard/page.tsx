import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ScheduledPostsCalendar } from '@/components/dashboard/scheduled-posts-calendar';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Calendar, CheckCircle, BarChart, TrendingUp, Users, Share2 } from "lucide-react";

export const metadata = {
  title: "Dashboard | Postax",
  description: "Gerencie seus conteúdos nas redes sociais",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/schedule">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Post
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendados</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publicados</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Desempenho das Publicações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
              <div className="text-center">
                <BarChart className="h-8 w-8 mx-auto mb-4 text-gray-500" />
                <p className="text-sm text-gray-500">Gráfico de Desempenho</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Alcance por Rede</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
              <div className="text-center">
                <Share2 className="h-8 w-8 mx-auto mb-4 text-gray-500" />
                <p className="text-sm text-gray-500">Distribuição por Rede Social</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Crescimento de Seguidores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-4 text-gray-500" />
                <p className="text-sm text-gray-500">Evolução de Seguidores</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Perfil da Audiência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-4 text-gray-500" />
                <p className="text-sm text-gray-500">Demografia dos Seguidores</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        <ScheduledPostsCalendar />
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