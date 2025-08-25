// components/qg/NewsItem.tsx
"use client";
import type { Noticia } from "@/types/notice";
import { IconEdit, IconTrash } from "@tabler/icons-react";

interface Props {
  noticia: Noticia;
  onEdit: () => void;
  onDelete: () => void;
}

export default function NewsItem({ noticia, onEdit, onDelete }: Props) {
  return (
    <div className="bg-zinc-700 border border-zinc-600 p-4 rounded-md text-gray-200 flex items-center justify-between ">
      <div>
        <h4 className="font-semibold">{noticia.titulo}</h4>
      </div>
      <div className="flex gap-2">
        <button onClick={onEdit} className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white cursor-pointer">
          <IconEdit size={18} />
        </button>
        <button onClick={onDelete} className="p-2 bg-red-600 hover:bg-red-700 rounded-md text-white cursor-pointer">
          <IconTrash size={18} />
        </button>
      </div>
    </div>
  );
}
