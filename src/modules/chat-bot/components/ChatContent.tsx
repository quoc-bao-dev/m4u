import { RefObject, useEffect, useRef } from 'react'

import { ChatMessageItem } from '@/services/chat-bot'

import { chatStore } from '../store/chatStore'
import Message from './Message'
import TypingMessage from './TypingMessage'
import styles from './ChatContent.module.css'

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

    scrollToBottom('smooth')
  }, [messages, isChatBotTyping, isActive])

  // Xử lý riêng lần đầu chuyển tab sang màn hình chat:
  // chờ animation slide hoàn thành rồi mới scroll để tránh bị giật
  useEffect(() => {
    if (!isActive) return
    if (hasActivatedRef.current) return

    hasActivatedRef.current = true

    const timeout = window.setTimeout(() => {
      // Lần đầu có thể dùng 'auto' hoặc 'smooth' đều được,
      // chọn 'smooth' để giữ trải nghiệm mượt mà
      scrollToBottom('smooth')
    }, 550) // khớp với duration 500ms của transition + một chút buffer

    return () => {
      window.clearTimeout(timeout)
    }
  }, [isActive])

  return (
    <div className="h-full flex flex-col bg-[#FAFAFA] rounded-[16px]">
      {/* ===== chat box header ===== */}
      <div className="px-6 py-4 bg-white flex justify-between items-center rounded-t-[16px] shadow-[0px_3px_14.1px_0px_#0000000F]">
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
              <p className="text-[#72777A] text-xs">Đang hoạt động</p>
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
          {messages.map((item: ChatMessageItem, index: number) => (
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
