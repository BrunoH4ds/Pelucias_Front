// app/qg/noticias/page.tsx
import { cookies } from "next/headers";
import { getAllNoticias } from "../../../../../../api/NoticiaCrud";
import ClientNewsList from "@/components/qg/noticias/ClientNewsList";

export default async function NoticiasPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;
  const noticias = token ? await getAllNoticias() : null;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-200">Notícias</h1>
      <ClientNewsList initialNoticias={noticias} token={token} />
    </div>
  );
}
