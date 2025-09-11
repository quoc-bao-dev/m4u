import { create } from 'zustand'

interface TrialOTPModalState {
  isOpen: boolean
  phone?: string
  length: number
  onConfirm?: (otp: string) => void
  open: (params?: {
    phone?: string
    length?: number
    onConfirm?: (otp: string) => void
  }) => void
  close: () => void
}

const useTrialOTPModal = create<TrialOTPModalState>((set) => ({
  isOpen: false,
  phone: undefined,
  length: 6,
  onConfirm: undefined,
  open: (params) =>
    set((state) => ({
      isOpen: true,
      phone: params?.phone ?? state.phone,
      length: params?.length ?? state.length,
      onConfirm: params?.onConfirm ?? state.onConfirm,
    })),
  close: () => set({ isOpen: false }),
}))

export default useTrialOTPModal
