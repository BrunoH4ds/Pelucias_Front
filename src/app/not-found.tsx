import { IconError404 } from "@tabler/icons-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col md:flex-row gap-5 md:gap-20 justify-center items-center h-screen bg-zinc-950 backdrop-blur-md text-white px-6 text-center">
      <IconError404 size={200} stroke={0.5} className="text-amber-400 opacity-80" />
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-2">Página não encontrada</h1>
        <p className="text-zinc-400 max-w-md">
          O conteúdo que você está procurando não foi encontrado. Verifique a
          URL ou volte à página inicial.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md transition"
        >
          Voltar para a home
        </Link>
      </div>
    </div>
  );
}
