'use client'

import { create } from 'zustand'

interface DonationCharityState {
  activeProductId: string | null
  hasEvent: boolean
  setActiveProductId: (id: string | null) => void
  clearActiveProduct: () => void
  isProductActive: (id: string) => boolean
  setHasEvent: (hasEvent: boolean) => void
}

export const useDonationCharityStore = create<DonationCharityState>(
  (set, get) => ({
    activeProductId: null,
    hasEvent: false,

    setActiveProductId: (id) => {
      set({ activeProductId: id })
    },

    clearActiveProduct: () => {
      set({ activeProductId: null })
    },

    isProductActive: (id) => {
      return get().activeProductId === id
    },

    setHasEvent: (hasEvent) => {
      set({ hasEvent })
    },
  })
)
