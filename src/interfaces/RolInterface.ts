import { Pagina } from "./MyInfoInterface"

export interface RolInterface {
  id?: number  
  name: string
  paginas: number[]
  list_paginas?: Pagina[]
  created_at?: Date
  updated_at?: Date
}