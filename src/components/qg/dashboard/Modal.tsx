"use client";

import { useState, useEffect } from "react";
import type { Admin } from "@/types/admin";

interface ModalProps {
  admin: Admin | null;
  onClose: () => void;
  onCreate: (data: { username: string; senha: string }) => Promise<void>;
  onUpdate: (
    id: string,
    data: { username: string; senha: string }
  ) => Promise<void>;
}

export default function Modal({
  admin,
  onClose,
  onCreate,
  onUpdate,
}: ModalProps) {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    setUsername(admin?.username || "");
    setSenha("");
  }, [admin]);

  const handleSubmit = async () => {
    if (!username || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    // Validação simples frontend (opcional)
    if (username.length < 3) {
      alert("Usuário deve ter pelo menos 3 caracteres");
      return;
    }
    if (senha.length < 6) {
      alert("Senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      if (admin) {
        await onUpdate(admin._id, { username, senha });
      } else {
        await onCreate({ username, senha });
      }
      onClose();
    } catch (error) {
      throw new Error("Erro ao salvar administrador", { cause: error });
    }
  };

  return (
    <div className="fixed inset-0 bg-zinc-900/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-800 p-6 rounded-md border border-amber-400/50 w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-4">
          {admin ? "Editar Administrador" : "Adicionar Administrador"}
        </h2>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white border border-amber-400/50"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white border border-amber-400/50"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-md cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-4 border border-amber-400/50 text-white rounded-md hover:bg-zinc-700 transition cursor-pointer"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
