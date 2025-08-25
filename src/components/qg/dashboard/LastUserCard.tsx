"use client";

import type { Admin } from "@/types/admin";
import { useState, useMemo } from "react";
import SingleLastUserCard from "./SingleLastUserCard";
import Modal from "./Modal";
import { createAdmin, updateAdmin, deleteAdmin } from "../../../api/AdminCrud";
import { IconEdit, IconTrash } from "@tabler/icons-react";

interface LastUsersCardProps {
  admins: Admin[] | null;
  token: string | undefined;
}

export default function LastUsersCard({
  admins: initialAdmins,
  token,
}: LastUsersCardProps) {
  const [admins, setAdmins] = useState<Admin[] | null>(initialAdmins);
  const [search, setSearch] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredAdmins = useMemo(() => {
    if (!admins) return [];
    return admins.filter(
      (admin) =>
        admin &&
        typeof admin.username === "string" &&
        admin.username.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, admins]);

  const handleAdd = () => {
    setSelectedAdmin(null);
    setModalOpen(true);
  };

  const handleEdit = (admin: Admin) => {
    setSelectedAdmin(admin);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!token) return alert("Token não disponível");
    if (confirm("Tem certeza que deseja remover este administrador?")) {
      try {
        await deleteAdmin(id, token);
        setAdmins((prev) => prev?.filter((admin) => admin._id !== id) || null);
        window.location.reload();
      } catch {
        alert("Erro ao deletar administrador");
      }
    }
  };

  const handleCreate = async (data: { username: string; senha: string }) => {
    if (!token) return alert("Token não disponível");
    try {
      const novoAdmin = await createAdmin(data, token);
      setAdmins((prev) => (prev ? [...prev, novoAdmin] : [novoAdmin]));
      window.location.reload();
    } catch {
      alert("Erro ao criar administrador");
    }
  };

  const handleUpdate = async (
    id: string,
    data: { username: string; senha: string }
  ) => {
    if (!token) return alert("Token não disponível");
    try {
      const atualizado = await updateAdmin(id, data, token);
      setAdmins((prev) =>
        prev
          ? prev.map((admin) => (admin._id === id ? atualizado : admin))
          : null
      );
      window.location.reload();
    } catch {
      alert("Erro ao atualizar administrador");
    }
  };

  return (
    <div className="bg-zinc-800 border border-amber-400/50 p-6 mt-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-200 text-lg">Administradores</h3>
        <button
          onClick={handleAdd}
          className="py-2 px-4 border border-amber-400/50 text-white rounded-md hover:bg-zinc-700 transition cursor-pointer"
        >
          Adicionar
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nome..."
        className="w-full p-2 mb-4 rounded bg-zinc-700 text-white border border-amber-400/50"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-2">
        {filteredAdmins.length > 0 ? (
          filteredAdmins.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center bg-zinc-700 border border-zinc-600 gap-5 p-4 rounded-md"
            >
              <SingleLastUserCard user={user} />
              {/* Hide edit and delete buttons if this is the last admin */}
              {admins && admins.length > 1 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="flex gap-1 items-center text-sm bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md cursor-pointer"
                  >
                    <IconEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="flex gap-1 items-center text-sm bg-red-600 hover:bg-red-700 text-white p-2 rounded-md cursor-pointer"
                  >
                    <IconTrash size={20} />
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-300">Nenhum administrador encontrado.</p>
        )}
      </div>

      {modalOpen && (
        <Modal
          admin={selectedAdmin}
          onClose={() => setModalOpen(false)}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
