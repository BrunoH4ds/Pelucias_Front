import { axiosInstance, getAuthHeaders } from "./Config";
import { Noticia } from "@/types/notice";

export async function getAllNoticias(): Promise<Noticia[] | null> {
  try {
    const res = await axiosInstance.get("/noticias");
    return res.data;
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return null;
  }
}

export async function getNoticiaById(id: string): Promise<Noticia | null> {
  try {
    const res = await axiosInstance.get(`/noticias/${id}`);
    return res.data;
  } catch (error) {
    console.error("Erro ao buscar notícia:", error);
    return null;
  }
}

export async function createNoticia(
  data: FormData,
  token: string
): Promise<Noticia | null> {
  try {
    const res = await axiosInstance.post("/noticias/", data, {
      ...getAuthHeaders(token),
      headers: {
        ...getAuthHeaders(token).headers,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Erro ao criar notícia:", error);
    return null;
  }
}

export async function updateNoticia(
  id: string,
  token: string,
  data: FormData | object,
  hasImage: boolean = false
): Promise<Noticia | null> {
  try {
    const headers = {
      ...getAuthHeaders(token).headers,
      ...(hasImage ? {} : { "Content-Type": "application/json" }),
    };

    const res = await axiosInstance.put(`/noticias/${id}`, data, {
      headers,
    });

    return res.data;
  } catch (error) {
    console.error("Erro ao atualizar notícia:", error);
    return null;
  }
}

export async function deleteNoticia(id: string, token: string): Promise<boolean> {
  try {
    await axiosInstance.delete(`/noticias/${id}`, getAuthHeaders(token));
    return true;
  } catch (error) {
    console.error("Erro ao deletar notícia:", error);
    return false;
  }
}

