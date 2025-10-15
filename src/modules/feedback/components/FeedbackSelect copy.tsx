'use client'

import { cn } from '@/core/utils'
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

const feedbackOptions: FeedbackOption[] = [
  {
    icon: '/image/feedback/icon/image-05.png',
    iconActive: '/image/feedback/icon/image-05-at.png',
    value: 5,
    label: 'Awesome - Very helpful, works great!',
  },
  {
    icon: '/image/feedback/icon/image-04.png',
    iconActive: '/image/feedback/icon/image-04-at.png',
    value: 4,
    label: 'Satisfied - Stable operation, easy to use',
  },
  {
    icon: '/image/feedback/icon/image-03.png',
    iconActive: '/image/feedback/icon/image-03-at.png',
    value: 3,
    label: 'Okay - Usable but not very smooth',
  },
  {
    icon: '/image/feedback/icon/image-02.png',
    iconActive: '/image/feedback/icon/image-02-at.png',
    value: 2,
    label: 'Needs improvement - Operation is not smooth',
  },
  {
    icon: '/image/feedback/icon/image-01.png',
    iconActive: '/image/feedback/icon/image-01-at.png',
    value: 1,
    label: 'Not good - Still a lot to optimize',
  },
]

const FeedbackSelect = ({
  selected,
  onChange,
  defaultActive,
}: FeedbackSelectProps) => {
  const handleSelect = (value: number) => {
    onChange(value)
  }

  // Tìm option hiện tại được chọn
  const currentOption =
    feedbackOptions.find((option) => option.value === selected) ||
    feedbackOptions[0]

  return (
    <div className="flex flex-col gap-5 h-[156px]">
      <div className="pt-5">
        <div className="flex gap-0 justify-center items-center">
          {feedbackOptions.map((iconOption) => {
            const iconIsActive = selected === iconOption.value
            return (
              <button
                key={iconOption.value}
                type="button"
                onClick={() => handleSelect(iconOption.value)}
                className="transition-all duration-200 hover:scale-105 flex-shrink-0"
              >
                <div
                  className={cn(
                    'relative',
                    iconIsActive
                      ? 'w-[140px] h-[140px] -mx-4 z-0'
                      : 'w-[60px] h-[60px] mx-2 z-10'
                  )}
                >
                  <Image
                    src={iconIsActive ? iconOption.iconActive : iconOption.icon}
                    alt={`Feedback ${iconOption.value}`}
                    width={200}
                    height={200}
                    className="transition-all duration-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain"
                  />
                </div>
              </button>
            )
          })}
        </div>
        <div className="pl-2 pt-2">
          <p className="text-sm text-gray-700 font-semibold">
            {currentOption.label}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FeedbackSelect
