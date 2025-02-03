import { Insumo } from "./InsumosInterface"

export interface SalidaInterface {
  id?: number
  cantidad: number
  id_producto: number
  producto?: Insumo
  created_at?: Date
  updated_at?: Date
}