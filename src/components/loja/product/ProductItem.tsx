import Image from "next/image";
import Link from "next/link";
import NotaReview from "../../shared/NotaReview";
import type { Produto } from "@/types/product";

interface ProductItemProps {
  produto: Produto;
  SemScale?: boolean;
}

export default function ProductItem({ produto, SemScale }: ProductItemProps) {
  return (
    <Link
      href={`/loja/produto/${produto._id}`}
      className={`flex flex-col bg-white/90 rounded-md relative backdrop-blur-md min-h-[350px] max-h-[350px] min-w-[250px] transition-transform duration-200 ${
        !SemScale ? "hover:scale-105" : "hover:border-2 hover:border-blue-700"
      }`}
    >
      <div className="absolute flex justify-end top-2.5 right-2.5 z-10">
        <NotaReview nota={produto.nota} key={produto._id} />
      </div>

      {/* Contêiner fixo para imagem */}
      <div className="relative w-full h-48 rounded-t-md overflow-hidden">
        <Image
          src={produto.imagem}
          alt={`Imagem de ${produto.nome}`}
          fill
          sizes="100%"
          className="object-cover object-top"
          priority
        />
      </div>

      <div className="flex flex-col flex-grow p-5 gap-3 border-t border-black/50">
        <span className="text-lg font-semibold">{produto.nome}</span>
        <span className="text-sm border-b border-b-black border-dashed self-start">
          {produto.especificacoes?.destaque}
        </span>
        <div className="flex-grow" />
        <div className="flex flex-col">
          <span className="text-sm text-amber-500 line-through">
            De R${produto.precoBase}
          </span>
          <span className="text-xl font-bold text-blue-700">
            Por R${produto.precoPromocional}
          </span>
        </div>
      </div>
    </Link>
  );
}
