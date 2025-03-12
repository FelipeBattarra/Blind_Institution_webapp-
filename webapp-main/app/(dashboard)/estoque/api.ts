import {
  MeasurementUnitEntity,
  CreateProductRequest,
  UpdateProductRequest,
  UpdateCategoryRequest,
  CreateCategoryRequest,
  CreateStorageFrontRequest,
  UpdateStorageFrontRequest,
  UpdateStorageHistoryRequest,
  CreateStorageHistoryRequest,
  CategoryEntity,
  UploadImageRequest
} from '@/types/estoqueTypes';

const port = 3000;
const domain = "http://localhost";
// const baseLink = `${domain}:${port}`;
const baseLink = `https://sfitc-api.unifacef.com.br/`;
const headers = {
  Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJpZFwiOjMsXCJuYW1lXCI6XCJzdXBlciB1c2VyXCIsXCJlbWFpbFwiOlwic3VwZXJ1c2VyQGVtYWlsLmNvbVwiLFwicm9sZXNcIjpbMV0sXCJwZXJtaXNzaW9uc1wiOltdfSJ9.lZ-6TDVr-aL6_54Jze15OL8L1e6kyBn3Y1dDl3LFjic",
  "Content-Type": "application/json"
}
const headersUpload = {
  Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJpZFwiOjMsXCJuYW1lXCI6XCJzdXBlciB1c2VyXCIsXCJlbWFpbFwiOlwic3VwZXJ1c2VyQGVtYWlsLmNvbVwiLFwicm9sZXNcIjpbMV0sXCJwZXJtaXNzaW9uc1wiOltdfSJ9.lZ-6TDVr-aL6_54Jze15OL8L1e6kyBn3Y1dDl3LFjic",
}

// Measurement Units Functions
export async function getMeasurementUnits(): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/measurementUnit`,
    {
      method: "GET",
      headers: headers  
    }
  )
  .then(res => res.json());

  return result;
}

// Storage Front Functions
export async function getStorageFronts(): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/storageFront`,
    {
      method: "GET",
      headers: headers
    }
  )
  .then(res => res.json());

  return result;
}

export async function getStorageFrontById(id: string): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/storageFront/${id}`,
    {
      method: "GET",
      headers: headers
    }
  )
  .then(res => res.json());

  return result;
}

export async function insertStorageFront(newStorageFront: CreateStorageFrontRequest): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/storageFront`,
    {
      method: "POST",
      body: JSON.stringify(newStorageFront),
      mode: "cors",
      headers: headers
    }
  )
  .then(res => res.json());

  return result;
}

export async function deleteStorageFrontById(id: string): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/storageFront/${id}`,
    {
      method: "DELETE",
      headers: headers
    }
  )
  .then(res => res.json());

  return result;
}

export async function updateStorageFrontById(id: string, updatedStorageFront: UpdateStorageFrontRequest): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/storageFront/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(updatedStorageFront),
      headers: headers
    }
  )
  .then(res => res.json());

  return result;
}

// Storage Histories Functions
export async function getStorageHistories(): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/storage_history`,
    {
      method: "GET",
      headers: headers
    }
  )
  .then(res => res.json());

  return result;
}

export async function getStorageHistoryById(id: string): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/storage_history/${id}`,
    {
      method: "GET",
      headers: headers
    }
  )
  .then(res => res.json());

  return result;
}

export async function insertStorageHistory(newStorageHistory: CreateStorageHistoryRequest): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/storage_history`,
    {
      method: "POST",
      body: JSON.stringify(newStorageHistory),
      headers: headers
    }
  )
  .then(res => res.json());

  return result;
}

export async function deleteStorageHistoryById(id: string): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/storage_history/${id}`,
    {
      method: "DELETE",
      headers: headers
    }
  )
  .then(res => res.json());

  return result;
}

export async function updateStorageHistoryById(id: string, updatedStorageHistory: UpdateStorageHistoryRequest): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/storage_history/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(updatedStorageHistory),
      headers: headers
    }
  )
  .then(res => res.json());

  return result;
}

// Categories Functions
export async function getCategories(): Promise<{ data: CategoryEntity[] }> {
  const result = await fetch(`${baseLink}/storage/category`, {
    method: "GET",
    headers: headers,
  }).then((res) => res.json());

  return result;
}
export async function getCategoryById(id: string): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/category/${id}`,
    {
      method: "GET",
      headers: headers
    }
  )
  .then(res => res.json());

  return result;
}

export async function insertCategory(newCategory: CreateCategoryRequest): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/category`,
    {
      method: "POST",
      body: JSON.stringify(newCategory),
      headers: headers
    }
  )
  .then(res => res.json());

  return result;
}

export async function deleteCategoryById(id: string): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/category/${id}`,
    {
      method: "DELETE",
      headers: headers
    }
  )

  return result;
}

export async function updateCategoryById(id: string, updatedCategory: UpdateCategoryRequest): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/category/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(updatedCategory),
      headers: headers
    }
  )
  .then(res => res.json());

  return result;
}

// Products Functions
export async function getProducts(): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/product`,
    {
      method: "GET",
      headers: headers
    }
  )
  .then(res => res.json());

  return result;
}

export async function getProductById(id: string): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/product/${id}`,
    {
      method: "GET",
      headers: headers
    }
  )
  .then(res => res.json());

  return result;
}

export async function uploadImage(newImage: UploadImageRequest): Promise<any> {
  if (!newImage.file) {
    throw new Error("Nenhum arquivo foi fornecido.");
  }

  const blob = new Blob([newImage.file], { type: newImage.file.type });

  const formData = new FormData();

  formData.append("image", blob, newImage.file.name);

  const result: any = await fetch(`${baseLink}/upload`, {
    method: "POST",
    body: formData,
    headers: {
      ...headersUpload
    },
  }).then(res => res.json());

  return result;
}

export async function fetchImage(filename: string): Promise<File | null> {
  try {
    const response = await fetch(`${baseLink}/uploads/${filename}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar a imagem.");
    }

    const blob = await response.blob();
    const file = new File([blob], filename, { type: blob.type });
    return file;
  } catch (error) {
    console.error("Erro ao buscar a imagem como arquivo:", error);
    return null;
  }
}

export async function insertProduct(newProduct: CreateProductRequest): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/product`,
    {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: headers
    }
  )
  .then(res => res.json());

  return result;
}

export async function deleteProductById(id: string): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/product/${id}`,
    {
      method: "DELETE",
      headers: headers
    }
  )
  .then(res => res.json());

  return result;
}

export async function updateProductById(id: string, updatedProduct: UpdateProductRequest): Promise<any> {
  const result: any = await fetch(
    `${baseLink}/storage/product/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(updatedProduct),
      headers: headers
    }
  )
  .then(res => res.json());

  return result;
}


export async function movimentProduct(id: string, quantity: number): Promise<any> {
  try {
    const headers = {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJpZFwiOjMsXCJuYW1lXCI6XCJzdXBlciB1c2VyXCIsXCJlbWFpbFwiOlwic3VwZXJ1c2VyQGVtYWlsLmNvbVwiLFwicm9sZXNcIjpbMV19In0.uxp5Q6rp7AsRcLjMjkM0rl41hPNVM0JS1Q92S2dWSkY",
      "Content-Type": "application/json",
    };

    const result = await fetch(`${baseLink}/storage/product/movement/${id}`, {
      method: "POST",
      headers, // Inclui os headers diretamente
      body: JSON.stringify({ quantity }), // Envia apenas a quantidade
    });

    if (!result.ok) {
      const errorResponse = await result.json();
      console.error("Erro na API:", errorResponse);
      throw new Error(`Erro ${result.status}: ${result.statusText}`);
    }

    return await result.json();
  } catch (error) {
    console.error("Erro ao fazer a movimentação:", error);
    throw new Error("Falha na comunicação com o servidor.");
  }
}

