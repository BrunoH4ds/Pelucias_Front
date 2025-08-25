"use client";

import CarrosselNoticias from "@/components/loja/carrossel/CarrosselNotice";
import CarrosselProdutos from "@/components/loja/carrossel/CarrosselProduct";
import AllProducts from "@/components/loja/product/AllProduct";
import { getAllProdutos } from "../../../api/ProdutosCrud";
import { getAllNoticias } from "../../../api/NoticiaCrud";
import DataFetcher from "@/components/ui/DataFetcher";

export const dynamic = "force-dynamic";

export default function Loja() {
  return (
    <div className="flex flex-col">
      <DataFetcher
        fetchData={async () => {
          const produtos = await getAllProdutos();
          const noticias = await getAllNoticias();
          return { produtos, noticias };
        }}
      >
        {(data) => (
          <>
            {!data || !data.noticias || data.noticias.length === 0 ? null : (
              <div className="p-10 ">
                <CarrosselNoticias noticias={data.noticias} />
              </div>
            )}
            <div>
              <CarrosselProdutos produtos={data?.produtos || []} />
            </div>
            <div>
              <AllProducts produtos={data?.produtos || []} />
            </div>
          </>
        )}
      </DataFetcher>
    </div>
  );
}
