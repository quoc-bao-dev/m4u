'use client'

import LanguageSwitcher from '@/core/components/layout/header/LanguageSwitcher'
import UserAvatar from '@/core/components/UserAvatar'
import { IMAGES } from '@/core/constants/IMAGES'
import { Link } from '@/locale'
import { Language, useLanguageSwitch } from '@/locale/hooks/useLanguageSwitch'
import { useLogoutConfirmModal } from '@/modules/auth'
import { useAuth } from '@/modules/auth/stores/useAuth'
import { useReferralIntroduceInfoQuery } from '@/services/referral-program'
import {
  Bell,
  CameraIcon,
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
import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'

const PersonalSidebar = () => {
  const t = useTranslations()
  const { switchLanguage, currentLocale } = useLanguageSwitch()
  const locale = useLocale()
  const { user, isAuthenticated } = useAuth()
  const { open: openLogoutConfirmModal } = useLogoutConfirmModal()
  const { data } = useReferralIntroduceInfoQuery()
  const pathname = usePathname()

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

  // Function to check if a path is active
  const isActiveRoute = (href: string) => {
    if (!href || href === '/developing') return false
    return pathname.includes(href)
  }

  const activityItems = useMemo(
    () => [
      {
        id: 'trial' as const,
        label: t('menu.auth.activity.trialHistory'),
        Icon: ClockCounterClockwise,
        href: '/trial-history',
      },
      {
        id: 'reviews' as const,
        label: t('menu.auth.activity.myReviews'),
        Icon: PencilSimpleLine,
        href: '/my-reviews',
      },
      {
        id: 'donation' as const,
        label: t('menu.auth.activity.referralCode'),
        Icon: QrCode,
        href: '/referral-program',
      },
      {
        id: 'notification' as const,
        label: t('menu.auth.activity.notification'),
        Icon: Bell,
        href: '/notification',
      },
    ],
    [t]
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
        label: t('menu.auth.account.preferences'),
        Icon: UserCircle,
        href: '/personal',
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
        href: '/help-centre',
      },
      {
        id: 'feedback' as const,
        label: t('menu.settings.support.feedback-submission'),
        Icon: NotePencilIcon,
        href: '/feedback',
      },
      { id: 'logout' as const, label: t('menu.auth.logout'), Icon: SignOut },
    ],
    [t]
  )

  return (
    <div className="lg:rounded-2xl overflow-hidden  lg:bg-white lg:shadow-[0px_4px_24px_0px_#0000000F] h-full flex flex-col min-h-0">
      {/* Header */}
      <div className="relative pt-6 pb-4 md:px-3 2xl:px-6">
        <Image
          src={IMAGES.topGradient2}
          alt="top-gradient"
          width={1000}
          height={600}
          className="hidden lg:block absolute -top-6 w-full h-full object-cover pointer-events-none -translate-y-1/2 scale-x-[-1.8]"
        />
        <div className="relative z-[1] flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-fit">
              <UserAvatar
                src={user?.avatar}
                userName={user?.fullname}
                size={64}
              />
              <div className="absolute bottom-0 -right-1 size-6 rounded-full bg-gray-50 shadow-xs flex items-center justify-center">
                <CameraIcon size={18} className="text-pink-500" />
              </div>
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
                <span className="text-xs font-medium text-[#FF9900] truncate">
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
              {data?.guest || 0}
            </div>
            <div className="text-[12px] text-greyscale-500 truncate">
              {t('menu.auth.stats.referrals')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-base leading-6 font-bold text-greyscale-900 mb-1">
              {'0 ₫'}
            </div>
            <div className="text-[12px] text-greyscale-500 truncate">
              {t('menu.auth.stats.commissionRevenue')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-base leading-6 font-bold text-greyscale-900 mb-1">
              {data?.review || 0}
            </div>
            <div className="text-[12px] text-greyscale-500 truncate">
              {t('menu.auth.stats.reviews')}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="md:px-3 2xl:px-6 pb-6 overflow-y-auto min-h-0 flex-1">
        {/* My Activity */}
        <div className="pt-2">
          <div className="text-base font-bold text-greyscale-700 tracking-wide">
            {t('menu.auth.activity.title')}
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {activityItems.map(({ id, label, Icon, href }) => (
              <SidebarItem
                key={id}
                icon={
                  <Icon size={16} weight="fill" className="text-[#3B82F6]" />
                }
                label={label}
                active={isActiveRoute(href)}
                href={href}
              />
            ))}
          </div>
        </div>

        <div className="my-5 h-px w-full bg-greyscale-200" />

        {/* Settings */}
        <div>
          <div className="text-base font-bold text-greyscale-700 tracking-wide">
            {t('menu.section.settings')}
          </div>
          <div className="mt-3">
            <div className="text-sm font-medium text-greyscale-500">
              {t('menu.section.general')}
            </div>
            <div className="mt-2 flex flex-col gap-2">
              {settingsGeneral.map(({ id, label, Icon, href }) => {
                if (id === 'language') {
                  const languageOptions = [
                    {
                      id: 'vi',
                      label: 'VN',
                      flag: IMAGES.vi,
                      name: 'Tiếng Việt',
                    },
                    { id: 'en', label: 'US', flag: IMAGES.us, name: 'English' },
                    { id: 'kr', label: 'KR', flag: IMAGES.kr, name: '한국어' },
                  ]

                  const getCurrentLanguage = () => {
                    switch (currentLocale) {
                      case 'vi':
                        return 'vi'
                      case 'en':
                        return 'en'
                      case 'kr':
                        return 'kr'
                      default:
                        return 'vi'
                    }
                  }

                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-3 rounded-xl px-3 py-2">
                        <div className="size-8 rounded-lg flex items-center justify-center border border-greyscale-200 bg-white">
                          <Icon
                            size={16}
                            weight="fill"
                            className="text-[#3B82F6]"
                          />
                        </div>
                        <span className="text-sm text-greyscale-700 truncate">
                          {label}
                        </span>
                      </div>
                      <LanguageSwitcher size="sm" />
                    </div>
                  )
                }

                return (
                  <SidebarItem
                    key={id}
                    icon={
                      <Icon
                        size={16}
                        weight="fill"
                        className="text-[#3B82F6]"
                      />
                    }
                    label={label}
                    active={isActiveRoute(href)}
                    href={href}
                  />
                )
              })}
            </div>

            <div className="mt-4 text-xs font-medium text-greyscale-500">
              {t('menu.section.support')}
            </div>
            <div className="mt-2 flex flex-col gap-2">
              {settingsSupport.map(({ id, label, Icon, href }) => (
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
                  active={href ? isActiveRoute(href) : false}
                  onClick={id === 'logout' ? openLogoutConfirmModal : undefined}
                  href={id === 'logout' ? undefined : href}
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
  href,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
  href?: string
}) => {
  const content = (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-3 py-2 cursor-pointer transition-colors ${
        active ? 'bg-[#E7F7FE] hover:bg-blue-100' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="size-8 rounded-lg flex items-center justify-center border border-greyscale-200 bg-white">
        {icon}
      </div>
      <span className="text-sm text-greyscale-700 truncate">{label}</span>
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}

export default PersonalSidebar

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
