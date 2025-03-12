import axios from "../api";

export async function getPayments() {
  const { data } = await axios.get("/payments");

  if (!data.success) {
    return [];
  }

  return data.data;
}

export async function getNewPaymentData() {
  const { data } = await axios.get("/provider/prestador");

  if (!data.success) {
    return {
      suppliers: [],
    };
  }

  return {
    suppliers: data.data,
  };
}

export async function addPayment(data: any) {
  await axios.post("/payments", {
    title: data.title,
    value: Number(data.value),
    due_date: new Date(data.due_date).toISOString(),
    supplier_id: Number(data.supplier_id),
  });
}

export async function editPayment(paymentId: number, data: any) {
  await axios.put(`/payments/${paymentId}`, {
    title: data.title,
    value: Number(data.value),
    due_date: new Date(data.due_date).toISOString(),
    supplier_id: Number(data.supplier_id),
  });
}

export async function approvePayment(id: string) {
  await axios.put(`/payments/${id}/approve`);
}

export async function rejectPayment(id: string) {
  await axios.put(`/payments/${id}/reject`);
}

export async function payPayment(id: string) {
  await axios.put(`/payments/${id}/pay`);
}

export async function cancelPayment(id: string) {
  await axios.put(`/payments/${id}/cancel`);
}

export async function deletePayment(id: string) {
  await axios.delete(`/payments/${id}`);
}

export async function listFiles(paymentId: number) {
  const { data } = await axios.get(`/payments/${paymentId}/files`);

  if (!data.success) {
    return [];
  }

  return data.data;
}

export async function uploadFile(paymentId: number, formData: FormData) {
  await axios.post(`/payments/${paymentId}/files`, formData);
}

export async function deleteFile(fileId: number) {
  await axios.delete(`/payments/files/${fileId}`);
}

export function downloadFileURL(fileId: number) {
  const baseURL = axios.defaults.baseURL?.endsWith("/")
    ? axios.defaults.baseURL
    : axios.defaults.baseURL + "/";
  return baseURL + `payments/files/${fileId}`;
}
