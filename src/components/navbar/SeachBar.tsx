"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Produto } from "@/types/product";

interface SearchBarProps {
  produtos: Produto[] | null;
}

export default function SearchBar({ produtos }: SearchBarProps) {
  const [busca, setBusca] = useState("");
  const [sugestoes, setSugestoes] = useState<Produto[]>([]);

  useEffect(() => {
    if (!produtos || busca.trim() === "") {
      setSugestoes([]);
      return;
    }

    const resultado = produtos.filter(
      (produto) =>
        produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
        produto.especificacoes.destaque
          .toLowerCase()
          .includes(busca.toLowerCase())
    );

    setSugestoes(resultado.slice(0, 5));
  }, [busca, produtos]);

  const exibirSugestoes = busca.trim().length > 0;

  return (
    <div className="relative flex justify-center items-center gap-4">
      <input
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="w-full border border-amber-400/50 outline-0 focus:ring focus:ring-amber-400 rounded-md px-4 py-1.5 shadow-sm placeholder-amber-400 text-white text-sm transition duration-200 bg-zinc-900"
        placeholder="Pesquise pelo seu produto"
      />

      {exibirSugestoes && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-zinc-900 border border-amber-400/50 rounded-md shadow-lg z-40">
          {produtos && sugestoes.length > 0 ? (
            sugestoes.map((produto) => (
              <Link
                key={produto._id}
                href={`/loja/produto/${produto._id}`}
                className="flex px-4 py-2 text-sm text-amber-400 hover:bg-zinc-800 cursor-pointer rounded-md"
              >
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 relative flex-shrink-0">
                    <Image
                      src={produto.imagem}
                      alt={produto.nome}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-semibold text-amber-400 truncate">
                      {produto.nome}
                    </h3>
                    <h4 className="text-xs text-gray-300 truncate">
                      {produto.especificacoes.destaque}
                    </h4>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-sm text-white px-4 py-2">
              Nenhum produto encontrado.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
