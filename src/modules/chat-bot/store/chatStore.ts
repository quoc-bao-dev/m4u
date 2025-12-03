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
  updateMessageById: (
    id: number,
    updates: {
      message?: string
      options?: Array<{ id: number; name: string; content: string | null }>
    }
  ) => void
  setMessages: (messages: ChatMessageItem[]) => void
  clearMessages: () => void
}

export const chatStore = create<ChatStoreType>((set) => {
  const getSelectedOptionIdsFromFilter = (
    optionFilter: ChatMessageItem['option_filter']
  ) => {
    if (!optionFilter) return []

    const normalizeId = (value: any) => {
      const id = Number(value?.id ?? value)
      return Number.isFinite(id) ? id : null
    }

    if (Array.isArray(optionFilter)) {
      return optionFilter
        .map((item) => normalizeId(item))
        .filter((id): id is number => id !== null)
    }

    if (typeof optionFilter === 'object') {
      const singleId = normalizeId(optionFilter)
      return singleId !== null ? [singleId] : []
    }

    return []
  }

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
    updateMessageById: (id, updates) =>
      set((state) => ({
        message: state.message.map((item) => {
          if (item.id !== id) return item

          // Update message if provided
          const updatedItem = {
            ...item,
            ...(updates.message !== undefined && { message: updates.message }),
          }

          // Update options if provided
          if (updates.options && updatedItem.options) {
            updatedItem.options = updatedItem.options.map((option) => {
              const optionUpdate = updates.options?.find(
                (opt) => opt.id === option.id
              )
              return optionUpdate
                ? {
                    ...option,
                    name: optionUpdate.name,
                    content: optionUpdate.content,
                  }
                : option
            })
          }

          return updatedItem
        }),
      })),
    setMessages: (messages) =>
      set({
        message: messages.map((msg, index) => ({
          ...msg,
          active: index === messages.length - 1,
          selectedOptionIds: getSelectedOptionIdsFromFilter(msg.option_filter),
        })),
      }),
    clearMessages: () =>
      set({
        message: [],
        isChatBotTyping: false,
      }),
  }
})
