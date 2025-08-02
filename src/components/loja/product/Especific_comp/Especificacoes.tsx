import { IconTag } from "@tabler/icons-react";
import type { Produto } from "@/types/product";
import Tag from "@/components/shared/Tag";

export interface EspecificacoesProps {
  produto: Produto;
}

export default function Especificacoes(props: EspecificacoesProps) {
  const { produto } = props;

  // Verifica se 'produto.especificacoes' é uma string JSON e converte para um objeto
  const especificacoes =
    typeof produto.especificacoes === "string"
      ? JSON.parse(produto.especificacoes)
      : produto.especificacoes;

  return (
    <div className="flex-1 flex flex-col gap-1 my-2">
      <div className="flex mb-3">
        <Tag
          label={produto.especificacoes.destaque!}
          icone={IconTag}
          outlined
        />
      </div>
      {especificacoes &&
        Object.keys(especificacoes)
          .filter(
            (k) =>
              k !== "destaque" &&
              (typeof especificacoes[k] === "string" ||
                typeof especificacoes[k] === "number")
          )
          .map((chave) => (
            <div key={chave} className="flex gap-1">
              <span className="p-2 w-1/3 bg-blue-600 text-white font-medium rounded-md">
                {chave}
              </span>
              <span className="p-2 w-2/3 bg-white text-zinc-900 rounded-md border-l border-blue-600">
                {especificacoes[chave]}
              </span>
            </div>
          ))}
    </div>
  );
}
