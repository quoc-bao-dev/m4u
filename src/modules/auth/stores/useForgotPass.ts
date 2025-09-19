'use client'

import { create } from 'zustand'

interface ForgotPassState {
  phone: string
  isOpen: boolean
  otp: string
  isResetOpen: boolean
  isPhoneInputOpen: boolean
  setPhone: (phone: string) => void
  clearPhone: () => void
  open: (phone?: string) => void
  close: () => void
  setOtp: (otp: string) => void
  openReset: () => void
  closeReset: () => void
  openPhoneInput: () => void
  closePhoneInput: () => void
  resetAll: () => void
}

export const useForgotPass = create<ForgotPassState>((set) => ({
  phone: '',
  isOpen: false,
  otp: '',
  isResetOpen: false,
  isPhoneInputOpen: false,
  setPhone: (phone: string) => set({ phone }),
  clearPhone: () => set({ phone: '' }),
  open: (phone?: string) =>
    set((state) => ({ isOpen: true, phone: phone ?? state.phone })),
  close: () => set({ isOpen: false }),
  setOtp: (otp: string) => set({ otp }),
  openReset: () => set({ isResetOpen: true }),
  closeReset: () => set({ isResetOpen: false }),
  openPhoneInput: () => set({ isPhoneInputOpen: true }),
  closePhoneInput: () => set({ isPhoneInputOpen: false }),
  resetAll: () =>
    set({
      phone: '',
      otp: '',
      isOpen: false,
      isResetOpen: false,
      isPhoneInputOpen: false,
    }),
}))
