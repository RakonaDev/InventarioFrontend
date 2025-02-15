import { ComprasPaginate, ComprasPaginateActions } from "@/interfaces/CompraInterface";
import { create } from "zustand";

export const useComprasStore = create<ComprasPaginate & ComprasPaginateActions>((set) => ({
  currentPage: 1,
  setComprasPaginate: (currentPage: number) => {
    set({ currentPage })
  },
}))