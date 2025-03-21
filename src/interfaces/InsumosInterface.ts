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

// Zustand
export interface InsumoPaginate {
  currentPage: number
}

export interface InsumoPaginateActions {
  setInsumoPaginate: (currentPage: number) => void;
}
