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
import { cookies } from "next/headers";

import { getAllAdmins } from "../../../../../api/AdminCrud";
import { getAllProdutos } from "../../../../../api/ProdutosCrud";
import { getAllNoticias } from "../../../../../api/NoticiaCrud";

export default async function AdminHome() {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;

  const [admins, produtos, noticias] = await Promise.all([
    token ? getAllAdmins(token) : [],
    token ? getAllProdutos() : [],
    token ? getAllNoticias() : [],
  ]);

  const adminCount = admins?.length ?? 0;
  const produtoCount = produtos?.length ?? 0;
  const noticiaCount = noticias?.length ?? 0;

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

      <LastUsersCard admins={admins} token={token} />
    </div>
  );
}
