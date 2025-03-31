import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Header } from "@/components/dashboard/header";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";

interface DashboardLayoutProps {
  children: ReactNode;
}

const sidebarNavItems = [
  {
    title: "Visão Geral",
    href: "/dashboard",
  },
  {
    title: "Criar Conteúdo",
    href: "/dashboard/content/create",
  },
  {
    title: "Agendamentos",
    href: "/dashboard/schedule",
  },
  {
    title: "Redes Sociais",
    href: "/dashboard/social",
  },
  {
    title: "Métricas",
    href: "/dashboard/metrics",
  },
  {
    title: "Configurações",
    href: "/dashboard/settings",
  },
];

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#151823] text-white">
      <Header userName={session.user.name} />
      
      <div className="flex-1 flex">
        <aside className="hidden md:flex w-64 border-r border-[#414151] p-4">
          <div className="w-full">
            <SidebarNav items={sidebarNavItems} />
          </div>
        </aside>
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 