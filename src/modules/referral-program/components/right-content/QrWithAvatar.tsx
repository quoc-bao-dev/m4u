import { QRCodeCanvas } from 'qrcode.react'
import React from 'react'

const QrWithAvatar = ({
  value,
  size = 270,
  logo,
}: {
  value: string
  size?: number
  logo?: string
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
      {logo && (
        <img
          src={logo}
          alt="avatar"
          className="object-cover"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: logoSize,
            height: logoSize,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff', // bo nền trắng để QR dễ quét hơn
            padding: 1,
            border: '1px solid #fff',
          }}
        />
      )}
    </div>
  )
}

export default QrWithAvatar
