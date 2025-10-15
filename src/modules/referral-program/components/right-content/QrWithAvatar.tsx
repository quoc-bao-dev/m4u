import UserAvatar from '@/core/components/UserAvatar'
import { QRCodeCanvas } from 'qrcode.react'
import React from 'react'

const QrWithAvatar = ({
  value,
  size = 270,
  logo,
  name,
}: {
  value: string
  size?: number
  logo?: string
  name?: string
}) => {
  const logoSize = size * 0.24 // avatar chiếm 20% QR (trừ padding)

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      <QRCodeCanvas
        className="p-6"
        value={value}
        size={size - 32} // trừ đi padding
        level="H" // độ chịu lỗi cao để QR vẫn quét được dù có logo che
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      <UserAvatar
        src={logo}
        userName={name}
        size={logoSize}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white"
      />
    </div>
  )
}

export default QrWithAvatar
