'use client'

import { ModalClient } from '@/core/components'
import useRegisterSuccessModal from '../../stores/useRegisterSuccessModal'
import Confetti from 'react-confetti'
import { useDevice } from '@/core/hooks'

const RegisterSuccessModal = () => {
  const store = useRegisterSuccessModal()
  const isOpen = store.isOpen
  const effectiveTitle = store.title
  const effectiveMessage = store.message
  const handleClose = store.close

  const { width, height } = useDevice()

  return (
    <ModalClient
      open={!!isOpen}
      onClose={handleClose}
      showCloseButton={true}
      className="w-full mx-3 md:mx-0 md:w-[520px] h-fit md:h-auto rounded-4xl"
    >
      <div className="relative p-8 rounded-4xl overflow-hidden">
        <Confetti
          className="absolute  opacity-30"
          recycle={false}
          numberOfPieces={400}
          width={width}
          height={height}
        />
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
        <style jsx>{`
          @keyframes zoomIn {
            0% {
              transform: scale(0.85);
              opacity: 0;
            }
            60% {
              transform: scale(1.06);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-zoom-in {
            animation: zoomIn 260ms ease-out both;
            transform-origin: center;
          }
        `}</style>
      </div>
    </ModalClient>
  )
}

export default RegisterSuccessModal
