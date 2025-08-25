"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { axiosInstance, setAccessToken } from "@/api/Config";
import { Admin } from "@/types/admin";

export function useAuth() {
  const [accessToken, _setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<Admin | null>(null);

  // Evita refresh concorrente
  const isRefreshing = useRef(false);
  const refreshPromise = useRef<Promise<string | null> | null>(null);

  function handleSetAccessToken(token: string | null) {
    _setAccessToken(token);
    if (token) {
      setAccessToken(token);
    } else {
      setAccessToken("");
    }
  }

  async function login(username: string, senha: string) {
    try {
      const res = await axiosInstance.post("/admins/login", { username, senha });
      handleSetAccessToken(res.data.accessToken);
      setUser(res.data.user);
      window.location.href = "/qg/dashboard";
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error && "response" in err
          ? (err as { response?: { data?: { erro?: string } } })?.response?.data?.erro
          : undefined;
      throw new Error(errorMessage || "Erro ao fazer login");
    }
  }

  async function logout() {
    try {
      await axiosInstance.post("/admins/logout", {}, { withCredentials: true });
    } finally {
      handleSetAccessToken(null);
      setUser(null);
    }
  }

  const refreshToken = useCallback(async (): Promise<string | null> => {
    if (isRefreshing.current && refreshPromise.current) {
      return refreshPromise.current; // retorna a mesma promise se já estiver rodando
    }

    isRefreshing.current = true;
    refreshPromise.current = (async () => {
      try {
        const res = await axiosInstance.post(
          "/admins/refresh",
          {},
          { withCredentials: true }
        );
        handleSetAccessToken(res.data.accessToken);
        return res.data.accessToken;
      } catch {
        handleSetAccessToken(null);
        setUser(null);
        return null;
      } finally {
        isRefreshing.current = false;
        refreshPromise.current = null;
      }
    })();

    return refreshPromise.current;
  }, []);

  // Só tenta refresh 1x no mount, nunca em loop
  useEffect(() => {
    const isLoginPage = window.location.pathname === "/qg";
    if (!isLoginPage) {
      refreshToken().catch(() => {
        console.log("Refresh token failed, user not logged in");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // roda só uma vez no mount

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const newToken = await refreshToken();
          if (newToken) {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, [refreshToken]);

  return { accessToken, user, login, logout, refreshToken };
}
