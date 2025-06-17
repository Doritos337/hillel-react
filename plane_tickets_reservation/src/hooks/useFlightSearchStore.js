import { create } from "zustand";

export const useFlightSearchStore = create((set) => ({
  searchParams: null,
  setSearchParams: (params) => set({ searchParams: params }),
  resetSearchParams: () => set({ searchParams: null }),
}));
