import axiosInstance from '@/core/http/axiosInstance'
import { ChatMessageResponse, useChatSession } from '@/services/chat-bot'
import { useCallback, useRef } from 'react'
import { chatStore } from '../store/chatStore'

const PENDING_TIME = 3000

const delay = (ms: number = PENDING_TIME) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const useHandleScript = () => {
  const { setIsChatBotTyping, addMessage } = chatStore()
  const { data: chatSession } = useChatSession()

  const fetchMessage = useCallback(
    async (url: string) => {
      const response = await axiosInstance.get<ChatMessageResponse>(url, {
        params: {
          vsession: chatSession?.vsession,
          isweb: 1,
        },
      })
      return response.data
    },
    [chatSession?.vsession]
  )

  const handleScriptRef = useRef<
    ((data: ChatMessageResponse) => Promise<void>) | null
  >(null)

  const handleScript = useCallback(
    async (data: ChatMessageResponse) => {
      // add message
      setIsChatBotTyping(false)
      const nextLink = data.end_to_reset === 1 ? data?.next : undefined
      addMessage(data.data, nextLink as string)

      const next = data?.next

      if (next && typeof next === 'string' && data.end_to_reset !== 1) {
        setIsChatBotTyping(true)
        await delay()
        const nextResponse = await fetchMessage(next)
        if (handleScriptRef.current) {
          await handleScriptRef.current(nextResponse)
        }
      } else {
      }
    },
    [fetchMessage, setIsChatBotTyping, addMessage]
  )

  handleScriptRef.current = handleScript

  return {
    handleScript,
    fetchMessage,
    delay,
  }
}
