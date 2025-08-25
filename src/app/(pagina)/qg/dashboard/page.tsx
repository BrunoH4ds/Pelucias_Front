"use client";

import {
  IconUser,
  IconFileText,
  IconNews,
  IconAppWindow,
} from "@tabler/icons-react";
import StatCard from "@/components/qg/dashboard/StatCard";
import { TaskList } from "@/components/qg/dashboard/TaskList";
import LastUsersCard from "@/components/qg/dashboard/LastUserCard";
import { TaskProvider } from "@/context/TaskContext";
import { useAuth } from "@/hooks/useAuth";
import DataFetcher from "@/components/ui/DataFetcher";

import { getAllAdmins } from "../../../../api/AdminCrud";
import { getAllProdutos } from "../../../../api/ProdutosCrud";
import { getAllNoticias } from "../../../../api/NoticiaCrud";

interface DashboardData {
  admins: any[] | null;
  produtos: any[] | null;
  noticias: any[] | null;
}

export default function AdminHome() {
  const { accessToken } = useAuth();

  const fetchData = async (): Promise<DashboardData> => {
    if (!accessToken) {
      return {
        admins: null,
        produtos: null,
        noticias: null
      };
    }

    try {
      const [admins, produtos, noticias] = await Promise.all([
        getAllAdmins(accessToken),
        getAllProdutos(),
        getAllNoticias(),
      ]);

      return {
        admins: admins || null,
        produtos: produtos || null,
        noticias: noticias || null,
      };
    } catch (error) {
      console.error("Erro ao buscar dados do dashboard:", error);
      return {
        admins: null,
        produtos: null,
        noticias: null
      };
    }
  };

  return (
    <DataFetcher fetchData={fetchData}>
      {(data) => {
        const adminCount = data?.admins?.length ?? 0;
        const produtoCount = data?.produtos?.length ?? 0;
        const noticiaCount = data?.noticias?.length ?? 0;

        return (
          <div>
            <h2 className="text-2xl font-semibold">Visão Geral</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mt-3 gap-5 items-center justify-between">
              <StatCard
                icon={<IconUser />}
                title="Administradores"
                value={adminCount}
                description="Admins ativos no sistema"
              />
              <StatCard
                icon={<IconFileText />}
                title="Produtos"
                value={produtoCount}
                description="Itens cadastrados"
              />
              <StatCard
                icon={<IconNews />}
                title="Notícias"
                value={noticiaCount}
                description="Publicações disponíveis"
              />
              <StatCard
                icon={<IconAppWindow />}
                title="Paginas"
                value={7}
                description="Paginas totais"
              />
            </div>

            <TaskProvider>
              <TaskList />
            </TaskProvider>

            <LastUsersCard admins={data?.admins || null} token={accessToken || undefined} />
          </div>
        );
      }}
    </DataFetcher>
  );
}
