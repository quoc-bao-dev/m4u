import { create } from "zustand";

export const useFooterHieghtStore = create<{ height: number, setHeight: (height: number) => void }>((set) => ({
    height: 0,
    setHeight: (height: number) => set({ height }),
}))