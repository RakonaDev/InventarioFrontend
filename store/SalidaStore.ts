import { SalidasPaginate, SalidasPaginateActions } from "@/interfaces/SalidaInterface";
import { create } from "zustand";

export const useSalidasStore = create<SalidasPaginate & SalidasPaginateActions>((set) => ({
  currentPage: 1,
  setSalidasPaginate: (currentPage: number) => {
    set({ currentPage })
  },
}))