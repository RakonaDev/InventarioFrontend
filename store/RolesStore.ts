import { RolesPaginate, RolesPaginateActions } from "@/interfaces/RolInterface";
import { create } from "zustand";

export const useRolesStore = create<RolesPaginate & RolesPaginateActions>((set) => ({
  currentPage: 1,
  setRolesPaginate: (currentPage: number) => {
    set({ currentPage })
  },
}))