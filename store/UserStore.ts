import { UsersPaginate, UsersPaginateActions } from '@/interfaces/ListUserInterface'
import { create } from 'zustand'
export const useUserStore = create<UsersPaginate & UsersPaginateActions>((set) => ({
  currentPage: 1,
  setUsersPaginate: (currentPage: number) => {
    set({ currentPage })
  },
}))