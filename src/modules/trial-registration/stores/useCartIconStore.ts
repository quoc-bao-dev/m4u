'use client'

import { create } from 'zustand'

interface CartIconStore {
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

export const useCartIconStore = create<CartIconStore>((set) => ({
  isOpen: false,
  
  openCart: () => set({ isOpen: true }),
  
  closeCart: () => set({ isOpen: false }),
  
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen }))
}))
