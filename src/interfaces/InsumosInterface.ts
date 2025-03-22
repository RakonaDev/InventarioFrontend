import { CategoriaInterface } from "./CategoriaInterface";
import { ProveedorInterface } from "./ProveedorInterface";

export interface Insumo {
  id?: number;
  precio: number
  nombre: string;
  cantidad: number;
  updated_at?: Date;
  created_at?: Date;
  descripcion: string;
  id_categoria: number;
  id_proveedor: number;
  categorias?: CategoriaInterface;
  proveedor?: ProveedorInterface;
}

export type InsumoReturn = {
  insumos: Insumo[];
  totalPages: number;
}

export interface InsumosResponse {
  insumos: Insumo[];
  totalPages: number;
  currentPage: number;
}

export interface InsumosPaginate {
  currentPage: number
}

export interface InsumosPaginateActions {
  setInsumosPaginate: (currentPage: number) => void;
}
