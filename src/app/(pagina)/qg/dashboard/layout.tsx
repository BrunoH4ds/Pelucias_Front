"use client"

import { useCheckAuth } from "@/lib/CheckAuth";
import SideBar from "@/components/qg/SideBar";

export default function QgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useCheckAuth();

  return (
    <div className="flex flex-col gap-10 md:flex-row flex-1 bg-zinc-800 md:px-10">
      {/* Sidebar fixo */}
      <SideBar />

      {/* Conteúdo principal com rolagem interna */}
      <div className="flex-1 mb-8 border-y border-amber-400/50 md:mb-0 md:border-x md:border-y-0 md:border-amber-400/50 p-6 bg-zinc-900 text-white">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
