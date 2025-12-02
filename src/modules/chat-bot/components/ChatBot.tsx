import axiosInstance from '@/core/http/axiosInstance'
import { ChatHistoryResponse, useChatSession } from '@/services/chat-bot'
import { useLocale } from 'next-intl'
import { memo, useEffect, useRef, useState } from 'react'
import { useHandleScript } from '../hooks'
import { chatStore } from '../store/chatStore'
import ChatContent from './ChatContent'
import GreetingBubble from './GreetingBubble'
import GreetingScreen from './GreetingScreen'

const IMAGE_PACKBOT = '/chat-bot/pack-bot.gif'
const LOOP_TIME = 6000
const PENDING_TIME = 3000
const CHATBOT_OPENED_KEY = 'chatbot_opened'
const CHATBOT_AUTO_OPEN_DISABLED_KEY = 'chatbot_auto_open_disabled'

const delay = (ms: number = PENDING_TIME) =>
  new Promise((resolve) => setTimeout(resolve, ms))

function ChatBot() {
  const greeting = 'Packbot xin chào'
  const locale = useLocale()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showChatContent, setShowChatContent] = useState(false)
  const [hasStartedBefore, setHasStartedBefore] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const chatBoxRef = useRef<HTMLDivElement>(null)
  const firstScriptLoadedRef = useRef(false)

  // Check chatbot state on first load
  useEffect(() => {
    const storedStarted = localStorage.getItem(CHATBOT_OPENED_KEY)
    const storedAutoDisabled = localStorage.getItem(
      CHATBOT_AUTO_OPEN_DISABLED_KEY
    )

    const started = !!storedStarted
    const autoOpenEnabled = !storedAutoDisabled

    setHasStartedBefore(started)

    // Chỉ tự mở popup nếu:
    // - Chưa bắt đầu khảo sát (chưa có CHATBOT_OPENED_KEY)
    // - Người dùng chưa từng bấm close trước đó (chưa disable auto open)
    if (!started && autoOpenEnabled) {
      setIsChatOpen(true)
    }
    setShowChatContent(started)
  }, [])

  const { setIsChatBotTyping } = chatStore()
  const { data: chatSession } = useChatSession()
  const { handleScript } = useHandleScript()

  const fetchMessages = async (url: string) => {
    const response = await axiosInstance.get<ChatHistoryResponse>(url, {
      params: {
        vsession: chatSession?.vsession,
        locale: locale,
        isweb: 1,
      },
    })
    return response.data
  }

  // Reset first script flag when session changes
  useEffect(() => {
    firstScriptLoadedRef.current = false
  }, [chatSession?.vsession])

  // Listen to system language (locale) changes and log list_chat data
  useEffect(() => {
    const fetchOnLocaleChange = async () => {
      if (!chatSession?.vsession) return

      try {
        const res = await fetchMessages('/script/list_chat')
        console.log('[/script/list_chat] data for locale', locale, res)
      } catch (error) {
        console.error(
          'Error fetching /script/list_chat on locale change:',
          error
        )
      }
    }

    fetchOnLocaleChange()
  }, [locale, chatSession?.vsession])

  // first load message - chỉ gọi khi tab ChatContent đang active
  useEffect(() => {
    const handler = async () => {
      if (!chatSession?.vsession) return

      // Xác định khi nào màn ChatContent thực sự active
      const isChatContentActive = hasStartedBefore
        ? isChatOpen // đã từng bắt đầu rồi, mở chat là vào thẳng màn chat
        : isChatOpen && showChatContent // lần đầu phải bấm Start để vào màn chat

      if (!isChatContentActive) return
      if (firstScriptLoadedRef.current) return

      firstScriptLoadedRef.current = true

      setIsChatBotTyping(true)
      await delay()

      const firstRes = await fetchMessages('/script/list_chat')
      if (firstRes.result) {
        const firstMessageRes = {
          ...firstRes,
          data: firstRes.data[0],
          next: firstRes.data[0].next,
        }
        handleScript(firstMessageRes)
      }
    }

    handler()
  }, [chatSession?.vsession, isChatOpen, showChatContent, hasStartedBefore])

  const handleCloseChat = () => {
    setIsChatOpen(false)
    setShowChatContent(false)
    // Người dùng đã chủ động tắt popup -> không tự mở lại nữa
    localStorage.setItem(CHATBOT_AUTO_OPEN_DISABLED_KEY, 'true')
  }

  const handleStartSurvey = () => {
    setShowChatContent(true)
    localStorage.setItem(CHATBOT_OPENED_KEY, 'true')
  }

  return (
    <div className="fixed bottom-[60px] right-6 z-50">
      <div className="relative">
        {/* ====== bubble ====== */}
        <button
          type="button"
          onClick={() => setIsChatOpen((prev) => !prev)}
          className="scale-75 size-[109px] rounded-full bg-pink-50 flex items-center justify-center shadow-2xl cursor-pointer border-0"
        >
          <div className="size-[89px] rounded-full relative bg-[#FACEE3] ">
            <div className="absolute inset-0 rounded-full flex items-center justify-center ml-1 mb-1">
              <img
                src={IMAGE_PACKBOT}
                className="h-[96px] w-[81px-] scale-105"
                alt=""
              />
            </div>
          </div>
        </button>

        {/* ====== message ====== */}
        <GreetingBubble
          greeting={greeting}
          loopTime={LOOP_TIME}
          hidden={isChatOpen}
        />

        {/* ====== chat box ====== */}
        {isChatOpen && (
          <div className="absolute bottom-[105%] right-0">
            <div className="relative">
              <div
                ref={chatBoxRef}
                className="bg-[#FAFAFA] rounded-[16px] w-[400px] h-[554px] flex flex-col relative overflow-hidden"
              >
                {/* ===== chat section ===== */}
                {!hasStartedBefore ? (
                  <div className="relative h-full">
                    {/* Greeting screen */}
                    <div
                      className={`absolute inset-0 transition-all duration-500 ${
                        showChatContent
                          ? 'opacity-0 scale-95 pointer-events-none'
                          : 'opacity-100 scale-100'
                      }`}
                    >
                      <GreetingScreen
                        onStart={handleStartSurvey}
                        onClose={handleCloseChat}
                      />
                    </div>

                    {/* Chat content screen */}
                    <div
                      className={`absolute inset-0 flex flex-col transition-all duration-500 ${
                        showChatContent
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-95 pointer-events-none'
                      }`}
                    >
                      <ChatContent
                        scrollContainerRef={scrollContainerRef}
                        onClose={handleCloseChat}
                        isActive={showChatContent}
                      />
                    </div>
                  </div>
                ) : (
                  // If user has started before, show only chat content (no GreetingScreen)
                  <div className="w-full h-full flex flex-col">
                    <ChatContent
                      scrollContainerRef={scrollContainerRef}
                      onClose={handleCloseChat}
                      isActive
                    />
                  </div>
                )}
              </div>
              <div className="absolute -z-10 -bottom-3 right-10 w-0 h-0 border-l-[14px] border-r-[14px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#FAFAFA] drop-shadow-[0px_3px_14.1px_#0000000F]" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(ChatBot)
