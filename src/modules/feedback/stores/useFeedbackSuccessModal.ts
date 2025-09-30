import { create } from 'zustand'

interface FeedbackSuccessModalState {
  isOpen: boolean
  open: () => void
  close: () => void
}

const useFeedbackSuccessModal = create<FeedbackSuccessModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

export default useFeedbackSuccessModal
