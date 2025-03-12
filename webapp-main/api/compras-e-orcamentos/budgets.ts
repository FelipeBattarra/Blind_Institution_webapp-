import api from "../api";
import { ResponseBudgets } from "@/models/compras-e-orcamentos/responses/ResponseBudgets";

export const getBudgets = async (): Promise<ResponseBudgets> => {
  const response = await api.get("/buyings/buying-requests")

  return response.data.data;
}

export const bulkDeleteBudgets = async (ids: number[]) => {
  await api.delete("/buyings/category", { data: { ids } });

  return ids;
}

export const deleteBudget = async (id: number) => {
  await api.delete(`/buyings/category/${id}`);

  return id;
}

export const createBudget = async (data: any, p0?: { onSuccess: () => void; }) => {
  const response = await api.post("/buyings/category", data);

  return response;
}

export const updateBudget = async (id: number, data: any) => {
  const response = await api.put(`/buyings/category/${id}`, data);

  return response;
}