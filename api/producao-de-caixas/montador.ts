import { Montador } from "@/models/producao-de-caixas/Montadores";
import api from "../api";

export const getMontadores = async (): Promise<Montador> => {
  const response = await api.get("/box-production/assembler");

  return response;
};

export const createMontadores = async (
  data: any,
  p0?: { onSuccess: () => void }
) => {
  data.birthdate = new Date(data.birthdate).toISOString();
  const response = await api.post("/box-production/assembler", data);

  return response;
};

export const deleteMontadores = async (
  data: any,
  p0?: { onSuccess: () => void }
) => {
  const response = await api.delete("/box-production/assembler", data);

  return response;
};

export const editMontadores = async (
  data: any,
  p0?: { onSuccess: () => void }
) => {
  data.birthdate = new Date(data.birthdate).toISOString();
  const response = await api.put("/box-production/assembler", data);

  return response;
};
