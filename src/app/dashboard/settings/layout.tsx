import { ReactNode } from "react";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";

interface SettingsLayoutProps {
  children: ReactNode;
}

const settingsNavItems = [
  {
    title: "Perfil",
    href: "/dashboard/settings/profile",
  },
  {
    title: "Segurança",
    href: "/dashboard/settings/security",
  },
  {
    title: "Notificações",
    href: "/dashboard/settings/notifications",
  },
];

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Configurações</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-64">
          <SidebarNav items={settingsNavItems} />
        </aside>
        
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
} 