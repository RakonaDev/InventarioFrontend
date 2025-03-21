import { ProveedoresPaginate, ProveedoresPaginateActions } from "@/interfaces/ProveedorInterface"
import { create } from "zustand"

export const useProveedorStore = create<ProveedoresPaginate & ProveedoresPaginateActions>((set) => ({
  currentPage: 1,
  setProveedoresPaginate: (currentPage: number) => {
    set({ currentPage })
  },
}))