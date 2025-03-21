export interface ProveedorInterface {
  id?: number
  name: string
  phone: string,
  email: string
  ruc: string
  address: string
  created_at?: Date
  updated_at?: Date
}

export interface ProveedoresResponse {
  proveedores: ProveedorInterface[];
  currentPage: number;
  totalPages: number;
}

export interface ProveedorResponse {
  proveedores: ProveedorInterface;
}

export interface ProveedoresPaginate {
  currentPage: number
}

export interface ProveedoresPaginateActions {
  setProveedoresPaginate: (currentPage: number) => void;
}