"use client"

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useCheckAuth() {
  const { accessToken, refreshToken } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!accessToken) {
        console.log("accessToken não encontrado, tentando refresh...")
        try {
          // Try to refresh the token
          const newToken = await refreshToken();
          if (!newToken) {
            console.log("Refresh falhou, redirecionando para login")
            router.push("/qg"); // redireciona se não estiver logado
          }
        } catch (error) {
          console.log("Erro ao tentar refresh, redirecionando para login")
          router.push("/qg"); // redireciona se não estiver logado
        }
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [accessToken, refreshToken, router]);

  return !!accessToken && !isChecking; // retorna true se estiver logado e não estiver verificando
}
