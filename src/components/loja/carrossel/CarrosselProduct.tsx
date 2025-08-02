"use client";

import { useRef, useState, useEffect } from "react";
import type { Produto } from "@/types/product";
import ProductItem from "../product/ProductItem";
import {
  IconChevronLeft,
  IconChevronRight,
  IconRosetteDiscount,
  IconStar,
  IconTrophy,
} from "@tabler/icons-react";
import { BlurFade } from "@/components/magicui/blur-fade";

function embaralharArray<T>(array: T[]): T[] {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

interface CarrosselProdutosProps {
  produtos: Produto[] | null;
}

export default function CarrosselProdutos({
  produtos,
}: CarrosselProdutosProps) {
  const carrosselRef = useRef<HTMLDivElement>(null);
  const [produtosAleatorios, setProdutosAleatorios] = useState<Produto[]>([]);

  useEffect(() => {
    if (!produtos || produtos.length === 0) {
      setProdutosAleatorios([]);
      return;
    }
    const embaralhados = embaralharArray(produtos).slice(0, 6);
    setProdutosAleatorios(embaralhados);
  }, [produtos]);

  const scrollLeft = () => {
    carrosselRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    carrosselRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className="relative bg-zinc-900/75 backdrop-blur-md border-y border-amber-400/50 overflow-hidden">
      <h2 className="text-2xl p-2.5 bg-zinc-900 font-bold text-white relative z-10 border-b border-amber-400/50">
        Destaques
      </h2>

      {/* Ícones decorativos fixos */}
      <IconStar
        size={400}
        stroke={0.8}
        className="text-amber-400 absolute rotate-45 -top-24 -right-32 opacity-5 pointer-events-none"
      />
      <IconTrophy
        size={450}
        stroke={0.8}
        className="text-amber-400 absolute rotate-45 -bottom-36 -left-36 opacity-5 pointer-events-none"
      />
      <IconRosetteDiscount
        size={650}
        stroke={0.8}
        className="hidden text-amber-400 md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 opacity-5 pointer-events-none"
      />

      <div className="relative z-10">
        {produtosAleatorios.length > 0 && (
          <>
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow px-2 py-1 rounded-full hover:bg-blue-700 hover:text-white cursor-pointer"
              aria-label="Scroll Left"
            >
              <IconChevronLeft />
            </button>

            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow px-2 py-1 rounded-full hover:bg-blue-700 hover:text-white cursor-pointer"
              aria-label="Scroll Right"
            >
              <IconChevronRight />
            </button>
          </>
        )}

        <div
          ref={carrosselRef}
          className="flex overflow-x-hidden gap-5 scroll-smooth snap-x snap-mandatory py-10 items-center justify-center"
        >
          {produtosAleatorios.length === 0 ? (
            <div className="text-amber-400/70 text-xl font-semibold">
              Nenhum produto encontrado.
            </div>
          ) : (
            produtosAleatorios.map((produto, idx) => (
              <div
                key={produto._id}
                className="snap-center shrink-0 w-[280px] md:w-[300px]"
              >
                <BlurFade key={produto._id} delay={0.25 + idx * 0.05} inView>
                  <ProductItem produto={produto} SemScale />
                </BlurFade>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
