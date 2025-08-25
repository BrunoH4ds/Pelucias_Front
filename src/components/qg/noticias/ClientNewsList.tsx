"use client";

import { useState, useMemo } from "react";
import type { Noticia } from "@/types/notice";
import { createNoticia, updateNoticia, deleteNoticia } from "../../../api/NoticiaCrud";
import NewsItem from "./NewsItem";
import ModalNews from "./ModalNews";

interface Props {
  initialNoticias: Noticia[] | null;
  token: string | undefined;
}

export default function ClientNewsList({ initialNoticias, token }: Props) {
  const [noticias, setNoticias] = useState<Noticia[] | null>(initialNoticias);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Noticia | null>(null);

  const filteredNoticias = useMemo(() => {
    if (!noticias) return [];
    return noticias
      .filter(
        (noticia): noticia is Noticia =>
          noticia !== null &&
          noticia !== undefined &&
          typeof noticia.titulo === "string"
      )
      .filter((noticia) =>
        noticia.titulo.toLowerCase().includes(search.toLowerCase())
      );
  }, [search, noticias]);

  const openModalToCreate = () => {
    setSelected(null);
    setModalOpen(true);
  };

  const openModalToEdit = (noticia: Noticia) => {
    setSelected(noticia);
    setModalOpen(true);
  };

  const handleCreate = async (data: FormData) => {
    if (!token) return alert("Sem token");
    try {
      const nova = await createNoticia(data, token);
      setNoticias((prev) => (prev ? [...prev, nova] : [nova]));
      setModalOpen(false);
      window.location.reload();
    } catch {
      alert("Erro ao criar notícia.");
    }
  };

  const handleUpdate = async (id: string, data: FormData) => {
    if (!token) return alert("Sem token");
    try {
      const atualizada = await updateNoticia(id, token, data, true);
      setNoticias(
        (prev) => prev?.map((n) => (n._id === id ? atualizada : n)) ?? null
      );
      setModalOpen(false);
      window.location.reload();
    } catch {
      alert("Erro ao atualizar notícia.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return alert("Sem token");
    if (confirm("Remover notícia?")) {
      try {
        await deleteNoticia(id, token);
        setNoticias((prev) => prev?.filter((n) => n._id !== id) ?? null);
        window.location.reload();
      } catch {
        alert("Erro ao deletar notícia.");
      }
    }
  };

  return (
    <div className="bg-zinc-800 border border-amber-400/50 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar notícia..."
          className="p-2 rounded bg-zinc-700 text-white border border-amber-400/50 w-full max-w-md"
        />
        <button
          onClick={openModalToCreate}
          className="ml-4 py-2 px-4 border border-amber-400/50 text-white rounded-md hover:bg-zinc-700 cursor-pointer"
        >
          Adicionar
        </button>
      </div>

      <div className="space-y-4">
        {filteredNoticias.length > 0 ? (
          filteredNoticias.map((noticia) => (
            <NewsItem
              key={noticia._id}
              noticia={noticia}
              onEdit={() => openModalToEdit(noticia)}
              onDelete={() => handleDelete(noticia._id)}
            />
          ))
        ) : (
          <p className="text-gray-300">Nenhuma notícia encontrada.</p>
        )}
      </div>

      {modalOpen && (
        <ModalNews
          noticia={selected}
          onClose={() => setModalOpen(false)}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
