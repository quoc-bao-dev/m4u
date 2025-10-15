'use client'

import { ModalClient } from '@/core/components'
import Button from '@/core/components/ui/button'
import { PINInput } from '@/core/components/ui/pin-input'
import { useToast } from '@/core/hooks'
import { useCheckOTPForgotPassword } from '@/services/auth/mutations'
import { useTranslations } from 'next-intl'
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
  const { otp, phone, isOpen, close, setOtp, openReset } = useForgotPass()
  const { showError } = useToast()
  const checkOtpMutation = useCheckOTPForgotPassword()

  const maskedPhone = maskPhoneNumber(phone)
  const otpLength = 6

  const handleOTPSubmit = async () => {
    if (otp.length !== otpLength) {
      showError(t('forgot.otp.inputError'))
      return
    }

    try {
      const response = await checkOtpMutation.mutateAsync({
        phone,
        key_code: otp,
      })

      if (!response?.result) {
        showError(response?.message || t('forgot.otp.invalid'))
        return
      }

      // Lưu OTP vào store và mở modal đổi mật khẩu
      setOtp(otp)
      close()
      openReset()
    } catch (error: any) {
      console.error('Check OTP error:', error)
      console.error('Error response:', error?.response?.data)
      showError(error?.response?.data?.message || t('forgot.otp.verifyError'))
    }
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
      className="w-full mx-3 md:mx-0 md:w-[530px] h-fit md:h-auto rounded-4xl"
    >
      <div className="relative p-8 rounded-4xl overflow-hidden">
        <div className="absolute top-0 right-0">
          <img src="/image/trial/top-gradient.png" alt="decor" />
        </div>

        <div className="relative z-10">
          <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-2">
            {t('forgot.otp.title')}
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            {t('forgot.otp.desc', { length: otpLength, phone: maskedPhone })}
          </p>

          <div className="mb-8">
            <PINInput
              length={otpLength}
              value={otp}
              onChange={setOtp}
              onComplete={setOtp}
              className="gap-5"
              inputClassName="size-8 md:w-16 md:h-16 text-2xl md:text-4xl"
            />
          </div>

          <div className="mt-4 flex justify-center md:justify-start">
            <Button
              size="xs"
              className="w-fit"
              disabled={otp.length !== otpLength || checkOtpMutation.isPending}
              onClick={handleOTPSubmit}
            >
              {checkOtpMutation.isPending
                ? t('forgot.otp.checking')
                : t('forgot.otp.confirm')}
            </Button>
          </div>
        </div>
      </div>
    </ModalClient>
  )
}

export default OTPForgotPassModal
