import { create } from 'zustand'

interface MobileFilterState {
  isSkinTypeOpen: boolean
  selectedSkinTypes: Set<string>
  openSkinTypePopup: () => void
  closeSkinTypePopup: () => void
  toggleSkinType: (id: string) => void
  resetSkinTypes: () => void
}

export const useMobileFilterStore = create<MobileFilterState>((set) => ({
  // Initial state
  isSkinTypeOpen: false,
  selectedSkinTypes: new Set(['da-hon-hop', 'da-thuong']), // Pre-selected items

  // Actions
  openSkinTypePopup: () => set({ isSkinTypeOpen: true }),

  closeSkinTypePopup: () => set({ isSkinTypeOpen: false }),

  toggleSkinType: (id: string) =>
    set((state) => {
      const newSelected = new Set(state.selectedSkinTypes)
      if (newSelected.has(id)) {
        newSelected.delete(id)
      } else {
        newSelected.add(id)
      }
      return { selectedSkinTypes: newSelected }
    }),

  resetSkinTypes: () => set({ selectedSkinTypes: new Set() }),
}))
