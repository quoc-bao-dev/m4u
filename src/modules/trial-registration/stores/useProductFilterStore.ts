'use client'

import { create } from 'zustand'

interface ProductFilterState {
  selectedIds: Set<string>
  toggle: (id: string) => void
  clear: () => void
  setMany: (ids: string[]) => void
  getAll: () => string[]
}

export const useProductFilterStore = create<ProductFilterState>()(
  (set, get) => ({
    selectedIds: new Set<string>(),
    toggle: (id: string) =>
      set((state) => {
        const next = new Set(state.selectedIds)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return { selectedIds: next }
      }),
    clear: () => set({ selectedIds: new Set<string>() }),
    setMany: (ids: string[]) => set({ selectedIds: new Set(ids) }),
    getAll: () => Array.from(get().selectedIds),
  })
)
