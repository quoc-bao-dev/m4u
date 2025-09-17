'use client'

import { IMAGES } from '@/core/constants/IMAGES'
import { useAuth } from '@/modules/auth/stores/useAuth'
import {
  ClockCounterClockwise,
  HeadsetIcon,
  NotePencilIcon,
  PencilSimpleLine,
  QrCode,
  SignOut,
  Translate,
  UserCircle,
} from '@phosphor-icons/react'
import moment from 'moment'
import 'moment/locale/ko'
import 'moment/locale/vi'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'

const MyReviewSidebar = () => {
  const t = useTranslations()
  const locale = useLocale()
  const { user, isAuthenticated } = useAuth()

  const formatJoinDate = (dateString: string) => {
    try {
      const m = moment(dateString)
      if (!m.isValid()) return t('menu.auth.unknown')
      const momentLocale = locale === 'kr' ? 'ko' : locale || 'en'
      const formatted = m.locale(momentLocale).format('L')
      return t('menu.auth.joinedSince', { date: formatted })
    } catch {
      return t('menu.auth.unknown')
    }
  }

  const [activeItem, setActiveItem] = useState<
    | 'trial'
    | 'reviews'
    | 'donation'
    | 'language'
    | 'account'
    | 'help'
    | 'feedback'
    | 'logout'
  >('reviews')

  const activityItems = useMemo(
    () => [
      {
        id: 'trial' as const,
        label: 'Trial registration history',
        Icon: ClockCounterClockwise,
      },
      { id: 'reviews' as const, label: 'My reviews', Icon: PencilSimpleLine },
      { id: 'donation' as const, label: 'Referral program', Icon: QrCode },
    ],
    []
  )

  const settingsGeneral = useMemo(
    () => [
      {
        id: 'language' as const,
        label: t('menu.settings.general.language'),
        Icon: Translate,
      },
      {
        id: 'account' as const,
        label: 'Account preferences',
        Icon: UserCircle,
      },
    ],
    [t]
  )

  const settingsSupport = useMemo(
    () => [
      {
        id: 'help' as const,
        label: t('menu.settings.support.help-centre'),
        Icon: HeadsetIcon,
      },
      {
        id: 'feedback' as const,
        label: t('menu.settings.support.feedback-submission'),
        Icon: NotePencilIcon,
      },
      { id: 'logout' as const, label: 'Log out', Icon: SignOut },
    ],
    [t]
  )

  return (
    <div className="rounded-2xl overflow-hidden border border-greyscale-200 bg-white shadow-[0px_4px_24px_0px_#0000000F]">
      {/* Header */}
      <div className="relative pt-6 pb-4 px-6">
        <Image
          src={IMAGES.topGradient2}
          alt="top-gradient"
          width={1000}
          height={600}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none -translate-y-1/2 scale-x-[-1.3]"
        />
        <div className="relative z-[1] flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-16 rounded-full overflow-hidden bg-greyscale-100 border-2 border-gray-200 relative">
              {isAuthenticated && user ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatar || '/placeholder-avatar.jpg'}
                  alt={user.fullname || t('menu.auth.unknownUser')}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/image/avatar/image-01.png'
                  }}
                />
              ) : (
                <div className="w-full h-full bg-greyscale-100" />
              )}
              {/* <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-white shadow-xs border border-greyscale-200 flex items-center justify-center">
                <CameraIcon size={12} weight="fill" className="text-pink-500" />
              </div> */}
            </div>
            <div className="flex-1">
              <div className="text-base font-semibold text-greyscale-900">
                {isAuthenticated && user
                  ? user.fullname || t('menu.auth.unknownUser')
                  : t('menu.auth.loadingUser')}
              </div>
              <div className="text-sm text-greyscale-400 mt-0.5">
                {isAuthenticated && user
                  ? formatJoinDate(user.created_at)
                  : t('menu.auth.unknown')}
              </div>
              <div className="mt-2 inline-flex items-center gap-1 bg-[#FFD4001A] px-3 py-1 rounded-full">
                <GoldIcon />
                <span className="text-xs font-medium text-[#FF9900]">
                  {t('menu.auth.membership.gold')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-[1] flex justify-between gap-2 mt-5 rounded-xl w-full px-3">
          <div className="text-center">
            <div className="text-base leading-6 font-bold text-greyscale-900 mb-1">
              {isAuthenticated && user && user.referral_code ? 69 : '0'}
            </div>
            <div className="text-[12px] text-greyscale-500">Referrals</div>
          </div>
          <div className="text-center">
            <div className="text-base leading-6 font-bold text-greyscale-900 mb-1">
              {'12,345,678 đ'}
            </div>
            <div className="text-[12px] text-greyscale-500 truncate">
              Commission Revenue
            </div>
          </div>
          <div className="text-center">
            <div className="text-base leading-6 font-bold text-greyscale-900 mb-1">
              {isAuthenticated && user ? user.point || '0' : '0'}
            </div>
            <div className="text-[12px] text-greyscale-500 truncate">
              Reviews
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 pb-6">
        {/* My Activity */}
        <div className="pt-2">
          <div className="text-base font-bold text-greyscale-700 tracking-wide">
            MY ACTIVITY
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {activityItems.map(({ id, label, Icon }) => (
              <SidebarItem
                key={id}
                icon={
                  <Icon size={16} weight="fill" className="text-[#3B82F6]" />
                }
                label={label}
                active={activeItem === id}
                onClick={() => setActiveItem(id)}
              />
            ))}
          </div>
        </div>

        <div className="my-5 h-px w-full bg-greyscale-200" />

        {/* Settings */}
        <div>
          <div className="text-base font-bold text-greyscale-700 tracking-wide">
            SETTINGS
          </div>
          <div className="mt-3">
            <div className="text-sm font-medium text-greyscale-500">
              General
            </div>
            <div className="mt-2 flex flex-col gap-2">
              {settingsGeneral.map(({ id, label, Icon }) => (
                <SidebarItem
                  key={id}
                  icon={
                    <Icon size={16} weight="fill" className="text-[#3B82F6]" />
                  }
                  label={label}
                  active={activeItem === id}
                  onClick={() => setActiveItem(id)}
                />
              ))}
            </div>

            <div className="mt-4 text-xs font-medium text-greyscale-500">
              Support
            </div>
            <div className="mt-2 flex flex-col gap-2">
              {settingsSupport.map(({ id, label, Icon }) => (
                <SidebarItem
                  key={id}
                  icon={
                    <Icon
                      size={16}
                      weight="fill"
                      className={
                        id === 'logout' ? 'text-red-400' : 'text-[#3B82F6]'
                      }
                    />
                  }
                  label={label}
                  active={activeItem === id}
                  onClick={() => setActiveItem(id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SidebarItem = ({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl  px-3 py-2 cursor-pointer transition-colors ${
        active ? 'bg-[#E7F7FE]  hover:bg-blue-100' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="size-8 rounded-lg flex items-center justify-center border border-greyscale-200 bg-white">
        {icon}
      </div>
      <span className="text-sm text-greyscale-700">{label}</span>
    </div>
  )
}

export default MyReviewSidebar

const GoldIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
    >
      <g clipPath="url(#clip0_18430_21867)">
        <path
          d="M8 16.4645C3.58878 16.4645 0 12.8757 0 8.46448C0 4.05326 3.58878 0.464478 8 0.464478C12.4112 0.464478 16 4.05326 16 8.46448C16 12.8757 12.4112 16.4645 8 16.4645Z"
          fill="#FFD400"
        />
        <path
          d="M16 8.46448C16 4.05326 12.4112 0.464478 8 0.464478V16.4645C12.4112 16.4645 16 12.8757 16 8.46448Z"
          fill="#FFD400"
        />
        <path
          d="M8 14.5582C4.63991 14.5582 1.90625 11.8246 1.90625 8.46448C1.90625 5.10438 4.63991 2.37073 8 2.37073C11.3601 2.37073 14.0938 5.10438 14.0938 8.46448C14.0938 11.8246 11.3601 14.5582 8 14.5582Z"
          fill="#FF9F00"
        />
        <path
          d="M14.0938 8.46448C14.0938 5.10438 11.3601 2.37073 8 2.37073V14.5582C11.3601 14.5582 14.0938 11.8246 14.0938 8.46448Z"
          fill="#FF9F00"
        />
        <path
          d="M9.3793 7.56324L8.36602 6.29665C8.17836 6.06209 7.82161 6.06209 7.63395 6.29665L6.62067 7.56324L5.08461 6.79521C4.73573 6.62077 4.33883 6.9239 4.41533 7.3064L5.04033 10.4314C5.08417 10.6505 5.27655 10.8082 5.49998 10.8082H10.5C10.7234 10.8082 10.9158 10.6505 10.9596 10.4314L11.5846 7.3064C11.6611 6.9239 11.2643 6.62077 10.9154 6.79521L9.3793 7.56324Z"
          fill="#FFD400"
        />
        <path
          d="M10.5 10.8082C10.7234 10.8082 10.9158 10.6505 10.9597 10.4314L11.5847 7.30642C11.6612 6.92392 11.2643 6.62079 10.9154 6.79523L9.37931 7.56326L8.36603 6.29667C8.27222 6.17938 8.13609 6.12073 8 6.12073V10.8082H10.5Z"
          fill="#FFD400"
        />
      </g>
      <defs>
        <clipPath id="clip0_18430_21867">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0 0.464478)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
