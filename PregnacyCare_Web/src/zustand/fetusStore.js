import { create } from "zustand";

export const useFetusStore = create((set) => ({
    selectedFetus: null,
    setSelectedFetus: (fetus) => set({ selectedFetus: fetus }),
    fetusList: [],
    setFetusList: (list) => set({ fetusList: list }),
  }));