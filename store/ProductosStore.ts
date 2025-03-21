import { InsumosPaginate, InsumosPaginateActions } from "@/interfaces/InsumosInterface";
import { create } from "zustand";

export const useInsumosStore = create<InsumosPaginate & InsumosPaginateActions>((set) => ({
  currentPage: 1,
  setInsumosPaginate: (currentPage: number) => {
    set({ currentPage })
  },
}))