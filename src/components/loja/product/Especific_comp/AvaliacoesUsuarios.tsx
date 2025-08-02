import type { Produto } from "@/types/product";
import NotaReview from "@/components/shared/NotaReview";
import { NumberTicker } from "@/components/magicui/number-ticker";

import {
  IconHeartFilled,
  IconComet,
} from "@tabler/icons-react";

export interface AvaliacoesUsuariosProps {
  produto: Produto;
}

export default function AvaliacoesUsuarios({ produto }: AvaliacoesUsuariosProps) {
  const NumberRandom = Math.floor(Math.random() * 1000);

  return (
    <div className="relative flex flex-col gap-4 bg-zinc-900 p-6 border-t border-amber-400/50 overflow-hidden">

      {/* Ícones decorativos no fundo */}
      <IconComet
        className="absolute text-yellow-400 opacity-10 top-4 left-4 animate-spin-slow"
        size={250}
      />
      <IconHeartFilled
        className="absolute text-blue-500 opacity-10 -bottom-8 right-10 animate-pulse"
        size={300}
      />

      {/* Título */}
      <div className="flex items-center gap-2 z-10">
        <span className="text-2xl">⭐</span>
        <span className="text-2xl font-semibold text-yellow-400">
          Avaliações dos Usuários
        </span>
      </div>

      {/* Texto geral */}
      <p className="text-white font-light leading-relaxed z-10">
        Nossos clientes adoram a maciez e o acabamento das pelúcias! Muitos
        elogiam a qualidade dos materiais, a costura bem feita e a fofura
        inigualável. Também destacam que os brinquedos são perfeitos para
        presentear, principalmente em datas especiais como aniversários e Dia
        das Crianças. É comum ouvirmos que os produtos superam as expectativas
        em tamanho, beleza e carinho.
      </p>

      {/* Avaliação + Destaques */}
      <div className="flex justify-center items-center gap-6 mt-4 flex-col sm:flex-row z-10">
        <div className="flex flex-col gap-2 items-center">
          <div className="text-6xl md:text-7xl text-blue-700 font-bold">
            {produto.nota}
          </div>
          <NotaReview nota={produto.nota} tamanho={18} />
          <div className="font-light text-sm text-white">
            (<NumberTicker value={NumberRandom} className="text-white" /> Comentários)
          </div>
        </div>

        <div className="flex-1 bg-white border border-blue-700 p-4 rounded-xl shadow-inner">
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Extremamente macio e fofinho</li>
            <li>Ideal para presentear</li>
            <li>Acabamento de alta qualidade</li>
            <li>Chega bem embalado e rápido</li>
            <li>Mais bonito que nas fotos</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
