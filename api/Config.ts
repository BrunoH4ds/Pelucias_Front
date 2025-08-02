// api/config.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-api-key": API_KEY,
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

function getAuthHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export { axiosInstance, BASE_URL, getAuthHeaders };
