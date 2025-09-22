'use client'

import { envConfig } from '@/core/config'
import { useClipboard } from '@/core/hooks'
import { cn } from '@/core/utils'
import { useLanguageSwitch } from '@/locale'
import { useAuth } from '@/modules/auth'
import QrWithAvatar from './QrWithAvatar'
import { useTranslations } from 'next-intl'

const QrCode = () => {
  const t = useTranslations('Referral')
  const { user } = useAuth()
  const { isCopied, copy } = useClipboard({ resetAfterMs: 1500 })
  const { currentLocale } = useLanguageSwitch()
  const linkQr =
    envConfig.appDomain +
    '/' +
    currentLocale +
    '/?code_introduce=' +
    user?.code_introduce

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* QR Code with Avatar và Corner Frame */}
      <div className="flex items-center justify-center relative">
        <div
          style={{
            borderRadius: '20px',
            background: '#fff',
            padding: '16px',
          }}
        >
          <QrWithAvatar
            value={linkQr}
            size={270}
            logo={user?.avatar}
            name={user?.fullname}
          />
        </div>
        {/* Corner Frame */}
        <CornerFrame />
      </div>

      {/* Copy Link Button */}
      <div className="flex items-center justify-between bg-pink-100 rounded-full px-4 py-2 w-full xl:max-w-[372px]">
        <span className="flex-1 truncate text-sm text-gray-700 mr-3">
          {linkQr}
        </span>
        <button
          onClick={() => copy(linkQr)}
          className={cn(
            'cursor-pointer bg-pink-600 text-white text-sm font-semibold px-4 py-2 rounded-full min-w-24',
            isCopied && 'bg-pink-600/80 cursor-not-allowed'
          )}
        >
          {isCopied ? t('copied') : t('copy')}
        </button>
      </div>
    </div>
  )
}

export default QrCode

// Component tạo 4 góc vuông
const CornerFrame = () => {
  const cornerStyle = {
    position: 'absolute' as const,
    width: '32px',
    height: '32px',
    border: '3px solid #FE6BBA',
  }

  return (
    <>
      {/* Top Left */}
      <div
        style={{
          ...cornerStyle,
          top: '16px',
          left: '16px',
          borderRight: 'none',
          borderBottom: 'none',
        }}
      />
      {/* Top Right */}
      <div
        style={{
          ...cornerStyle,
          top: '16px',
          right: '16px',
          borderLeft: 'none',
          borderBottom: 'none',
        }}
      />
      {/* Bottom Left */}
      <div
        style={{
          ...cornerStyle,
          bottom: '16px',
          left: '16px',
          borderRight: 'none',
          borderTop: 'none',
        }}
      />
      {/* Bottom Right */}
      <div
        style={{
          ...cornerStyle,
          bottom: '16px',
          right: '16px',
          borderLeft: 'none',
          borderTop: 'none',
        }}
      />
    </>
  )
}
