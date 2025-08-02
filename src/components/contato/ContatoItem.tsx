import { ReactNode } from "react";

interface ContatoItemProps {
  icon: ReactNode;
  titulo: string;
  descricao: string;
}

export default function ContatoItem({ icon, titulo, descricao }: ContatoItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-amber-500">{icon}</div>
      <div>
        <h4 className="font-semibold text-lg">{titulo}</h4>
        <p className="text-zinc-300">{descricao}</p>
      </div>
    </div>
  );
}
