"use client";

import { useState } from "react";
import ProductItem from "./ProductItem";
import type { Produto } from "@/types/product";
import { BlurFade } from "@/components/magicui/blur-fade";

interface AllProductsProps {
  produtos: Produto[] | null;
}

export default function AllProducts({ produtos }: AllProductsProps) {
  const [mostrarTodos, setMostrarTodos] = useState(false);

  const produtosArray = produtos ?? []; // se for null, vira []

  const produtosVisiveis = mostrarTodos
    ? produtosArray
    : produtosArray.slice(0, 8);

  return (
    <section>
      <h1 className="text-2xl font-bold bg-zinc-900 border-b border-amber-400/50 p-2.5 text-white">
        Todos os Produtos
      </h1>
      <div className="py-10 px-5 sm:px-0">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 min-h-[200px]">
            {produtosArray.length === 0 ? (
              <div className="col-span-full flex items-center justify-center p-10 text-amber-400/70 text-xl font-semibold">
                Nenhum produto encontrado.
              </div>
            ) : (
              produtosVisiveis.map((produto, idx) => (
                <BlurFade key={produto._id} delay={0.25 + idx * 0.05} inView>
                  <ProductItem key={produto._id} produto={produto} />
                </BlurFade>
              ))
            )}
          </div>
        </div>

        {!mostrarTodos && produtosArray.length > 8 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setMostrarTodos(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
            >
              Mostrar Tudo
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
