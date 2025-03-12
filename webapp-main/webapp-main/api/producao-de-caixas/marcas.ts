import { Marca } from "@/models/producao-de-caixas/Marca";
import api from "../api";

export const getMarcas = async (): Promise<Marca> => {
  const response = await api.get("/box-production/brand")

  // @ts-ignore
  return response; 
}

export const createMarca = async (data: any, p0?: { onSuccess: () => void; }) => {
  const response = await api.post("/box-production/brand", data);

  return response;
}

export const deleteMarca= async (id: any, p0?: { onSuccess: () => void; }) => {
  const response = await api.post(`/box-production/delete/brand/${id}`);

  return response;
}

export const editMarca= async (data: any, p0?: { onSuccess: () => void; }) => {
  const response = await api.post(`/box-production/put/brand/${data.id}`, data);

  return response;
}