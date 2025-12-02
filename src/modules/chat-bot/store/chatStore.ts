import { ChatMessageItem } from '@/services/chat-bot'
import { create } from 'zustand'

type ChatStoreType = {
  // state
  message: (ChatMessageItem & {
    active: boolean
    selectedOptionIds?: number[]
  })[]
  isChatBotTyping: boolean

  // action
  addMessage: (message: any) => void
  setIsChatBotTyping: (isChatBotTyping: boolean) => void
  setMessageActive: (id: number, active: boolean) => void
  setMessageSelectedOptionIds: (id: number, selectedOptionIds: number[]) => void
}

export const chatStore = create<ChatStoreType>((set) => {
  return {
    message: [],
    isChatBotTyping: false,
    addMessage: (message) =>
      set((state) => ({
        message: [
          ...state.message,
          { ...message, active: true, selectedOptionIds: [] },
        ],
      })),
    setIsChatBotTyping: (isChatBotTyping) => set({ isChatBotTyping }),
    setMessageActive: (id, active) =>
      set((state) => ({
        message: state.message.map((item) =>
          item.id === id ? { ...item, active } : item
        ),
      })),
    setMessageSelectedOptionIds: (id, selectedOptionIds) =>
      set((state) => ({
        message: state.message.map((item) =>
          item.id === id ? { ...item, selectedOptionIds } : item
        ),
      })),
  }
})
