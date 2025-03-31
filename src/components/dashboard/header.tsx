"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  userName: string;
}

export function Header({ userName }: HeaderProps) {
  return (
    <header className="border-b border-[#414151] px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold text-white">
          Postax
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="text-white mr-2">Olá, {userName}</div>
          <div className="relative group">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
} 