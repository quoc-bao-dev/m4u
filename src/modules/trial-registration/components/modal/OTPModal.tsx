'use client'

import { ModalClient } from '@/core/components'
import Button from '@/core/components/ui/button'
import { PINInput } from '@/core/components/ui/pin-input'
import { useSignUp } from '@/services/auth/mutations'
import { useMemo, useState } from 'react'
import useTrialOTPModal from '../../stores/useTrialOTPModal'
import useRegisterSuccessModal from '../../stores/useRegisterSuccessModal'
import { useToast } from '@/core/hooks/useToast'
import { useTranslations } from 'next-intl'

const maskPhoneNumber = (phone?: string) => {
  if (!phone) return ''
  if (phone.length <= 4) return phone
  const start = phone.slice(0, 2)
  const end = phone.slice(-3)
  return `${start}${'*'.repeat(Math.max(0, phone.length - 5))}${end}`
}

const OTPModal = () => {
  const t = useTranslations()
  const store = useTrialOTPModal()
  const isOpen = store.isOpen
  const effectivePhone = store.phone
  const effectiveLength = store.length
  const formData = store.formData
  const productId = store.productId
  const [otp, setOtp] = useState('')

  const { open: openRegisterSuccessModal } = useRegisterSuccessModal()
  const signUpMutation = useSignUp()
  const { showError } = useToast()

  // Chuyển đổi gender từ string sang number theo yêu cầu API
  const getGenderNumber = (gender: string): number => {
    switch (gender) {
      case 'male':
        return 1
      case 'female':
        return 2
      case 'other':
        return 3
      default:
        return 2
    }
  }

  const maskedPhone = useMemo(
    () => maskPhoneNumber(effectivePhone),
    [effectivePhone]
  )

  const handelOpenSuccessModal = async () => {
    if (!formData) {
      console.error('Không có dữ liệu form')
      return
    }

    try {
      // Chuẩn bị dữ liệu cho API sign_up
      const apiData = {
        fullname: formData.fullName,
        phone: formData.phoneNumber,
        birthday: formData.dateOfBirth,
        address: formData.address,
        gender: getGenderNumber(formData.gender),
        id_product: String(productId || ''),
        event: 'register',
        key_code: otp,
      }

      // Gọi API đăng ký với OTP
      const response = await signUpMutation.mutateAsync(apiData)

      if (response?.result === true) {
        // Nếu thành công, đóng modal OTP và mở modal thành công
        store.close()
        setOtp('')
        openRegisterSuccessModal()
      } else {
        // Nếu thất bại, hiển thị toast lỗi với message trả về
        showError(response?.message || t('trial.otp.errors.verifyFailed'))
      }
    } catch (error: any) {
      showError(error?.message || t('trial.otp.errors.verifyError'))
    }
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
            {t('trial.otp.title')}
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            {t('trial.otp.desc', {
              length: effectiveLength,
              phone: maskedPhone,
            })}
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
              disabled={
                otp.length !== effectiveLength || signUpMutation.isPending
              }
              onClick={handelOpenSuccessModal}
            >
              {signUpMutation.isPending
                ? t('trial.otp.processing')
                : t('trial.otp.confirm')}
            </Button>
          </div>
        </div>
      </div>
    </ModalClient>
  )
}

export default OTPModal
