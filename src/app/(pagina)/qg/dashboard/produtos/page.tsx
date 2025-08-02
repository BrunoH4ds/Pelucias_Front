// app/qg/noticias/page.tsx
import { cookies } from "next/headers";
import { getAllProdutos } from "../../../../../../api/ProdutosCrud";
import ClientProductList from "@/components/qg/produtos/ClientProductList";

export default async function NoticiasPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;
  const produtos = token ? await getAllProdutos() : null;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-200">Produtos</h1>
      <ClientProductList initialProdutos={produtos} token={token} />
    </div>
  );
}
