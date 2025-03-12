
import { Cartonagem } from "@/models/producao-de-caixas/Cartonagem";
import api from "../api";


export const getCartonagens = async (): Promise<Cartonagem> => {
  const response = await api.get("/box-production/cartoning")

  return response.data;
}

export const createCartonagens = async (data: any, p0?: { onSuccess: () => void; }) => {
  const response = await api.post("/box-production/cartoning", data);

  return response;
}

export const deleteCartonagens = async (data: any, p0?: { onSuccess: () => void; }) => {
    const response = await api.delete("/box-production/cartoning", data);
  
    return response;
}

export const editCartonagens= async (data: any, p0?: { onSuccess: () => void; }) => {
  const response = await api.put("/box-production/cartoning", data);

  return response;
}