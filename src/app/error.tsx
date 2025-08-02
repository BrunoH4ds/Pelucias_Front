"use client";

import { IconAlertTriangle } from "@tabler/icons-react";

export default function Error({ error }: { error: Error }) {
  console.error(error);

  return (
    <div className="flex flex-col gap-5 md:flex-row md:gap-20 items-center justify-center h-screen bg-zinc-950/50 text-white px-4 text-center transition-all duration-300">
      <IconAlertTriangle
        size={200}
        stroke={0.8}
        className="text-amber-400 mb-4 animate-pulse"
      />
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold mb-2 text-red-500">
          Oops! Algo deu errado.
        </h2>

        <p className="text-zinc-300 max-w-md mb-6">
          {error.message || "Erro desconhecido"}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition cursor-pointer"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
