import { create } from 'zustand'

interface LoginModalState {
  isOpen: boolean
  open: () => void
  close: () => void
}

const useLoginModal = create<LoginModalState>((set) => ({
  isOpen: true,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

export default useLoginModal
