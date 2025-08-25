import { axiosInstance, getAuthHeaders } from "./Config";
import { Admin } from "@/types/admin"; // define esse tipo com `username`, `_id`, etc.

export async function getAllAdmins(token: string): Promise<Admin[] | null> {
  try {
    const res = await axiosInstance.get("/admins", getAuthHeaders(token) )
    return res.data;
  } catch (error) {
    console.error("Erro ao buscar administradores:", error);
    return null;
  }
}

export async function getAdminByUsername(username: string, token: string): Promise<Admin | null> {
  try {
    const res = await axiosInstance.get(`/admins/${username}`,getAuthHeaders(token));
    return res.data;
  } catch (error) {
    console.error("Erro ao buscar administrador:", error);
    return null;
  }
}

export async function createAdmin(data: { username: string; senha: string }, token: string): Promise<any> {
  try {
    const res = await axiosInstance.post("/admins", data,getAuthHeaders(token));
    return res.data;
  } catch (error) {
    console.error("Erro ao criar administrador:", error);
    return null;
  }
}

export async function updateAdmin(id: string, data: { username?: string; senha?: string }, token: string): Promise<any> {
  try {
    const res = await axiosInstance.put(`/admins/${id}`, data, getAuthHeaders(token));
    return res.data;
  } catch (error) {
    console.error("Erro ao atualizar administrador:", error);
    return null;
  }
}

export async function deleteAdmin(id: string, token: string): Promise<any> {
  try {
    const res = await axiosInstance.delete(`/admins/${id}`, getAuthHeaders(token));
    return res.data;
  } catch (error) {
    console.error("Erro ao deletar administrador:", error);
    return null;
  }
}

export async function loginAdmin(data: { username: string; senha: string }) {
  try {
    const res = await axiosInstance.post("/admins/login", data);
    return res.data; // contém { accessToken, user }
  } catch (error: any) {
    throw new Error(error?.response?.data?.erro || "Erro ao fazer login");
  }
}

