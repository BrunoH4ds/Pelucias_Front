"use client";

import { getAllNoticias } from "../../../../../api/NoticiaCrud";
import ClientNewsList from "@/components/qg/noticias/ClientNewsList";
import DataFetcher from "@/components/ui/DataFetcher";
import { useAuth } from "@/hooks/useAuth";

export default function NoticiasPage() {
  const { accessToken } = useAuth();

  return (
    <DataFetcher fetchData={getAllNoticias}>
      {(noticias) => (
        <div>
          <h1 className="text-3xl font-bold mb-6 text-gray-200">Notícias</h1>
          <ClientNewsList
            initialNoticias={noticias}
            token={accessToken || undefined}
          />
        </div>
      )}
    </DataFetcher>
  );
}
