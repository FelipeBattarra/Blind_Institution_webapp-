// Read Models
export type MeasurementUnitEntity = {
  id: string,
  name: string,
  alias?: string
}

export type ProductEntity = {
  id: string,
  measurement_unit_id?: string,
  category_id?: string,
  storageFrontId?: string,
  image_path:string,
  name?: string,
  quantity?: number,
  min_quantity?: number,
  created_by_user_id: string,
  updated_by_user_id?: string,
  deleted_at_by_user_id?: string,
  deleted_at?: Date,
  created_at?: Date,
  updated_at?: Date,
  observation?: string
}

export type StorageFrontEntity = {
  id: string,
  name: string
}

export type StorageHistoryEntity = {
  id: string,
  product_id: string,
  amount?: number,
  charged_at?: Date
}

export type CategoryEntity = {
  id: string,
  name: string,
  storageFrontId: number,
  deleted_at?: Date
}

// Create Models
export type CreateMeasurementUnitRequest = {
  id?: string,
  name: string,
  alias?: string
}

export type CreateProductRequest = {
  id?: string,
  measureUnitId?: string,
  categoryId?: string,
  storageFrontId?: string,
  name?: string,
  quantity?: number,
  minQuantity?: number,
  imagePath?: string,
  // created_by_user_id: string,
  updated_by_user_id?: string,
  deleted_at_by_user_id?: string,
  deleted_at?: Date,
  created_at?: Date,
  updated_at?: Date,
  observation?: string
}

export type UploadImageRequest = {
  file: File | null | undefined; // Aceita File, null ou undefined
};

export type CreateStorageFrontRequest = {
  id?: string,
  name: string
}

export type CreateStorageHistoryRequest = {
  id?: string,
  product_id: string,
  amount?: number,
  charged_at?: Date
}

export type CreateCategoryRequest = {
  id?: string,
  name: string,
  storageFrontId: Number,
  deleted_at?: Date
}

// Update Models
export type UpdateMeasurementUnitRequest = {
  id?: string,
  name?: string,
  alias?: string
}

export type UpdateProductRequest = {
  id?: string,
  measurement_unit?: string,
  category_id?: string,
  storageFrontId?: string,
  imagePath?: string,
  name?: string,
  quantity?: number,
  min_quantity?: number,
  created_by_user_id?: string,
  updated_by_user_id?: string,
  deleted_at_by_user_id?: string,
  deleted_at?: Date,
  created_at?: Date,
  updated_at?: Date,
  observation?: string
}

export type UpdateStorageFrontRequest = {
  id?: string,
  name?: string
}

export type UpdateStorageHistoryRequest = {
  id?: string,
  product_id?: string,
  amount?: number,
  charged_at?: Date
}

export type UpdateCategoryRequest = {
  id?: string,
  name?: string,
  storageFrontId: number,
  deleted_at?: Date
}