import { useDevice } from '@/core/hooks/useDevice'
import axiosInstance from '@/core/http/axiosInstance'
import { ChatHistoryResponse, useChatSession } from '@/services/chat-bot'
import { useLocale, useTranslations } from 'next-intl'
import { memo, useEffect, useRef, useState } from 'react'
import { useHandleScript } from '../hooks'
import { chatStore } from '../store/chatStore'
import { chatbotCloseStore } from '../store/chatbotCloseStore'
import ChatContent from './ChatContent'
import GreetingBubble from './GreetingBubble'
import GreetingScreen from './GreetingScreen'

const IMAGE_PACKBOT = '/chat-bot/pack-bot.gif'
// const IMAGE_PACKBOT = '/chat-bot/greeting.png'
const LOOP_TIME = 6000
const PENDING_TIME = 3000
const DELAY_TIME = 700
const CHATBOT_OPENED_KEY = 'chatbot_opened'
const CHATBOT_AUTO_OPEN_DISABLED_KEY = 'chatbot_auto_open_disabled'

const delay = (ms: number = PENDING_TIME) =>
  new Promise((resolve) => setTimeout(resolve, ms))

// Helper function to get today's date string (YYYY-MM-DD)
const getTodayDateString = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

function ChatBot() {
  // Get date from store
  const date = chatbotCloseStore((state) => state.date)
  const isShowClose = chatbotCloseStore((state) => state.isShowClose)

  // Calculate shouldShow based on date
  const shouldShow = (() => {
    // if (date === null) return false
    const today = getTodayDateString()

    return date !== today
  })()

  const locale = useLocale()
  const { isMobile } = useDevice()
  const t = useTranslations('chatBot')
  const greetingMessages = [t('greetingIntro'), t('greetingSuggest')]
  const [greetingIndex, setGreetingIndex] = useState(0)
  const greeting = greetingMessages[greetingIndex]
  const [isHydrated, setIsHydrated] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showChatContent, setShowChatContent] = useState(false)
  const [hasStartedBefore, setHasStartedBefore] = useState(false)
  const [isDrawerAnimating, setIsDrawerAnimating] = useState(false)
  const [hiddenMessageGreeting, setHiddenMessageGreeting] = useState(true)
  const [scrollY, setScrollY] = useState(0)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const chatBoxRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const firstScriptLoadedRef = useRef(false)

  // usePackbotIntro

  // Check chatbot state on first load
  useEffect(() => {
    // Wait for zustand persist to rehydrate before showing anything
    const unsubscribeHydrate = chatbotCloseStore.persist.onFinishHydration(() =>
      setIsHydrated(true)
    )
    if (chatbotCloseStore.persist.hasHydrated?.()) {
      setIsHydrated(true)
    }

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
      setTimeout(() => {
        if (isMobile) {
          // Trên mobile: bắt đầu với drawer ở vị trí ẩn, sau đó animate lên
          // Bước 1: Set drawer ở trạng thái ẩn và mở drawer
          setIsDrawerAnimating(true)
          setIsChatOpen(true)
          // Bước 2: Sau khi DOM đã render, trigger animation slide up
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsDrawerAnimating(false)
            })
          })
        } else {
          setIsChatOpen(true)
        }
      }, DELAY_TIME)
    }

    setShowChatContent(started)

    return () => {
      unsubscribeHydrate?.()
    }
  }, [isMobile])

  useEffect(() => {
    setTimeout(() => {
      setHiddenMessageGreeting(false)
    }, DELAY_TIME)
  }, [])

  // Luân phiên nội dung greeting 2 vòng rồi dừng:
  // - Vòng 1: "Tôi là Packbot AI." -> "Tôi sẽ gợi ý loại mặt nạ phù hợp cho bạn."
  // - Vòng 2: "Tôi là Packbot AI." -> "Tôi sẽ gợi ý loại mặt nạ phù hợp cho bạn."
  // - Sau đó dừng lại ở "Tôi là Packbot AI."
  useEffect(() => {
    if (hiddenMessageGreeting) return

    // Flow: 1 -> 2 -> 1 -> 2 -> stop at 1
    const greetingFlow = [0, 1, 0, 1, 0]
    let step = 0

    const intervalId = window.setInterval(() => {
      step += 1

      if (step >= greetingFlow.length) {
        window.clearInterval(intervalId)
        return
      }

      setGreetingIndex(greetingFlow[step])

      if (step === greetingFlow.length - 1) {
        window.clearInterval(intervalId)
      }
    }, LOOP_TIME)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [hiddenMessageGreeting])

  const { setIsChatBotTyping, updateMessageById, setMessages } = chatStore()
  const { data: chatSession } = useChatSession()
  const { handleScript, fetchMessage } = useHandleScript()

  const fetchMessages = async (url: string) => {
    const response = await axiosInstance.get<ChatHistoryResponse>(url, {
      params: {
        vsession: chatSession?.vsession,
        locale: locale,
        isweb: 1,
      },
    })
    if (
      response.data.show_end_script === 1 ||
      Boolean(response.data.show_end_script) === true
    ) {
      chatbotCloseStore.getState().setIsShowClose(true)
    }
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

        // Cập nhật lại message và options từ res
        if (res.result && res.data) {
          res.data.reverse().forEach((item) => {
            const updates: {
              message?: string
              options?: Array<{
                id: number
                name: string
                content: string | null
              }>
            } = {}

            // Cập nhật message
            if (item.message) {
              updates.message = item.message
            }

            // Cập nhật options nếu có
            if (item.options && item.options.length > 0) {
              updates.options = item.options.map((option) => ({
                id: option.id,
                name: option.name,
                content: option.content,
              }))
            }

            // Chỉ update nếu có dữ liệu cần cập nhật
            if (updates.message || updates.options) {
              updateMessageById(item.id, updates)
            }
          })
        }
      } catch (error) {
        console.error(
          'Error fetching /script/list_chat on locale change:',
          error
        )
      }
    }

    fetchOnLocaleChange()
  }, [locale, chatSession?.vsession, updateMessageById])

  // Lock body scroll on mobile when chat is open to prevent background scrolling
  useEffect(() => {
    if (typeof document === 'undefined') return

    const body = document.body
    const previousOverflow = body.style.overflow

    // Chỉ khóa scroll trên mobile, desktop vẫn cho phép scroll nền
    if (isMobile && isChatOpen) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = previousOverflow || ''
    }

    return () => {
      body.style.overflow = previousOverflow || ''
    }
  }, [isChatOpen, isMobile])

  // Track scroll position on mobile to adjust button position
  useEffect(() => {
    if (!isMobile || isChatOpen) return

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Set initial scroll position
    setScrollY(window.scrollY)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile, isChatOpen])

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

      const firstRes = await fetchMessages('/script/list_chat')
      if (firstRes.result) {
        //  chua co lich su

        if (firstRes.data.length === 1) {
          setIsChatBotTyping(true)
          await delay()
          const firstMessageRes = {
            ...firstRes,
            data: firstRes.data[0],
            next: firstRes.data[0].next,
          }
          handleScript(firstMessageRes)
        } else {
          // co lịch sử rồi - gán toàn bộ vào store với active = false
          const data = firstRes.data.reverse()
          setMessages(data)

          const lastMessage = data[data.length - 1]
          if (
            lastMessage.next &&
            typeof lastMessage.next === 'string' &&
            lastMessage.event === 'text' &&
            lastMessage.event_app !== 'event_restart'
          ) {
            const nextResponse = await fetchMessage(lastMessage.next)
            handleScript(nextResponse)
          }
        }
      }
    }

    handler()
  }, [chatSession?.vsession, isChatOpen, showChatContent, hasStartedBefore])

  const handleCloseChat = () => {
    if (isMobile) {
      setIsDrawerAnimating(true)
      setTimeout(() => {
        setIsChatOpen(false)
        setShowChatContent(false)
        setIsDrawerAnimating(false)
      }, 300) // Match animation duration
    } else {
      setIsChatOpen(false)
      setShowChatContent(false)
    }
  }

  // Hàm đóng chat và lưu vào store (chỉ dùng cho nút đóng X)
  const handleCloseChatWithStorage = () => {
    if (isMobile) {
      setIsDrawerAnimating(true)
      setTimeout(() => {
        setIsChatOpen(false)
        setShowChatContent(false)
        setIsDrawerAnimating(false)
      }, 300) // Match animation duration
    } else {
      setIsChatOpen(false)
      setShowChatContent(false)
    }
    // Lưu ngày đóng vào store
    const today = getTodayDateString()
    chatbotCloseStore.getState().setDate(today)
  }

  const handleToggleChat = () => {
    if (isMobile) {
      if (!isChatOpen) {
        // Mở drawer với animation slide up
        setIsDrawerAnimating(true)
        setIsChatOpen(true)
        // Đảm bảo DOM đã render trước khi trigger animation
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsDrawerAnimating(false)
          })
        })
      } else {
        handleCloseChat()
      }
    } else {
      setIsChatOpen((prev) => !prev)
    }
  }

  const handleStartSurvey = () => {
    setShowChatContent(true)
    setHasStartedBefore(true)

    localStorage.setItem(CHATBOT_OPENED_KEY, 'true')
  }

  // Calculate bottom position based on scroll (mobile only)
  // scrollY = 0 → bottom = 150px, scrollY tăng → bottom giảm xuống 80px
  // const getMobileButtonBottom = () => {
  //   if (!isMobile) return 150
  //   // Khi scrollY = 0 → bottom = 150px
  //   // Khi scrollY >= 200px → bottom = 80px
  //   // Giữa đó: linear interpolation
  //   const maxScroll = 200 // Điểm scroll mà bottom đạt 80px
  //   const minBottom = 80
  //   const maxBottom = 150
  //   const scrollRatio = Math.min(scrollY / maxScroll, 1)
  //   return maxBottom - scrollRatio * (maxBottom - minBottom)
  // }

  // Don't render if closed today
  if (!isHydrated || !shouldShow) {
    return null
  }

  // Mobile drawer version
  if (isMobile) {
    return (
      <>
        {/* ====== Floating Button (Mobile) ====== */}
        {!isChatOpen && (
          <div
            className="fixed right-4 z-50 md:hidden transition-all duration-300 ease-out"
            style={{ bottom: `20px` }}
          >
            <div className="relative">
              {isShowClose && (
                <button
                  type="button"
                  onClick={handleCloseChatWithStorage}
                  className="p-1 rounded-full hover:bg-gray-100/50 border-0 cursor-pointer absolute top-[-4px] right-[-4px] z-10"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="4.59619"
                      y="6.01029"
                      width="2"
                      height="15"
                      rx="1"
                      transform="rotate(-45 4.59619 6.01029)"
                      fill="#525252"
                    />
                    <rect
                      x="15.2026"
                      y="4.5961"
                      width="2"
                      height="15"
                      rx="1"
                      transform="rotate(45 15.2026 4.5961)"
                      fill="#525252"
                    />
                  </svg>
                </button>
              )}
              <button
                type="button"
                onClick={handleToggleChat}
                className="size-[109px]  rounded-full bg-pink-50 flex items-center justify-center shadow-2xl cursor-pointer border-0"
              >
                <div className="size-[89px]  rounded-full relative bg-[#FACEE3]">
                  <div className="absolute inset-0 rounded-full flex items-center justify-center ml-1 mb-1">
                    <img
                      src={IMAGE_PACKBOT}
                      className="h-[96px] scale-105"
                      alt=""
                    />
                  </div>
                </div>
              </button>

              <GreetingBubble
                greeting={greeting}
                loopTime={LOOP_TIME}
                hidden={isChatOpen || hiddenMessageGreeting}
              />
            </div>
          </div>
        )}

        {/* ====== Drawer Overlay ====== */}
        {isChatOpen && (
          <>
            {/* Backdrop */}
            <div
              className={`fixed inset-0 bg-black/30 z-[60] transition-opacity duration-300 ${
                isDrawerAnimating ? 'opacity-0' : 'opacity-100'
              }`}
              onClick={handleCloseChat}
            />

            {/* Drawer */}
            <div
              ref={drawerRef}
              className={`fixed bottom-0 left-0 right-0 z-[70] transition-transform duration-300 ease-out ${
                isDrawerAnimating ? 'translate-y-full' : 'translate-y-0'
              }`}
            >
              <div className=" bg-white rounded-t-[24px] h-[90svh] max-h-[600px]- flex flex-col overflow-hidden shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
                {/* Drag Handle */}
                <div className="relative z-50 flex justify-center pt-3 pb-2">
                  <div
                    className={`w-[94px] h-[5px] rounded-full  ${
                      showChatContent ? 'bg-[#E5E5E5]' : 'bg-[#737373]'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-h-0 relative">
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
                          isMobile={true}
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
                    <div className="w-full h-full flex flex-col">
                      <ChatContent
                        scrollContainerRef={scrollContainerRef}
                        onClose={handleCloseChat}
                        isActive
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </>
    )
  }

  // Desktop version
  return (
    <div className="fixed bottom-[60px] right-6 z-50 hidden md:block">
      <div className="relative">
        {/* Close button */}
        {!isChatOpen && isShowClose && (
          <button
            type="button"
            onClick={handleCloseChatWithStorage}
            className="p-1 rounded-full hover:bg-gray-100/50 border-0 cursor-pointer absolute top-[-2px] right-[-4px] z-10"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="4.59619"
                y="6.01029"
                width="2"
                height="15"
                rx="1"
                transform="rotate(-45 4.59619 6.01029)"
                fill="#525252"
              />
              <rect
                x="15.2026"
                y="4.5961"
                width="2"
                height="15"
                rx="1"
                transform="rotate(45 15.2026 4.5961)"
                fill="#525252"
              />
            </svg>
          </button>
        )}
        {/* ====== bubble ====== */}
        <button
          type="button"
          onClick={handleToggleChat}
          className="size-[109px] rounded-full bg-pink-50 flex items-center justify-center shadow-2xl cursor-pointer border-0"
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
          hidden={isChatOpen || hiddenMessageGreeting}
        />

        {/* ====== chat box ====== */}
        {isChatOpen && (
          <div className="absolute bottom-[110%] right-0">
            <div className="relative drop-shadow-lg/6">
              <div
                ref={chatBoxRef}
                className="bg-[#FAFAFA] rounded-[16px] w-[400px] h-[554px] max-h-[70svh] flex flex-col relative overflow-hidden"
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
              <div className="absolute -z-10 -bottom-3 right-10 w-0 h-0 border-l-[14px] border-r-[14px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#FAFAFA]" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(ChatBot)
