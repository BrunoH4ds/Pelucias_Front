"use client";

import InformacoesProduto from "@/components/loja/product/Especific_comp/InformacoesProduto";
import AvaliacoesUsuarios from "@/components/loja/product/Especific_comp/AvaliacoesUsuarios";
import ProdutoNaoEncontrado from "@/components/loja/product/Especific_comp/ProdutoNaoEncontrado";
import { getProdutoById } from "../../../../../api/ProdutosCrud";
import DataFetcher from "@/components/ui/DataFetcher";
import { useParams } from "next/navigation";

export default function InfoProduct() {
  const params = useParams();
  const productId = params.id as string;

  return (
    <DataFetcher
      fetchData={() => getProdutoById(productId)}
    >
      {(produto) => (
        produto ? (
          <div className="flex flex-col">
            <InformacoesProduto produto={produto} />
            <AvaliacoesUsuarios produto={produto} />
          </div>
        ) : (
          <ProdutoNaoEncontrado />
        )
      )}
    </DataFetcher>
  );
}
