import { create } from 'zustand'
import { InsumoPaginate, InsumoPaginateActions } from "@/interfaces/InsumosInterface";

export const useProductStore = create<InsumoPaginate & InsumoPaginateActions>((set) => {
  currentPage: 1,
  setInsumoPaginate: (currentPage: number) => {
    set({ currentPage })
  }
})
