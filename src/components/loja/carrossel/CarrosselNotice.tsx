"use client";

import { useState } from "react";
import type { Noticia } from "@/types/notice"; // Assumindo que você tenha um tipo Noticia definido
import Image from "next/image";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface CarrosselNoticiasProps {
  noticias: Noticia[];
}

export default function CarrosselNoticias({
  noticias,
}: CarrosselNoticiasProps) {
  const [index, setIndex] = useState(0);
  const total = noticias?.length ?? 0;

  const anterior = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const proximo = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  return (
    <section
      className="w-full"
      style={{ height: "calc(100vh - 174px)" }} // 64px = altura da navbar
    >
      <div className="relative w-full h-full">
        <div className="relative w-full h-full overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out w-full h-full"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {noticias.map((noticia) => (
              <div key={noticia._id} className="min-w-full h-full relative">
                <Image
                  src={noticia.imagemUrl}
                  alt={noticia.titulo}
                  fill
                  className="object-cover rounded-md backdrop-blur-md"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white rounded-md">
                  <h3 className="text-3xl font-bold">{noticia.titulo}</h3>
                  <p className="text-lg">{noticia.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {noticias.length > 1 && (
          <>
            {/* Botões */}

            <button
              onClick={anterior}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow px-2 py-1 rounded-full hover:bg-blue-700 hover:text-white cursor-pointer"
              aria-label="Notícia anterior"
            >
              <IconChevronLeft size={24} />
            </button>

            <button
              onClick={proximo}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow px-2 py-1 rounded-full hover:bg-blue-700 hover:text-white cursor-pointer"
              aria-label="Próxima notícia"
            >
              <IconChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
