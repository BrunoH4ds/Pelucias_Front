"use client";

import { useState } from "react";

interface Props {
  onClose: () => void;
  onCreate: (data: FormData) => Promise<void>;
}

export default function ModalNews({ onClose, onCreate }: Props) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!titulo || !descricao || !imagem) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("imagem", imagem);

    try {
      await onCreate(formData);
      onClose();
    } catch {
      alert("Erro ao criar notícia.");
    }
  };

  return (
    <div className="fixed inset-0 bg-zinc-900/50 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-zinc-800 p-6 rounded-md border border-amber-400/50 w-full max-w-lg">
        <h2 className="text-xl font-bold text-white mb-4">Adicionar Notícia</h2>

        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título"
          className="w-full p-2 mb-4 bg-zinc-700 text-white border border-amber-400/50 rounded"
        />

        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição da notícia"
          className="w-full h-32 p-2 mb-4 bg-zinc-700 text-white border border-amber-400/50 rounded"
        />

        <input
          type="file"
          onChange={(e) => setImagem(e.target.files?.[0] || null)}
          className="mb-4 py-2 px-4 border border-amber-400/50 text-white transition cursor-pointer"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-4 border border-amber-400/50 text-white rounded-md hover:bg-zinc-700 transition cursor-pointer"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}
