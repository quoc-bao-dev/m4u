'use client'

import { ModalClient } from '@/core/components'
import Button from '@/core/components/ui/button'
import Input from '@/core/components/ui/input'
import { useToast } from '@/core/hooks'
import { useSendOTPForgotPassword } from '@/services/auth/mutations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useForgotPass } from '../../stores/useForgotPass'

const createSchema = (t: (key: string) => string) =>
  z.object({
    phone: z.string().min(1, t('forgot.phone.validation.phoneRequired')),
  })

type FormData = { phone: string }

const PhoneInputModal = () => {
  const t = useTranslations('auth')
  const { isPhoneInputOpen, closePhoneInput, open } = useForgotPass()
  const { showError, showSuccess } = useToast()
  const sendOTPMutation = useSendOTPForgotPassword()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(createSchema(t)),
    defaultValues: { phone: '' },
  })

  const onSubmit = async (data: FormData) => {
    try {
      const response = await sendOTPMutation.mutateAsync({ phone: data.phone })

      // Check if result is false (API returned error)
      if (response && response.result === false) {
        showError(response.message || t('forgot.otp.sendFailed'))
        return
      }

      // Nếu thành công, mở modal OTP và set phone vào store
      open(data.phone)
      closePhoneInput()
      reset()
      showSuccess(t('forgot.otp.sendSuccess'))
    } catch (error: any) {
      // Log chi tiết lỗi từ BE
      console.error('Send OTP error:', error)
      console.error('Error response:', error?.response?.data)

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        t('forgot.otp.sendFailed')
      showError(errorMessage)
    }
  }

  const handleClose = () => {
    reset()
    closePhoneInput()
  }

  return (
    <ModalClient
      open={isPhoneInputOpen}
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
            {t('forgot.phone.title')}
          </h2>
          <p className="text-sm text-gray-600 mb-6">{t('forgot.phone.desc')}</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    label={t('phoneNumber')}
                    placeholder={t('enterPhoneNumber')}
                    type="tel"
                    {...field}
                    error={errors.phone?.message}
                  />
                )}
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                size="sm"
                className="w-full"
                disabled={sendOTPMutation.isPending}
              >
                {sendOTPMutation.isPending
                  ? t('forgot.otp.sending')
                  : t('forgot.phone.submit')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ModalClient>
  )
}

export default PhoneInputModal
