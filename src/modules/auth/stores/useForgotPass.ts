'use client'

import { create } from 'zustand'

interface ForgotPassState {
  phone: string
  isOpen: boolean
  setPhone: (phone: string) => void
  clearPhone: () => void
  open: (phone?: string) => void
  close: () => void
}

export const useForgotPass = create<ForgotPassState>((set) => ({
  phone: '',
  isOpen: false,
  setPhone: (phone: string) => set({ phone }),
  clearPhone: () => set({ phone: '' }),
  open: (phone?: string) =>
    set((state) => ({ isOpen: true, phone: phone ?? state.phone })),
  close: () => set({ isOpen: false }),
}))
