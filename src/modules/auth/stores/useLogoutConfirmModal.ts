'use client'
import { create } from 'zustand'

interface LogoutConfirmModalState {
  isOpen: boolean
  open: () => void
  close: () => void
}

const useLogoutConfirmModal = create<LogoutConfirmModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

export default useLogoutConfirmModal
