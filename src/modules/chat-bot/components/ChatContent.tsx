import { ChatMessageItem } from '@/services/chat-bot'
import { useTranslations } from 'next-intl'
import { RefObject, useEffect, useRef } from 'react'
import { chatStore } from '../store/chatStore'
import styles from './ChatContent.module.css'
import Message from './Message'
import TypingMessage from './TypingMessage'

const IMAGE_AVATAR = '/chat-bot/Avatar.png'

type ChatContentProps = {
  scrollContainerRef: RefObject<HTMLDivElement | null>
  onClose: () => void
  isActive: boolean
}

function ChatContent({
  scrollContainerRef,
  onClose,
  isActive,
}: ChatContentProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const hasActivatedRef = useRef(false)
  const isFirstScrollRef = useRef(true)
  const t = useTranslations('chatBot')

  const { message: messages, isChatBotTyping } = chatStore()

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (!scrollContainerRef.current) return

    // Ưu tiên scroll mượt xuống phần tử "đáy" bên trong container,
    // để đảm bảo luôn tới đúng cuối danh sách tin nhắn
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior, block: 'end' })
      return
    }

    // Fallback nếu vì lý do nào đó bottomRef chưa sẵn sàng
    const container = scrollContainerRef.current
    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    })
  }

  // Auto scroll khi có message mới / typing thay đổi,
  // chỉ khi màn hình này đang active và đã từng được kích hoạt trước đó
  useEffect(() => {
    if (!isActive) return
    if (!hasActivatedRef.current) return

    // Lần đầu scroll instant, các lần sau smooth
    const behavior = isFirstScrollRef.current ? 'auto' : 'smooth'
    scrollToBottom(behavior)

    // Đánh dấu đã scroll lần đầu
    if (isFirstScrollRef.current) {
      isFirstScrollRef.current = false
    }
  }, [messages, isChatBotTyping, isActive])

  // Reset first scroll flag khi isActive thay đổi
  useEffect(() => {
    if (isActive) {
      isFirstScrollRef.current = true
    }
  }, [isActive])

  // Xử lý riêng lần đầu chuyển tab sang màn hình chat:
  // chờ animation slide hoàn thành rồi mới scroll để tránh bị giật
  useEffect(() => {
    if (!isActive) return
    if (hasActivatedRef.current) return

    hasActivatedRef.current = true

    const timeout = window.setTimeout(() => {
      // Lần đầu scroll instant để hiển thị ngay lập tức
      scrollToBottom('auto')
      // Đánh dấu đã scroll lần đầu
      isFirstScrollRef.current = false
    }, 550) // khớp với duration 500ms của transition + một chút buffer

    return () => {
      window.clearTimeout(timeout)
    }
  }, [isActive])

  return (
    <div className="h-full flex flex-col bg-[#FAFAFA] md:rounded-[16px]">
      {/* ===== chat box header ===== */}
      <div className="px-6 py-4 bg-white flex justify-between items-center md:rounded-t-[16px] shadow-[0px_3px_14.1px_0px_#0000000F]">
        {/* ==== chat bot info ==== */}
        <div className="flex gap-2 items-center">
          <img
            src={IMAGE_AVATAR}
            alt=""
            className="size-[44px] object-contain"
          />

          <div className="flex flex-col gap-1 h-fit">
            <p className=" text-[#171717] font-semibold text-sm">Packbot</p>

            <div className="flex items-center gap-1 ">
              <div className="size-[8px] rounded-full bg-[#1DAC8E]"></div>
              <p className="text-[#72777A] text-xs">{t('active')}</p>
            </div>
          </div>
        </div>

        {/* ==== close ==== */}
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-full bg-[#7C80831A] border-0 cursor-pointer"
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
      </div>

      {/* ===== chat box body ===== */}
      <div
        ref={scrollContainerRef}
        className={`flex-1 min-h-0 overflow-y-scroll overflow-x-hidden rounded-b-[16px] ${styles.scrollContainer}`}
      >
        {/* ==== chat content ==== */}
        <div className="px-5 py-4 flex flex-col gap-3">
          {/* ==== messsage item ==== */}
          {messages.map((item: ChatMessageItem) => (
            <Message key={item?.id} {...item} />
          ))}

          {/* ==== typing indicator ==== */}
          {isChatBotTyping && <TypingMessage />}

          {/* ==== scroll to bottom ===== */}
        </div>
        <div className="" ref={bottomRef}></div>
      </div>
      <div className="h-3"></div>
    </div>
  )
}

export default ChatContent
