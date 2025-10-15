'use client'

import { useState } from 'react'

interface GeoLocationPermissionProps {
  onAllow: () => void
  onDeny: () => void
  onSkip: () => void
}

export default function GeoLocationPermission({
  onAllow,
  onDeny,
  onSkip,
}: GeoLocationPermissionProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-pink-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">
            Phát hiện vị trí của bạn
          </h3>
          <p className="text-greyscale-600 text-sm">
            Chúng tôi muốn phát hiện vị trí của bạn để hiển thị ngôn ngữ phù hợp
            nhất. Thông tin vị trí của bạn sẽ không được lưu trữ và chỉ được sử
            dụng để xác định ngôn ngữ.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              onAllow()
              setIsVisible(false)
            }}
            className="w-full bg-pink-600 text-white py-3 px-6 rounded-full hover:bg-pink-700 transition-colors font-medium"
          >
            Cho phép phát hiện vị trí
          </button>

          <button
            onClick={() => {
              onDeny()
              setIsVisible(false)
            }}
            className="w-full bg-greyscale-100 text-greyscale-700 py-3 px-6 rounded-full hover:bg-greyscale-200 transition-colors font-medium"
          >
            Không cho phép
          </button>

          <button
            onClick={() => {
              onSkip()
              setIsVisible(false)
            }}
            className="w-full text-pink-600 hover:text-pink-700 underline text-sm font-medium"
          >
            Chọn ngôn ngữ khác
          </button>
        </div>
      </div>
    </div>
  )
}
