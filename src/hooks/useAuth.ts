"use client";

import { useState, useEffect } from "react";
import { axiosInstance, setAccessToken } from "@/api/Config";

export function useAuth() {
  const [accessToken, _setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

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
    } catch (err: any) {
      throw new Error(err?.response?.data?.erro || "Erro ao fazer login");
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
  async function refreshToken() {
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
  }

  // Try to refresh token on component mount if no access token
  useEffect(() => {
    if (!accessToken) {
      refreshToken().catch(() => {
        // If refresh fails, user is not logged in
        console.log("Refresh token failed, user not logged in");
      });
    }
  }, []);

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
  }, []);

  return { accessToken, user, login, logout, refreshToken };
}
