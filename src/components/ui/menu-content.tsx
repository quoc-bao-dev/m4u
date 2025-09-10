'use client'

import { IMAGES } from '@/core/constants/IMAGES'
import {
  CalendarPlusIcon,
  CubeIcon,
  HandHeartIcon,
  HeadsetIcon,
  NotePencilIcon,
  StarIcon,
  TranslateIcon,
} from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguageSwitch, Language } from '@/locale/hooks/useLanguageSwitch'

// Data mapping for Product & Community section
const productCommunityItems = [
  {
    id: 'trial-samples',
    label: 'Trial samples',
    icon: 'CubeIcon',
    href: '/vi/trial-registration',
  },
  {
    id: 'donation-charity',
    label: 'Donation & Charity',
    icon: 'HandHeartIcon',
    href: '/vi/donation-charity',
  },
  {
    id: 'review-hub',
    label: 'Review hub',
    icon: 'StarIcon',
    href: '/vi/review-hub',
  },
  {
    id: 'event',
    label: 'Event',
    icon: 'CalendarPlusIcon',
    href: '/vi/event',
  },
]

// Data mapping for Settings section
const settingsItems = {
  general: [
    {
      id: 'language',
      label: 'Language',
      icon: 'TranslateIcon',
    },
  ],
  support: [
    {
      id: 'help-centre',
      label: 'Help centre',
      icon: 'HeadsetIcon',
    },
    {
      id: 'feedback-submission',
      label: 'Feedback Submission',
      icon: 'NotePencilIcon',
    },
  ],
}

// Reviewer status options
const reviewerOptions = [
  {
    id: 'yes',
    label: "Yes, I'm a member",
    value: true,
  },
  {
    id: 'no',
    label: 'Not yet, sign me up',
    value: false,
  },
]

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
  const iconMap = {
    CubeIcon,
    HandHeartIcon,
    StarIcon,
    CalendarPlusIcon,
    TranslateIcon,
    HeadsetIcon,
    NotePencilIcon,
  }
  return iconMap[iconName as keyof typeof iconMap] || CubeIcon
}

// Language options data
const languageOptions = [
  {
    id: 'vi',
    label: 'VN',
    flag: IMAGES.vi,
    name: 'Tiếng Việt',
  },
  {
    id: 'en',
    label: 'US',
    flag: IMAGES.us,
    name: 'English',
  },
  {
    id: 'ko',
    label: 'KR',
    flag: IMAGES.kr,
    name: '한국어',
  },
]

interface MenuContentProps {
  isReviewer: boolean | null
  setIsReviewer: (value: boolean) => void
  onClose: () => void
  isMobile?: boolean
}

const MenuContent = ({ isReviewer, setIsReviewer, onClose, isMobile = false }: MenuContentProps) => {
  const { switchLanguage, currentLocale } = useLanguageSwitch()

  // Map current locale to our language options
  const getCurrentLanguage = () => {
    switch (currentLocale) {
      case 'vi':
        return 'vi'
      case 'en':
        return 'en'
      case 'ko':
        return 'ko'
      default:
        return 'vi'
    }
  }

  return (
    <>
      {/* Reviewer Question Section */}
      <div className="py-2 pb-6 md:py-6 px-4 flex flex-col gap-3 relative overflow-hidden">
        <div className="absolute top-[calc(33.33%-2px)] left-0 w-full h-10 bg-gradient-to-b from-white to-transparent z-[2] pointer-events-none"></div>
        <Image
          src={IMAGES.topGradient}
          alt="top-gradient"
          width={1000}
          height={1000}
          className="absolute top-1/3 left-0 w-full h-full object-cover z-[1] pointer-events-none"
        />

        <h2 className="text-lg font-semibold text-greyscale-900 z-[3]">
          Are you an M4U&apos;s reviewer?
        </h2>
        <div className="flex gap-3 z-[3]">
          {reviewerOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setIsReviewer(option.value)}
              className={`${
                isMobile ? 'flex-1' : 'w-[184px]'
              } px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                isReviewer === option.value
                  ? 'bg-pink-600 text-white'
                  : 'bg-white border border-pink-600 text-pink-600 hover:bg-pink-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="flex flex-col gap-4 py-6 px-4 bg-white z-10 relative rounded-t-2xl -mt-3">
        <div className="flex flex-col gap-4 shadow-[0px_4px_24px_0px_#0000000F] rounded-xl pb-3">
          <h3 className="text-base font-bold text-greyscale-700 py-2 px-3 border-b border-greyscale-200">
            Product & Community
          </h3>
          <div className="grid grid-cols-2 gap-4 px-3">
            {productCommunityItems.map((item) => {
              const IconComponent = getIconComponent(item.icon)
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-2 cursor-pointer group"
                  onClick={onClose}
                >
                  <div className="size-8 rounded-lg flex items-center justify-center border border-greyscale-200">
                    <IconComponent
                      weight="fill"
                      size={16}
                      className="text-[#3B82F6] group-hover:text-blue-500"
                    />
                  </div>
                  <span className="text-sm font-normal text-greyscale-700 group-hover:text-blue-500">
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4 shadow-[0px_4px_24px_0px_#0000000F] rounded-xl pb-3">
          <h3 className="text-base font-bold text-greyscale-700 py-2 px-3 border-b border-greyscale-200">
            Settings
          </h3>

          <div className="px-3 flex flex-col gap-3">
            <h4 className="text-sm font-medium text-greyscale-500">
              General
            </h4>
            <div className="flex items-center justify-between gap-3">
              {settingsItems.general.map((item) => {
                const IconComponent = getIconComponent(item.icon)
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <div className="size-8 rounded-lg flex items-center justify-center border border-greyscale-200">
                      <IconComponent
                        weight="fill"
                        size={16}
                        className="text-[#3B82F6] group-hover:text-blue-500"
                      />
                    </div>
                    <span className="text-sm font-normal text-greyscale-700">
                      {item.label}
                    </span>
                  </div>
                )
              })}

              {/* Language Selector */}
              <div className="flex items-center gap-1 bg-greyscale-50 rounded-xl p-1">
                {languageOptions.map((lang) => (
                   <button
                     key={lang.id}
                     onClick={() => {
                       switchLanguage(lang.id as Language)
                       onClose()
                     }}
                     className={`flex items-center border gap-1.5 px-1.5 py-1 rounded-lg transition-all duration-200 cursor-pointer ${
                       getCurrentLanguage() === lang.id
                         ? 'bg-white shadow-xs border-greyscale-200'
                         : 'hover:bg-white/50 border-transparent'
                     }`}
                   >
                    <Image
                      src={lang.flag}
                      alt={lang.name}
                      width={100}
                      height={100}
                      className="rounded-full object-cover size-5"
                    />
                    <span
                      className={`text-xs font-medium ${
                        getCurrentLanguage() === lang.id
                          ? 'text-greyscale-900'
                          : 'text-greyscale-600'
                      }`}
                    >
                      {lang.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="px-3 flex flex-col gap-3">
            <h4 className="text-sm font-medium text-greyscale-500">
              Support
            </h4>
            <div className="flex flex-col gap-2">
              {settingsItems.support.map((item) => {
                const IconComponent = getIconComponent(item.icon)
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="size-8 rounded-lg flex items-center justify-center border border-greyscale-200">
                      <IconComponent
                        weight="fill"
                        size={16}
                        className="text-[#3B82F6] group-hover:text-blue-500"
                      />
                    </div>
                    <span className="text-sm font-normal text-greyscale-700 group-hover:text-blue-500">
                      {item.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MenuContent
