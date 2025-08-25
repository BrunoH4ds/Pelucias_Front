"use client";

import { useState, useMemo } from "react";
import type { Produto } from "@/types/product";
import {
  createProduto,
  updateProduto,
  deleteProduto,
} from "../../../api/ProdutosCrud";
import ProductItem from "./ProductItem";
import ModalProduct from "./ModalProduct";

interface Props {
  initialProdutos: Produto[] | null;
  token: string | undefined;
}

export default function ClientProductList({ initialProdutos, token }: Props) {
  const [produtos, setProdutos] = useState<Produto[] | null>(initialProdutos);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Produto | null>(null);

  const filteredProdutos = useMemo(() => {
    if (!produtos) return [];
    return produtos.filter(
      (p) =>
        typeof p.nome === "string" &&
        p.nome.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, produtos]);

  const openModalToCreate = () => {
    setSelected(null);
    setModalOpen(true);
  };

  const openModalToEdit = (produto: Produto) => {
    setSelected(produto);
    setModalOpen(true);
  };

  const handleCreate = async (form: FormData) => {
    if (!token) return alert("Sem token");
    try {
      const novo = await createProduto(form, token);
      if (novo) {
        setProdutos((prev) => (prev ? [...prev, novo as Produto] : [novo as Produto]));
        setModalOpen(false);
        window.location.reload();
      } else {
        alert("Erro ao criar produto: retorno nulo");
      }
    } catch {
      alert("Erro ao criar produto");
    }
  };

  const handleUpdate = async (id: string, form: FormData) => {
    if (!token) return alert("Sem token");
    try {
      const atualizado = await updateProduto(id, form, token);
      if (atualizado) {
        setProdutos(
          (prev) => prev?.map((p) => (p._id === id ? atualizado as Produto : p)) ?? null
        );
        setModalOpen(false);
        window.location.reload();
      } else {
        alert("Erro ao atualizar produto: retorno nulo");
      }
    } catch {
      alert("Erro ao atualizar produto");
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return alert("Sem token");
    if (!confirm("Deseja mesmo remover?")) return;
    try {
      await deleteProduto(id, token);
      setProdutos((prev) => prev?.filter((p) => p._id !== id) ?? null);
      window.location.reload();
    } catch {
      alert("Erro ao deletar produto");
    }
  };

  return (
    <div className="bg-zinc-800 border border-amber-400/50 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4 gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar produto..."
          className="p-2 rounded bg-zinc-700 text-white border border-amber-400/50 w-full max-w-md"
        />
        <button
          onClick={openModalToCreate}
          className="py-2 px-4 border border-amber-400/50 text-white rounded-md hover:bg-zinc-700 cursor-pointer"
        >
          Adicionar
        </button>
      </div>

      <div className="space-y-4">
        {filteredProdutos.length > 0 ? (
          filteredProdutos.map((p) => (
            <ProductItem
              key={p._id}
              produto={p}
              onEdit={() => openModalToEdit(p)}
              onDelete={() => handleDelete(p._id)}
            />
          ))
        ) : (
          <p className="text-gray-300">Nenhum produto encontrado.</p>
        )}
      </div>

      {modalOpen && (
        <ModalProduct
          produto={selected}
          onClose={() => setModalOpen(false)}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
