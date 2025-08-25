"use client";

import { getAllProdutos } from "../../../../../api/ProdutosCrud";
import ClientProductList from "@/components/qg/produtos/ClientProductList";
import DataFetcher from "@/components/ui/DataFetcher";
import { useAuth } from "@/hooks/useAuth";

export default function ProdutosPage() {
  const { accessToken } = useAuth();

  return (
    <DataFetcher fetchData={getAllProdutos}>
      {(produtos) => (
        <div>
          <h1 className="text-3xl font-bold mb-6 text-gray-200">Produtos</h1>
          <ClientProductList
            initialProdutos={produtos}
            token={accessToken || undefined}
          />
        </div>
      )}
    </DataFetcher>
  );
}
