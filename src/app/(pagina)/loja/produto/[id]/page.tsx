import InformacoesProduto from "@/components/loja/product/Especific_comp/InformacoesProduto";
import AvaliacoesUsuarios from "@/components/loja/product/Especific_comp/AvaliacoesUsuarios";
import ProdutoNaoEncontrado from "@/components/loja/product/Especific_comp/ProdutoNaoEncontrado";
import { getProdutoById } from "../../../../../../api/ProdutosCrud";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InfoProduct({ params }: PageProps) {
  const resolvedParams = await params; // espera a Promise resolver
  const produto = await getProdutoById(resolvedParams.id);

  return produto ? (
    <div className="flex flex-col">
      <InformacoesProduto produto={produto} />
      <AvaliacoesUsuarios produto={produto} />
    </div>
  ) : (
    <ProdutoNaoEncontrado />
  );
}
