import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const CHATBOT_CLOSED_DATE_KEY = 'chatbot_closed_date'

// Helper function to get today's date string (YYYY-MM-DD)
const getTodayDateString = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

type ChatbotCloseStoreType = {
  // state
  date: string | null // chatbot_closed_date
  isShowClose: boolean
  isShow: boolean

  // actions
  setDate: (date: string | null) => void
  setIsShowClose: (isShowClose: boolean) => void
  // Helper to check if chatbot should be shown (not closed today)
  shouldShow: () => boolean
}

export const chatbotCloseStore = create<ChatbotCloseStoreType>()(
  persist(
    (set, get) => ({
      date: null,
      isShowClose: false,
      isShow: false,

      setDate: (date) => {
        set({ date })
        // Đồng bộ với localStorage key cũ để tương thích
        if (typeof window !== 'undefined') {
          if (date) {
            localStorage.setItem(CHATBOT_CLOSED_DATE_KEY, date)
          } else {
            localStorage.removeItem(CHATBOT_CLOSED_DATE_KEY)
          }
        }
      },

      setIsShowClose: (isShowClose) => set({ isShowClose }),

      shouldShow: () => {
        const { date } = get()
        if (!date) return true

        const today = getTodayDateString()
        return date !== today
      },
    }),
    {
      name: 'chatbot-close-storage',
      partialize: (state) => ({
        date: state.date,
        // isShowClose không persist vào localStorage
      }),
      onRehydrateStorage: () => (state) => {
        // Khi rehydrate, kiểm tra và load từ localStorage key cũ nếu store chưa có date
        if (typeof window !== 'undefined' && state) {
          const oldDate = localStorage.getItem(CHATBOT_CLOSED_DATE_KEY)
          if (oldDate && !state.date) {
            state.setDate(oldDate)
          }
        }
      },
    }
  )
)
