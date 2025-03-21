import { Pagina } from "./MyInfoInterface"

export interface RolInterface {
  id?: number  
  name: string
  paginas: number[]
  list_paginas?: Pagina[]
  created_at?: Date
  updated_at?: Date
}

export interface RolesResponse {
  roles: RolInterface[];
  currentPage: number;
  totalPages: number;
}

export interface RolResponse {
  roles: RolInterface;
}

export interface RolesPaginate {
  currentPage: number
}

export interface RolesPaginateActions {
  setRolesPaginate: (currentPage: number) => void;
}