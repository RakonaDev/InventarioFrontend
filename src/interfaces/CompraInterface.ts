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