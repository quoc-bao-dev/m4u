import { create } from 'zustand'

interface ModalRegistrationState {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  open: () => void
  close: () => void
}

const useModalRegistration = create<ModalRegistrationState>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

export default useModalRegistration
