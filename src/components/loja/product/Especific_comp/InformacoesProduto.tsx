import Image from "next/image";
import type { Produto } from "@/types/product";
import Especificacoes from "./Especificacoes";
import BannerCompra from "./BannerCompra";
import {
  IconStarFilled,
  IconGift,
  IconHeart,
} from "@tabler/icons-react";

export interface InformacoesProdutoProps {
  produto: Produto;
}

export default function InformacoesProduto({ produto }: InformacoesProdutoProps) {
  return (
    <div
      className="relative flex flex-col md:flex-row bg-zinc-900 p-5 gap-5 overflow-hidden"
      style={{ minHeight: "calc(100vh - 94px)" }}
    >
      {/* Ícones decorativos de fundo */}
      <IconStarFilled
        className="absolute text-amber-500 opacity-10 -top-20 -left-25 rotate-25 animate-pulse"
        size={260}
      />
      <IconGift
        className="absolute text-amber-500 opacity-10 -bottom-12 -right-12 animate-pulse"
        size={300}
      />
      <IconHeart
        className="absolute text-blue-500 opacity-10 top-1/2 left-1/2 -translate-x-1/2 hidden md:flex -translate-y-1/2 "
        size={500}
      />

      {/* Imagem do produto */}
      <div className="h-[500px] md:w-1/2 md:h-auto relative flex justify-center">
          <Image
            src={produto.imagem}
            alt={`Imagem de ${produto.nome}`}
            className="object-cover rounded-md"
            fill
            sizes="100%"
            priority
          />
      </div>

      {/* Informações do produto */}
      <div className="flex flex-1 flex-col z-10">
        <div className="text-2xl font-semibold text-blue-700">
          {produto?.nome}
        </div>
        <div className="font-light text-white mb-2">{produto?.descricao}</div>
        <Especificacoes produto={produto} />
        <BannerCompra produto={produto} />
      </div>
    </div>
  );
}
