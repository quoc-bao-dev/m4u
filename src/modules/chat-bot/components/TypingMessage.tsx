const IMAGE_AVATAR = '/chat-bot/Avatar.png'

function TypingMessage() {
  return (
    <div className="flex gap-2">
      <img src={IMAGE_AVATAR} alt="" className="size-[35px] object-contain" />
      <div className="flex-1">
        <div className="bg-[#FFF0F7] rounded-b-[24px] rounded-r-[24px] p-4 w-fit">
          <div className="flex items-center gap-1">
            <span className="sr-only">Packbot đang trả lời...</span>
            <div className="flex items-end gap-[3px]">
              <span className="inline-block size-[6px] rounded-full bg-[#A3A3A3] animate-bounce [animation-delay:0ms]" />
              <span className="inline-block size-[6px] rounded-full bg-[#A3A3A3] animate-bounce [animation-delay:150ms]" />
              <span className="inline-block size-[6px] rounded-full bg-[#A3A3A3] animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypingMessage
