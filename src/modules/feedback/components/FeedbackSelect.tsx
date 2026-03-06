'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface FeedbackOption {
  icon: string
  iconActive: string
  value: number
  label: string
}

interface FeedbackSelectProps {
  selected: number
  onChange: (value: number) => void
  defaultActive?: number
}

const FeedbackSelect = ({
  selected,
  onChange,
  defaultActive = 0,
}: FeedbackSelectProps) => {
  const t = useTranslations('feedback.select')

  const feedbackOptions: FeedbackOption[] = [
    {
      icon: '/image/feedback/icon/image-05.png',
      iconActive: '/image/feedback/icon/image-05-at.png',
      value: 5,
      label: t('awesome'),
    },
    {
      icon: '/image/feedback/icon/image-04.png',
      iconActive: '/image/feedback/icon/image-04-at.png',
      value: 4,
      label: t('satisfied'),
    },
    {
      icon: '/image/feedback/icon/image-03.png',
      iconActive: '/image/feedback/icon/image-03-at.png',
      value: 3,
      label: t('okay'),
    },
    {
      icon: '/image/feedback/icon/image-02.png',
      iconActive: '/image/feedback/icon/image-02-at.png',
      value: 2,
      label: t('needsImprovement'),
    },
    {
      icon: '/image/feedback/icon/image-01.png',
      iconActive: '/image/feedback/icon/image-01-at.png',
      value: 1,
      label: t('notGood'),
    },
  ]

  const handleSelect = (value: number) => {
    onChange(value)
  }

  // Sử dụng selected hoặc defaultActive
  const activeValue = selected !== 0 ? selected : defaultActive

  // Tìm option hiện tại được chọn
  const currentOption =
    feedbackOptions.find((option) => option.value === activeValue) ||
    feedbackOptions[0]

  return (
    <div className="flex flex-col gap-3 sm:gap-5 h-[90px] sm:h-[116px]">
      <div className="pt-3 sm:pt-5">
        <div className="flex gap-0.5 sm:gap-1 justify-center items-center h-[60px] sm:h-[80px]">
          {feedbackOptions.map((iconOption) => {
            const iconIsActive = activeValue === iconOption.value
            return (
              <button
                key={iconOption.value}
                type="button"
                onClick={() => handleSelect(iconOption.value)}
                className="cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0 group"
              >
                <div className="relative w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] flex items-center justify-center">
                  <div
                    className={`transition-all duration-200 object-contain group-hover:drop-shadow-lg ${
                      iconIsActive ? 'scale-160 z-0' : 'scale-[1.25]'
                    }`}
                  >
                    <div className={iconIsActive ? '' : 'p-4'}>
                      <Image
                        src={
                          iconIsActive ? iconOption.iconActive : iconOption.icon
                        }
                        alt={`Feedback ${iconOption.value}`}
                        width={200}
                        height={200}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
        <div className="pl-1 sm:pl-2 pt-1 sm:pt-2">
          <p className="text-xs sm:text-sm text-gray-700 font-semibold">
            {currentOption.label}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FeedbackSelect
