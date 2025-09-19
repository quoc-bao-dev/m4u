'use client'

import { ModalClient } from '@/core/components'
import Button from '@/core/components/ui/button'
import { PINInput } from '@/core/components/ui/pin-input'
import { useToast } from '@/core/hooks'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForgotPass } from '../../stores/useForgotPass'

const maskPhoneNumber = (phone?: string) => {
  if (!phone) return ''
  if (phone.length <= 4) return phone
  const start = phone.slice(0, 2)
  const end = phone.slice(-3)
  return `${start}${'*'.repeat(Math.max(0, phone.length - 5))}${end}`
}

const OTPForgotPassModal = () => {
  const t = useTranslations('auth')
  const { phone, isOpen, close } = useForgotPass()
  const [otp, setOtp] = useState('')
  const { showError } = useToast()

  const maskedPhone = maskPhoneNumber(phone)
  const otpLength = 6 // Độ dài OTP mặc định

  const handleOTPSubmit = () => {
    if (otp.length !== otpLength) {
      showError('Vui lòng nhập đầy đủ mã OTP')
      return
    }

    // Log OTP để debug
    console.log('OTP entered:', otp)
    console.log('Phone number:', phone)
    console.log('Đã nhập OTP thành công, chờ hướng dẫn tiếp theo...')

    // TODO: Xử lý verify OTP ở bước tiếp theo
    showError(
      'Chức năng này đang được phát triển, vui lòng chờ hướng dẫn tiếp theo'
    )
  }

  const handleClose = () => {
    setOtp('')
    close()
  }

  return (
    <ModalClient
      open={isOpen}
      onClose={handleClose}
      showCloseButton={true}
      className="w-full mx-3 md:mx-0 md:w-[720px] h-fit md:h-auto rounded-4xl"
    >
      <div className="relative p-8 rounded-4xl overflow-hidden">
        <div className="absolute top-0 right-0">
          <img src="/image/trial/top-gradient.png" alt="decor" />
        </div>

        <div className="relative z-10">
          <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-2">
            Nhập mã OTP
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Vui lòng nhập mã OTP 6 số đã được gửi đến số điện thoại{' '}
            {maskedPhone}
          </p>

          <div className="mb-8">
            <PINInput
              length={otpLength}
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
              disabled={otp.length !== otpLength}
              onClick={handleOTPSubmit}
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
    </ModalClient>
  )
}

export default OTPForgotPassModal
