// api/config.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

let accessToken: string | null = null; // guarda token em memória

// Recupera token do localStorage na inicialização
if (typeof window !== 'undefined') {
  const storedToken = localStorage.getItem('accessToken');
  if (storedToken) {
    accessToken = storedToken;
  }
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-api-key": API_KEY,
    "Content-Type": "application/json",
    ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
  },
  withCredentials: true, // envia cookie do refresh
});

// Função única para setar novo access token
export function setAccessToken(token: string) {
  accessToken = token;
  axiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;
}

// Interceptor para renovar token se expirar
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // pede novo access token usando refresh no cookie
        const res = await axios.post(
          `${BASE_URL}/admins/refresh`,
          {},
          { withCredentials: true }
        );
        const newToken = res.data.accessToken;

        // atualiza axios com o novo token
        setAccessToken(newToken);

        // refaz request original
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Erro ao renovar token:", err);
        window.location.href = "/qg"; // redireciona pro login
      }
    }

    return Promise.reject(error);
  }
);

function getAuthHeaders(token?: string) {
  return {
    headers: {
      Authorization: `Bearer ${token || accessToken}`,
    },
  };
}

export { axiosInstance, BASE_URL, getAuthHeaders };
