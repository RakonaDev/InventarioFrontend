import { Insumo } from "./InsumosInterface"

export interface CompraInterface {
  id?: number
  cantidad: number
  comprobante: string
  total?: number
  id_producto: number
  fecha_ingreso: Date
  fecha_vencimiento: Date
  vida_utiles_dias: number
  created_at?: Date
  updated_at?: Date
  producto?: Insumo
}

export interface ComprasResponse {
  compras: CompraInterface[];
  currentPage: number;
  totalPages: number;
}

export interface CompraResponse {
  compras: CompraInterface;
}

export interface ComprasPaginate {
  currentPage: number
}

export interface ComprasPaginateActions {
  setComprasPaginate: (currentPage: number) => void;
}