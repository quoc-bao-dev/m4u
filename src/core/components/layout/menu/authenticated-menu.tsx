import {
  CheckCircle,
  PencilSimpleLine,
  QrCode,
  SignOut,
  UserCircle,
  UsersThree,
} from '@phosphor-icons/react'
import React from 'react'
import { UserResponse } from '@/services/auth/type'
import { useAuth } from '@/modules/auth'
import { useToast } from '@/core/hooks'

type UserType = UserResponse['info']

interface AuthenticatedMenuProps {
  user: UserType | null
  children: React.ReactNode
}

interface HeaderProps {
  user: UserType | null
}

interface TopProps {
  user: UserType | null
}

const AuthenticatedMenu = ({ user, children }: AuthenticatedMenuProps) => {
  return <div>{children}</div>
}

const Header = ({ user }: HeaderProps) => {
  // Format join date from created_at
  const formatJoinDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      })
    } catch {
      return 'Unknown'
    }
  }

  // Format account balance
  const formatBalance = (balance: number) => {
    return balance.toLocaleString('vi-VN') + ' ₫'
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-greyscale-500">Loading user information...</p>
      </div>
    )
  }

  return (
    <div className="">
      {/* Top section with profile info and membership */}
      <div className="flex items-start justify-between mb-6">
        {/* Profile info */}
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="size-[64px] rounded-full overflow-hidden bg-greyscale-100">
            <img
              src={user.avatar || '/placeholder-avatar.jpg'}
              alt={user.fullname || 'User'}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/image/avatar/image-01.png'
              }}
            />
          </div>

          {/* Name and join date */}
          <div>
            <h3 className="text-[18px] font-bold text-greyscale-900 mb-1">
              {user.fullname || 'Unknown User'}
            </h3>
            <p className="text-[12px] text-greyscale-500">
              Joined since {formatJoinDate(user.created_at)}
            </p>
          </div>
        </div>

        {/* Membership badge */}
        <div className="bg-yellow-100 px-3 py-1 rounded-full flex items-center gap-1 relative z-10">
          <GoldIcon />
          <span className="text-sm font-medium text-yellow-600">
            {user.point > 1000 ? 'Gold membership' : 'Silver membership'}
          </span>
        </div>
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Referrals */}
        <div className="text-center">
          <div className="text-base font-bold text-greyscale-900 mb-1">
            {user.referral_code ? 'Active' : '0'}
          </div>
          <div className="text-[12px] text-greyscale-500">Referrals</div>
        </div>

        {/* Account Balance */}
        <div className="text-center">
          <div className="text-base font-bold text-greyscale-900 mb-1">
            {formatBalance(user.account_balance)}
          </div>
          <div className="text-[12px] text-greyscale-500">Account Balance</div>
        </div>

        {/* Points */}
        <div className="text-center">
          <div className="text-base font-bold text-greyscale-900 mb-1">
            {user.point || '0'}
          </div>
          <div className="text-[12px] text-greyscale-500">Points</div>
        </div>
      </div>
    </div>
  )
}

const Top = ({ user }: TopProps) => {
  const activityItems = [
    {
      id: 'trial-history',
      label: 'Trial registration history',
      icon: CheckCircle,
      href: '/trial-history',
    },
    {
      id: 'my-reviews',
      label: 'My reviews',
      icon: PencilSimpleLine,
      href: '/my-reviews',
    },
    {
      id: 'referral-list',
      label: 'Referral List',
      icon: UsersThree,
      href: '/referral-list',
    },
    {
      id: 'referral-code',
      label: 'Referral Code',
      icon: QrCode,
      href: '/referral-code',
    },
  ]

  return (
    <div className="flex flex-col gap-4 shadow-[0px_4px_24px_0px_#0000000F] rounded-xl pb-3">
      <h3 className="text-base font-bold text-greyscale-700 py-2 px-3 border-b border-greyscale-200">
        My activity
      </h3>
      <div className="grid grid-cols-4 gap-4 px-3">
        {activityItems.map((item) => {
          const IconComponent = item.icon
          return (
            <a
              key={item.id}
              href={item.href}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="size-8 rounded-lg flex items-center justify-center border border-greyscale-200">
                <IconComponent
                  weight="fill"
                  size={16}
                  className="text-[#3B82F6] group-hover:text-blue-500"
                />
              </div>
              <span className="text-sm font-normal text-greyscale-700 group-hover:text-blue-500 text-center">
                {item.label}
              </span>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export const AccountButton = () => {
  return (
    <button className="flex items-center gap-2 cursor-pointer group">
      <div className="size-8 rounded-lg flex items-center justify-center border border-greyscale-200">
        <UserCircle
          weight="fill"
          size={16}
          className="text-[#3B82F6] group-hover:text-blue-500"
        />
      </div>
      <span className="text-sm font-normal text-greyscale-700 group-hover:text-blue-500">
        Account Preferences
      </span>
    </button>
  )
}

export const LogoutButton = () => {
  const { clearUser } = useAuth()
  const { showSuccess } = useToast()

  const handleLogout = () => {
    clearUser()
    showSuccess('Logged out successfully!')
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 cursor-pointer group"
    >
      <div className="size-8 rounded-lg flex items-center justify-center border border-greyscale-200">
        <SignOut
          weight="fill"
          size={16}
          className="text-[#FF8092] group-hover:text-red-500"
        />
      </div>
      <span className="text-sm font-normal text-greyscale-700 group-hover:text-red-500">
        Log out
      </span>
    </button>
  )
}

AuthenticatedMenu.Header = Header
AuthenticatedMenu.Top = Top

export default AuthenticatedMenu

const GoldIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
    >
      <g clip-path="url(#clip0_18430_21867)">
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
