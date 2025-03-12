import { Categorie } from "@/models/compras-e-orcamentos/Categorie";
import api from "../api";
import { ResponseCategorie } from "@/models/compras-e-orcamentos/responses/ResponseCategorie";

export const getCategories = async (): Promise<ResponseCategorie> => {
  const response = await api.get("/buyings/categories")

  return response.data;
}

export const bulkDeleteCategories = async (ids: number[]) => {
  await api.delete("/buyings/category", { data: { ids } });

  return ids;
}

export const deleteCategorie = async (id: number) => {
  await api.delete(`/buyings/category/${id}`);

  return id;
}

export const createCategorie = async (data: any, p0?: { onSuccess: () => void; }) => {
  const response = await api.post("/buyings/category", data);

  return response;
}

export const updateCategorie = async (id: number, data: any) => {
  const response = await api.put(`/buyings/category/${id}`, data);

  return response;
}