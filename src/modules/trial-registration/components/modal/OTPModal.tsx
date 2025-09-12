'use client'

import { ModalClient } from '@/core/components'
import Button from '@/core/components/ui/button'
import { PINInput } from '@/core/components/ui/pin-input'
import { useMemo, useState } from 'react'
import useTrialOTPModal from '../../stores/useTrialOTPModal'
import useRegisterSuccessModal from '../../stores/useRegisterSuccessModal'

const maskPhoneNumber = (phone?: string) => {
  if (!phone) return ''
  if (phone.length <= 4) return phone
  const start = phone.slice(0, 2)
  const end = phone.slice(-3)
  return `${start}${'*'.repeat(Math.max(0, phone.length - 5))}${end}`
}

const OTPModal = () => {
  const store = useTrialOTPModal()
  const isOpen = store.isOpen
  const effectivePhone = store.phone
  const effectiveLength = store.length
  const confirmHandler = store.onConfirm
  const [otp, setOtp] = useState('')

  const { open: openRegisterSuccessModal } = useRegisterSuccessModal()

  const maskedPhone = useMemo(
    () => maskPhoneNumber(effectivePhone),
    [effectivePhone]
  )

  const handleConfirm = () => {
    if (otp.length === effectiveLength) {
      confirmHandler?.(otp)
    }
  }

  const handelOpenSuccessModal = () => {
    store.close()
    openRegisterSuccessModal()
  }

  const handelClose = () => {
    store.close()
    setOtp('')
  }

  return (
    <ModalClient
      open={isOpen}
      onClose={handelClose}
      showCloseButton={true}
      className="w-full mx-3 md:mx-0 md:w-[720px] h-fit md:h-auto rounded-4xl"
    >
      <div className="relative p-8 rounded-4xl overflow-hidden">
        <div className="absolute top-0 right-0">
          <img src="/image/trial/top-gradient.png" alt="decor" />
        </div>

        <div className="relative z-10">
          <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-2">
            Nhập mã xác thực
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            Nhập mã OTP gồm {effectiveLength} chữ số vừa được gửi về số điện
            thoại{' '}
            <span className="font-semibold text-gray-900">{maskedPhone}</span>
          </p>

          <div className="mb-8">
            <PINInput
              length={effectiveLength}
              value={otp}
              onChange={setOtp}
              onComplete={setOtp}
              className="gap-6"
              inputClassName="size-8 md:w-16 md:h-16 text-2xl md:text-4xl"
            />
          </div>

          <div className="mt-4 flex justify-center md:justify-start">
            <Button
              size="xs"
              className="w-fit"
              disabled={otp.length !== effectiveLength}
              onClick={handelOpenSuccessModal}
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
    </ModalClient>
  )
}

export default OTPModal
