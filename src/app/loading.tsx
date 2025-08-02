import Logo from "@/components/shared/Logo";
import { IconLoader2 } from "@tabler/icons-react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-6 bg-zinc-900/75 backdrop-blur-md text-white transition-all duration-300">
      {/* Logo com pulso */}
      <div className="animate-pulse">
        <Logo width={280} linkable={false} />
      </div>

      {/* Texto animado */}
      <div className="flex items-center gap-2 text-2xl font-medium">
        <IconLoader2 className="animate-spin text-amber-400" size={28} />
        <span>Carregando...</span>
      </div>
    </div>
  );
}


