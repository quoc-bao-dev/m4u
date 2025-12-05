import { usePackbotIntro } from '@/services/chat-bot'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

type GreetingScreenProps = {
  onStart: () => void
  onClose: () => void
  isMobile?: boolean
}

const IMAGE_GREETING = '/chat-bot/pack-bot.gif'

const GreetingScreen = ({
  onStart,
  onClose,
  isMobile = false,
}: GreetingScreenProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const t = useTranslations('chatBot')

  const { data: packbotIntro, isLoading } = usePackbotIntro()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, 50)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div
      className={`relative w-full  ${
        isMobile
          ? 'bg-gradient-to-b from-[#FFDAF3] to-[#FAFAFA] -mt-[28px] h-[110%]'
          : 'bg-gradient-to-b from-[#FFDAF3] to-[#FAFAFA] rounded-[16px] h-full'
      } overflow-hidden`}
    >
      {true && (
        <div className="absolute top-[16px] right-[24px] z-50">
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
      )}
      <div
        className={`flex flex-col gap-4 justify-center items-center h-full transform transition-all duration-500 ease-out px-4 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <img
          src={IMAGE_GREETING}
          alt=""
          className={`${
            isMobile ? 'w-[227px]' : 'w-[227px]'
          } mx-auto min-h-[267px]`}
        />

        <div className="flex gap-2 items-start">
          {isLoading ? (
            <div className="flex flex-col gap-2 w-[297px]">
              <Skeleton
                className={`${isMobile ? 'h-3' : 'h-4'} w-full rounded`}
              />
              <Skeleton
                className={`${isMobile ? 'h-3' : 'h-4'} w-5/6 mx-auto rounded`}
              />
              <Skeleton
                className={`${isMobile ? 'h-3' : 'h-4'} w-4/5 mx-auto rounded`}
              />
            </div>
          ) : (
            <p
              className={`${
                isMobile ? 'text-lg' : 'text-sm'
              } text-center whitespace-break-spaces w-[360px]  md:w-[297px]`}
            >
              {packbotIntro?.data.content}
            </p>
          )}
        </div>

        <div className="mx-auto">
          <button
            type="button"
            onClick={onStart}
            className={`flex-1 px-6 py-3 rounded-full bg-[#F466AA] text-white ${
              isMobile ? 'text-sm' : 'text-sm'
            } font-medium transition-colors hover:bg-[#DB5B9A] active:bg-[#DB5B9A]`}
          >
            {t('startSurvey')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default GreetingScreen
