"use client";

import { useState, useEffect, useCallback } from "react";
import { axiosInstance, setAccessToken } from "@/api/Config";
import { Admin } from "@/types/admin";

export function useAuth() {
  const [accessToken, _setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<Admin | null>(null);

  // Atualiza state + axios config
  function handleSetAccessToken(token: string | null) {
    _setAccessToken(token);
    if (token) {
      setAccessToken(token); // atualiza axiosInstance
    } else {
      setAccessToken(""); // limpa headers
    }
  }

  // Login
  async function login(username: string, senha: string) {
    try {
      const res = await axiosInstance.post("/admins/login", { username, senha });
      handleSetAccessToken(res.data.accessToken);
      setUser(res.data.user);
      // Redirect to dashboard after successful login
      window.location.href = "/qg/dashboard";
    } catch (err: unknown) {
      const errorMessage = err instanceof Error && 'response' in err 
        ? (err as { response?: { data?: { erro?: string } } })?.response?.data?.erro 
        : undefined;
      throw new Error(errorMessage || "Erro ao fazer login");
    }
  }

  // Logout
  async function logout() {
    try {
      await axiosInstance.post("/admins/logout", {}, { withCredentials: true });
    } finally {
      handleSetAccessToken(null);
      setUser(null);
    }
  }

  // Refresh manual
  const refreshToken = useCallback(async () => {
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
    }
  }, []);

  // Try to refresh token on component mount if no access token
  useEffect(() => {
    if (!accessToken) {
      refreshToken().catch(() => {
        // If refresh fails, user is not logged in
        console.log("Refresh token failed, user not logged in");
      });
    }
  }, [refreshToken]); // Removed accessToken from dependencies to prevent infinite loop

  // Interceptor do axios (já evita duplicar lógica com config.ts)
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
