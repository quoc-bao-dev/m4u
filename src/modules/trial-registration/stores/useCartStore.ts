'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartStore {
  ids: number[]
  addItem: (id: number) => void
  removeItem: (id: number) => void
  clearCart: () => void
  getItemCount: () => number
  isItemInCart: (id: number) => boolean
  getIds: () => number[]
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ids: [],

      addItem: (id) => {
        const { ids } = get()
        const exists = ids.includes(id)
        if (!exists) {
          set({ ids: [...ids, id] })
        }
      },

      removeItem: (id) => {
        set({ ids: get().ids.filter(itemId => itemId !== id) })
      },

      clearCart: () => {
        set({ ids: [] })
      },

      getItemCount: () => {
        return get().ids.length
      },

      isItemInCart: (id) => {
        return get().ids.includes(id)
      },

      getIds: () => get().ids,
    }),
    {
      name: 'trial-registration-cart',
      version: 2,
      // simple migrate: if old structure exists, map to ids
      migrate: (persistedState: any) => {
        if (persistedState && Array.isArray(persistedState.items)) {
          const ids = persistedState.items
            .map((it: any) => it?.id)
            .filter((id: any) => typeof id === 'number')
          return { ...persistedState, ids, items: undefined }
        }
        return persistedState
      },
    }
  )
)
