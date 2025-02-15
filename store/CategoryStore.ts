import { CategoryPaginate, CategoryPaginateActions } from "@/interfaces/CategoriaInterface";
import { create } from "zustand";

export const useCategoryStore = create<CategoryPaginate & CategoryPaginateActions>((set) => ({
  currentPage: 1,
  setCategoryPaginate: (currentPage: number) => {
    set({ currentPage })
  },
}))