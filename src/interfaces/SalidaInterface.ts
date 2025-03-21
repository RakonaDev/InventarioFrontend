import { Insumo } from "./InsumosInterface"

export interface SalidaInterface {
  id?: number
  cantidad: number
  id_producto: number
  producto?: Insumo
  created_at?: Date
  updated_at?: Date
}

export interface SalidasResponse {
  salidas: SalidaInterface[];
  currentPage: number;
  totalPages: number;
}

export interface SalidasPaginate {
  currentPage: number
}

export interface SalidasPaginateActions {
  setSalidasPaginate: (currentPage: number) => void;
}