'use client'

import { DatePicker, Input, RadioGroup } from '@/core/components/ui'
import Button from '@/core/components/ui/button'
import { useStartSignUp } from '@/services/auth/mutations'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { Controller, useForm } from 'react-hook-form'
import useTrialOTPModal from '../../stores/useTrialOTPModal'
import useModalRegistration from '../../stores/useModalRegistration'
import { useToast } from '@/core/hooks/useToast'
import Image from 'next/image'
import { withAlpha } from '@/core/utils'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  fullName: z.string().trim().min(2, 'Vui lòng nhập họ tên hợp lệ'),
  phoneNumber: z
    .string()
    .trim()
    .min(8, 'Số điện thoại không hợp lệ')
    .max(15, 'Số điện thoại không hợp lệ'),
  gender: z.enum(['female', 'male', 'other'] as const, {
    message: 'Vui lòng chọn giới tính',
  }),
  dateOfBirth: z.string().min(1, 'Vui lòng chọn ngày sinh'),
  address: z.string().trim().min(5, 'Vui lòng nhập địa chỉ hợp lệ'),
})

type FormData = z.infer<typeof schema>

interface TrialRegistrationFormProps {
  onSubmit?: (data: FormData) => void
  productId: string | number
  productImage: string
  productName: string
  productBrand: string
  productColor?: string
}

const TrialRegistrationForm = ({ onSubmit, productId, productImage, productName, productBrand, productColor }: TrialRegistrationFormProps) => {
  const { close: closeModalRegistration } = useModalRegistration()
  const { open: openOTPModal } = useTrialOTPModal()
  const { showError } = useToast()
  
  // RHF
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      gender: 'female',
      dateOfBirth: '',
      address: '',
    },
  })

  // API
  const startSignUpMutation = useStartSignUp()

  // Map gender
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

  const handleOpenOTPModal = (phoneNumber: string) => {
    closeModalRegistration()
    const maskedPhone = phoneNumber.replace(/(\d{2})\d{3}(\d{3})/, '$1***$2')
    openOTPModal({
      phone: maskedPhone,
      length: 6,
      formData: {
        fullName: watch('fullName'),
        phoneNumber: watch('phoneNumber'),
        gender: watch('gender'),
        dateOfBirth: watch('dateOfBirth'),
        address: watch('address'),
      },
      productId: String(productId),
      productImage,
      productName,
      productBrand,
      productColor,
    })
  }

  const onSubmitForm = async (data: FormData) => {
    onSubmit?.(data)

    const apiData = {
      fullname: data.fullName,
      phone: data.phoneNumber,
      birthday: data.dateOfBirth,
      address: data.address,
      gender: getGenderNumber(data.gender),
      id_product: String(productId),
      event: 'register',
      key_code: '',
    }

    try {
      const response = await startSignUpMutation.mutateAsync(apiData)

      if (response?.result === true) {
        handleOpenOTPModal(data.phoneNumber)
      } else {
        showError(response?.message || 'Đăng ký thất bại')
      }
    } catch (error: any) {
      showError(error?.message || 'Có lỗi xảy ra khi đăng ký')
    }
  }

  return (
    <div className="h-full rounded-2xl flex flex-col">
      {/* Form Header */}
      <div className="mb-6 flex-shrink-0 px-1">
        <h2 className="text-[20px] md:text-[28px] xl:text-[34px] font-bold text-gray-900 mb-1">
          Register for a Product Sample
        </h2>
        <p className="text-sm text-gray-600">
          Leave your details and we’ll contact you.
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 min-h-0">
        <div className="h-full overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 px-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <div className="w-full">
                    <Input
                      label="Họ và tên"
                      placeholder="Nhập họ và tên"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      required
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
                    )}
                  </div>
                )}
              />

              {/* Date of Birth */}
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <div className="w-full">
                    <DatePicker
                      label="Ngày sinh"
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      required
                    />
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-xs text-red-600">{errors.dateOfBirth.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone Number */}
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <div className="w-full">
                    <Input
                      label="Số điện thoại"
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      required
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-xs text-red-600">{errors.phoneNumber.message}</p>
                    )}
                  </div>
                )}
              />

              {/* Address */}
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <div className="w-full">
                    <Input
                      label="Địa chỉ"
                      placeholder="Nhập địa chỉ"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      required
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Gender */}
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <div className="w-full">
                  <RadioGroup
                    label="Giới tính"
                    name="gender"
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    options={[
                      { value: 'female', label: 'Nữ' },
                      { value: 'male', label: 'Nam' },
                      { value: 'other', label: 'Khác' },
                    ]}
                    required
                  />
                  {errors.gender && (
                    <p className="mt-1 text-xs text-red-600">{errors.gender.message as string}</p>
                  )}
                </div>
              )}
            />

            {/* Product for Trial */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sản phẩm dùng thử <span className="text-red-500">*</span>
              </label>
              <div className="max-w-[450px] rounded-lg p-2 flex items-center space-x-3"
                style={{ backgroundColor: withAlpha(productColor, 0.4) }}>
                <div className="size-24 bg-white rounded-lg flex items-center justify-center">
                  <Image
                    width={200}
                    height={200}
                    src={productImage}
                    alt="product"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <p className="font-semibold text-xs text-gray-900">{productBrand}</p>
                  <p className="text-base text-gray-600">
                    {productName}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-center md:justify-start">
              <Button
                size="xs"
                type="submit"
                className="w-fit"
                disabled={startSignUpMutation.isPending}
                endIcon={!startSignUpMutation.isPending && <ArrowRightIcon weight="bold" className="size-5" />}
              >
                {startSignUpMutation.isPending ? 'Đang xử lý...' : 'Tiếp tục'}
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Error Message */}
      {/* Sử dụng toast thay cho hiển thị lỗi cục bộ */}
    </div>
  )
}

export default TrialRegistrationForm
