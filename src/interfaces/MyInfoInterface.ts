/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Me {
  id: number
  names: string
  last_names: string
  age: number
  tel: string
  dni: string
  email: string
  email_verified_at: any
  id_roles: number
  id_estado: number
  created_at: string
  updated_at: string
  roles: Roles
}

export interface Roles {
  id: number
  name: string
  created_at: string
  updated_at: string
  list_paginas: Pagina[]
}

export interface Pagina {
  id: number
  nombre?: string
  created_at?: string
  updated_at?: string
  pivot?: Pivot
}

export interface Pivot {
  id_rol: number
  id_pagina: number
}