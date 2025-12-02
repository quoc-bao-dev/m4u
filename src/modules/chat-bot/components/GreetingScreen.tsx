import { useEffect, useState } from 'react'

type GreetingScreenProps = {
  onStart: () => void
  onClose: () => void
}

const IMAGE_GREETING = '/chat-bot/greeting.png'
const IMAGE_LIGHT = '/chat-bot/icon-light.png'

const GreetingScreen = ({ onStart, onClose }: GreetingScreenProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, 50)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#FFDAF3] to-[#FAFAFA] rounded-[16px] overflow-hidden">
      <div className="absolute top-[16px] right-[24px]">
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
      <div
        className={`flex flex-col gap-4 justify-center items-center h-full transform transition-all duration-500 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <img src={IMAGE_GREETING} alt="" className="w-[227px] mx-auto" />

        <div className="flex gap-2">
          <img src={IMAGE_LIGHT} alt="" className="size-[20px] " />
          <p className="w-[300px] mx-auto text-sm">
            Xin chào! Mình là Packbot. Mình là trợ lý chăm sóc da của M4U. Hãy
            hoàn thành bài khảo sát, mình sẽ gợi ý sản phẩm phù hợp nhất với làn
            da của bạn.
          </p>
        </div>

        <div className="mx-auto">
          <button
            type="button"
            onClick={onStart}
            className="flex-1 px-4 py-2 rounded-full bg-[#F466AA] text-white text-sm font-medium transition-colors hover:bg-[#DB5B9A]"
          >
            Bắt đầu khảo sát
          </button>
        </div>
      </div>
    </div>
  )
}

export default GreetingScreen
