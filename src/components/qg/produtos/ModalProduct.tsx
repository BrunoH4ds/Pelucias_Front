"use client";

import { useState, useEffect } from "react";
import type { Produto } from "@/types/product";
import { IconMinus, IconPlus } from "@tabler/icons-react";

interface ModalProductProps {
  produto: Produto | null;
  onClose: () => void;
  onCreate: (data: FormData) => Promise<void>;
  onUpdate: (id: string, data: FormData) => Promise<void>;
}

export default function ModalProduct({
  produto,
  onClose,
  onCreate,
  onUpdate,
}: ModalProductProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [nota, setNota] = useState("");
  const [precoBase, setPrecoBase] = useState("");
  const [precoPromocional, setPrecoPromocional] = useState("");
  const [contato, setContato] = useState("");
  const [destaque, setDestaque] = useState("");

  const [especificacoesExtras, setEspecificacoesExtras] = useState<
    { key: string; value: string }[]
  >([]);

  useEffect(() => {
    if (produto) {
      setNome(produto.nome || "");
      setDescricao(produto.descricao || "");
      setNota(produto.nota?.toString() || "");
      setPrecoBase(produto.precoBase?.toString() || "");
      setPrecoPromocional(produto.precoPromocional?.toString() || "");
      setContato(produto.contato || "");
      setDestaque(produto.especificacoes?.destaque || "");
      const extras = Object.entries(produto.especificacoes || {})
        .filter(([key]) => key !== "destaque")
        .map(([key, value]) => ({ key, value }));
      setEspecificacoesExtras(extras);
      setImagem(null);
    }
  }, [produto]);

  const addExtra = () => {
    setEspecificacoesExtras([...especificacoesExtras, { key: "", value: "" }]);
  };

  const removeExtra = (index: number) => {
    setEspecificacoesExtras((prev) => prev.filter((_, i) => i !== index));
  };

  const updateExtra = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const updated = [...especificacoesExtras];
    updated[index][field] = value;
    setEspecificacoesExtras(updated);
  };

  const handleSubmit = async () => {
    console.log("===> Validando formulário...");
    console.log("Produto:", produto);
    console.log("Imagem nova:", imagem);
    console.log("Imagem existente:", produto?.imagem);
    console.log("Destaque:", destaque);
    console.log("Nota:", nota);
    console.log("Preço base:", precoBase);
    console.log("Preço promocional:", precoPromocional);

    // Validações básicas
    if (!nome.trim()) {
      alert("O nome é obrigatório.");
      return;
    }

    if (!imagem && !produto?.imagem) {
      alert("Selecione uma imagem.");
      return;
    }

    if (
      nota.trim() === "" ||
      isNaN(Number(nota)) ||
      Number(nota) < 0 ||
      Number(nota) > 5
    ) {
      alert("Nota deve ser um número entre 0 e 5.");
      return;
    }

    if (
      precoBase.trim() === "" ||
      isNaN(Number(precoBase)) ||
      Number(precoBase) <= 0
    ) {
      alert("Preço base deve ser um número maior que zero.");
      return;
    }

    if (
      precoPromocional.trim() === "" ||
      isNaN(Number(precoPromocional)) ||
      Number(precoPromocional) < 0
    ) {
      alert("Preço promocional deve ser um número válido.");
      return;
    }

    if (!contato.trim()) {
      alert("O contato é obrigatório.");
      return;
    }

    if (!destaque.trim()) {
      alert("O destaque é obrigatório.");
      return;
    }

    // Montar o FormData
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao);
    formData.append("nota", Number(nota).toString());
    formData.append("precoBase", Number(precoBase).toString());
    formData.append("precoPromocional", Number(precoPromocional).toString());
    formData.append("contato", contato);
    formData.append("especificacoes[destaque]", destaque);

    if (imagem) {
      formData.append("imagem", imagem);
    }

    especificacoesExtras.forEach(({ key, value }) => {
      if (key.trim()) {
        formData.append(`especificacoes[${key}]`, value);
      }
    });

    try {
      if (produto?._id) {
        console.log("===> Atualizando produto...");
        await onUpdate(produto._id, formData);
      } else {
        console.log("===> Criando novo produto...");
        await onCreate(formData);
      }

      onClose();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto.");
    }
  };

  return (
    <div className="fixed inset-0 bg-zinc-900/50 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-zinc-800 p-6 rounded-md border border-amber-400/50 w-full max-w-lg overflow-auto max-h-[95vh]">
        <h2 className="text-xl font-bold text-white mb-4">
          {produto?._id ? "Editar Produto" : "Adicionar Produto"}
        </h2>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white border border-amber-400/50"
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white border border-amber-400/50"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagem(e.target.files?.[0] || null)}
          className="mb-4 py-2 px-4 border border-amber-400/50 text-white cursor-pointer rounded"
        />

        <input
          type="text"
          placeholder="Nota (0 a 5)"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white border border-amber-400/50"
        />
        {nota !== "" &&
          (!/^\d+(\.\d+)?$/.test(nota) ||
            Number(nota) < 0 ||
            Number(nota) > 5) && (
            <p className="text-red-400 text-sm mb-3">
              A nota deve ser um número entre 0 e 5.
            </p>
          )}

        <input
          type="text"
          placeholder="Preço Base"
          value={precoBase}
          onChange={(e) => setPrecoBase(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white border border-amber-400/50"
        />
        {isNaN(Number(precoBase)) && precoBase !== "" && (
          <p className="text-red-400 text-sm mb-3">
            Digite um número válido para o preço base.
          </p>
        )}

        <input
          type="text"
          placeholder="Preço Promocional"
          value={precoPromocional}
          onChange={(e) => setPrecoPromocional(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white border border-amber-400/50"
        />
        {isNaN(Number(precoPromocional)) && precoPromocional !== "" && (
          <p className="text-red-400 text-sm mb-4">
            Digite um número válido para o preço promocional.
          </p>
        )}

        <input
          type="text"
          placeholder="Contato: Ex: https://wa.me/999999999"
          value={contato}
          onChange={(e) => setContato(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white border border-amber-400/50"
        />

        <input
          type="text"
          placeholder="Destaque"
          value={destaque}
          onChange={(e) => setDestaque(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white border border-amber-400/50"
        />

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-semibold">Especificações Extras</h3>
            <button
              onClick={addExtra}
              className="text-sm text-amber-400 cursor-pointer"
            >
              <IconPlus/>
            </button>
          </div>
          {especificacoesExtras.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Chave"
                value={item.key}
                onChange={(e) => updateExtra(index, "key", e.target.value)}
                className="flex-1 p-2 rounded bg-zinc-700 text-white border border-amber-400/50"
              />
              <input
                type="text"
                placeholder="Valor"
                value={item.value}
                onChange={(e) => updateExtra(index, "value", e.target.value)}
                className="flex-1 p-2 rounded bg-zinc-700 text-white border border-amber-400/50"
              />
              <button
                onClick={() => removeExtra(index)}
                className="text-red-400 cursor-pointer"
              >
                <IconMinus/>
              </button>
            </div>
          ))}
        </div>

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
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
