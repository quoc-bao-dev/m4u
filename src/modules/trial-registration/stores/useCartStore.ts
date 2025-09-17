'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: number
  productName: string
  productBrand: string
  productImage: string
  productColor: string
  addedAt: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'addedAt'>) => void
  removeItem: (id: number) => void
  clearCart: () => void
  getItemCount: () => number
  isItemInCart: (id: number) => boolean
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const { items } = get()
        const existingItem = items.find(i => i.id === item.id)
        
        if (!existingItem) {
          set({
            items: [...items, { ...item, addedAt: Date.now() }]
          })
        }
      },
      
      removeItem: (id) => {
        set({
          items: get().items.filter(item => item.id !== id)
        })
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getItemCount: () => {
        return get().items.length
      },
      
      isItemInCart: (id) => {
        return get().items.some(item => item.id === id)
      }
    }),
    {
      name: 'trial-registration-cart',
      version: 1
    }
  )
)
