// components/qg/login.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "../../../api/AdminCrud";
import { IconShieldLock } from "@tabler/icons-react";
import { AnimatedGridPattern } from "../magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    try {
      await loginAdmin({ username, senha });
      router.push("/qg/dashboard");
    } catch (error) {
      console.error("Erro no login:", error);
      setErro("Usuário ou senha inválidos");
    }
  }

  return (
    <div
      className="relative w-full overflow-hidden py-10 flex items-center justify-center bg-zinc-900 p-10"
      style={{ height: "calc(100vh - 94px)" }}
    >
      <AnimatedGridPattern
        numSquares={60}
        maxOpacity={0.5}
        duration={2}
        repeatDelay={1}
        className={cn(
          "absolute inset-0 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] opacity-100 skew-y-12"
        )}
      />

      <div className="flex flex-col md:flex-row items-center justify-around w-full gap-6 z-10">
        {/* Logo */}
        <div className="w-56 h-56 md:w-96 md:h-96 flex-shrink-0 flex items-center justify-center">
          <IconShieldLock className="text-amber-400" size={300} />
        </div>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full md:w-1/2"
        >
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuário"
            className="border border-zinc-600 bg-zinc-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            required
          />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            className="border border-zinc-600 bg-zinc-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            required
          />

          {erro && <p className="text-red-500 text-sm">{erro}</p>}

          <button
            type="submit"
            className="border border-amber-400/50 text-white px-4 py-2 rounded hover:bg-zinc-800 transition cursor-pointer"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
