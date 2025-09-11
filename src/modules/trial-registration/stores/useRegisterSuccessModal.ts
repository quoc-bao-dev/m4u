import { create } from 'zustand'

interface RegisterSuccessModalState {
  isOpen: boolean
  title?: string
  message?: string
  autoCloseMs?: number
  open: (params?: {
    title?: string
    message?: string
    autoCloseMs?: number
  }) => void
  close: () => void
}

const useRegisterSuccessModal = create<RegisterSuccessModalState>(
  (set, get) => ({
    isOpen: false,
    title: 'Successfully register!',
    message:
      'We\u2019ve received your application. Your trial product will be shipped to your address within the next few days.',
    autoCloseMs: undefined,
    open: (params) => {
      set({
        isOpen: true,
        title: params?.title ?? get().title,
        message: params?.message ?? get().message,
        autoCloseMs: params?.autoCloseMs,
      })

      const ms = params?.autoCloseMs
      if (typeof ms === 'number' && ms > 0) {
        setTimeout(() => set({ isOpen: false }), ms)
      }
    },
    close: () => set({ isOpen: false }),
  })
)

export default useRegisterSuccessModal
