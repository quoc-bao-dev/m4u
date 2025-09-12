'use client'

import { ModalClient } from '@/core/components'
import useRegisterSuccessModal from '../../stores/useRegisterSuccessModal'
import Confetti from 'react-confetti'
import { useEffect, useRef, useState } from 'react'

const RegisterSuccessModal = () => {
  const store = useRegisterSuccessModal()
  const isOpen = store.isOpen
  const effectiveTitle = store.title
  const effectiveMessage = store.message
  const handleClose = store.close

  // đo kích thước modal để gắn confetti vào mép trên
  const boxRef = useRef<HTMLDivElement>(null)
  const [boxW, setBoxW] = useState(520) // fallback
  const [capH] = useState(160) // chiều cao vùng pháo ở mép trên

  useEffect(() => {
    if (!isOpen) return
    // đo ngay khi mở (frame kế tiếp để đảm bảo layout xong)
    const t = requestAnimationFrame(() => {
      if (boxRef.current) setBoxW(boxRef.current.clientWidth)
    })
    return () => cancelAnimationFrame(t)
  }, [isOpen])

  return (
    <ModalClient
      open={!!isOpen}
      onClose={handleClose}
      showCloseButton={true}
      className="w-full mx-3 md:mx-0 md:w-[520px] h-fit md:h-auto rounded-4xl"
    >
      <div ref={boxRef} className="relative p-8 rounded-4xl overflow-hidden">
        {/* Confetti gắn sát mép trên của modal */}
        {isOpen && (
          <Confetti
            className="absolute left-0 top-0 h-full pointer-events-none opacity-30"
            width={boxW}
            height={capH}
            numberOfPieces={400}
            recycle={false}
            // gravity={0.35}
            // phát hạt từ đường mép trên của modal
            // confettiSource={{ x: 0, y: 0, w: boxW, h: 1 }}
            tweenDuration={120}
          />
        )}

        <div className="relative z-10 text-center py-6">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-green-100 flex items-center justify-center animate-zoom-in">
                <img
                  src="/image/trial/check.svg"
                  alt="success"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-3">
            {effectiveTitle}
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-[560px] mx-auto">
            {effectiveMessage}
          </p>
        </div>
      </div>
    </ModalClient>
  )
}

export default RegisterSuccessModal
