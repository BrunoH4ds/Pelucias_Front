import { axiosInstance, getAuthHeaders } from "./Config";
import { Produto } from "@/types/product";

export async function getAllProdutos(): Promise<Produto[] | null> {
  try {
    const res = await axiosInstance.get("/produtos");
    return res.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return null;
  }
}

export async function getProdutoById(id: string): Promise<Produto | null> {
  try {
    const res = await axiosInstance.get(`/produtos/${id}`);
    return res.data;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }
}

export async function createProduto(
  data: FormData,
  token: string
): Promise<any> {
  try {
    const res = await axiosInstance.post("/produtos", data, {
      ...getAuthHeaders(token),
      headers: {
        ...getAuthHeaders(token).headers,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return null;
  }
}

export async function updateProduto(
  id: string,
  data: FormData,
  token: string
): Promise<any> {
  try {
    const res = await axiosInstance.put(`/produtos/${id}`, data, {
      ...getAuthHeaders(token),
      headers: {
        ...getAuthHeaders(token).headers,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return null;
  }
}

export async function deleteProduto(id: string, token: string): Promise<any> {
  try {
    const res = await axiosInstance.delete(`/produtos/${id}`, getAuthHeaders(token));
    return res.data;
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return null;
  }
}
