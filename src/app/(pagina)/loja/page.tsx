import CarrosselNoticias from "@/components/loja/carrossel/CarrosselNotice";
import CarrosselProdutos from "@/components/loja/carrossel/CarrosselProduct";
import AllProducts from "@/components/loja/product/AllProduct";
import { getAllProdutos } from "../../../../api/ProdutosCrud";
import { getAllNoticias } from "../../../../api/NoticiaCrud";

export const dynamic = "force-dynamic";

export default async function Loja() {
  const produtos = await getAllProdutos();
  const noticias = await getAllNoticias();

  return (
    <div className="flex flex-col">
      {!noticias || noticias.length === 0 ? null : (
        <div className="p-10 ">
          <CarrosselNoticias noticias={noticias} />
        </div>
      )}
      <div>
        <CarrosselProdutos produtos={produtos} />
      </div>
      <div>
        <AllProducts produtos={produtos} />
      </div>
    </div>
  );
}
