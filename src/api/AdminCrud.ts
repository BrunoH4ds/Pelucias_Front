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

export async function createAdmin(data: { username: string; senha: string }, token: string): Promise<Admin | null> {
  try {
    const res = await axiosInstance.post("/admins", data,getAuthHeaders(token));
    return res.data;
  } catch (error) {
    console.error("Erro ao criar administrador:", error);
    return null;
  }
}

export async function updateAdmin(id: string, data: { username?: string; senha?: string }, token: string): Promise<Admin | null> {
  try {
    const res = await axiosInstance.put(`/admins/${id}`, data, getAuthHeaders(token));
    return res.data;
  } catch (error) {
    console.error("Erro ao atualizar administrador:", error);
    return null;
  }
}

export async function deleteAdmin(id: string, token: string): Promise<boolean> {
  try {
    await axiosInstance.delete(`/admins/${id}`, getAuthHeaders(token));
    return true;
  } catch (error) {
    console.error("Erro ao deletar administrador:", error);
    return false;
  }
}

export async function loginAdmin(data: { username: string; senha: string }): Promise<{ accessToken: string; user: Admin }> {
  try {
    const res = await axiosInstance.post("/admins/login", data);
    return res.data; // contém { accessToken, user }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error && 'response' in error 
      ? (error as { response?: { data?: { erro?: string } } })?.response?.data?.erro 
      : undefined;
    throw new Error(errorMessage || "Erro ao fazer login");
  }
}

