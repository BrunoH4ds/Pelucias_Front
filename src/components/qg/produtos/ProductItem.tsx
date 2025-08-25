"use client";

import type { Produto } from "@/types/product";
import { IconEdit, IconTrash } from "@tabler/icons-react";

interface ProductItemProps {
  produto: Produto;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductItem({ produto, onEdit, onDelete }: ProductItemProps) {
  return (
    <div className="flex items-center justify-between bg-zinc-700 p-4 rounded-md border border-zinc-600">
      <div>
        <h4 className="text-white font-semibold">{produto.nome}</h4>
        <p className="text-gray-300">{produto.descricao}</p>
        <p className="text-gray-300">Preço: R$ {produto.precoPromocional || produto.precoBase}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="text-sm bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md cursor-pointer"
        >
          <IconEdit size={20} />
        </button>
        <button
          onClick={onDelete}
          className="text-sm bg-red-600 hover:bg-red-700 text-white p-2 rounded-md cursor-pointer"
        >
          <IconTrash size={18} />
        </button>
      </div>
    </div>
  );
}
