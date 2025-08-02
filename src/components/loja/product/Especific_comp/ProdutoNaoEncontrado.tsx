import { IconError404 } from "@tabler/icons-react";
import Link from "next/link";

export interface ProdutoNaoEncontradoProps {
  semBotaoVoltar?: boolean;
}

export default function ProdutoNaoEncontrado(props: ProdutoNaoEncontradoProps) {
  return (
    <div className="flex flex-col justify-center items-center text-amber-900">
      <div className="flex flex-col bg-yellow-50 border border-amber-200 rounded-md p-5">
        <IconError404 size={180} stroke={0.5} />
        <span className="font-light">
          Produto não encontrado
        </span>
        {!props.semBotaoVoltar && (
          <Link href="/" className="flex bg-pink-600 hover:bg-pink-500 justify-center rounded-md p-1 text-white mt-5">
            Voltar
          </Link>
        )}
      </div>
    </div>
  );
}
