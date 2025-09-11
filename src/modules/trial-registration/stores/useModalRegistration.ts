import { create } from 'zustand'

interface ModalRegistrationState {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  onpen: () => void
  close: () => void
}

const useModalRegistration = create<ModalRegistrationState>((set) => ({
  isOpen: true,
  setIsOpen: (open) => set({ isOpen: open }),
  onpen: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

export default useModalRegistration
