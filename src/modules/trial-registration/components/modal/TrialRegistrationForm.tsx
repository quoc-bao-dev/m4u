'use client'

import { DatePicker, Input, RadioGroup } from '@/core/components/ui'
import Button from '@/core/components/ui/button'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import useTrialOTPModal from '../../stores/useTrialOTPModal'
import useModalRegistration from '../../stores/useModalRegistration'

interface FormData {
  fullName: string
  phoneNumber: string
  gender: 'female' | 'male' | 'other'
  dateOfBirth: string
  address: string
}

interface TrialRegistrationFormProps {
  onSubmit?: (data: FormData) => void
}

const TrialRegistrationForm = ({ onSubmit }: TrialRegistrationFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    gender: 'female',
    dateOfBirth: '',
    address: '',
  })

  const { close: closeModalRegistration } = useModalRegistration()
  const { open: openOTPModal } = useTrialOTPModal()

  const handleOpenOTPModal = () => {
    closeModalRegistration()
    openOTPModal({
      phone: '09*****',
      length: 6,
    })
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
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
          <form onSubmit={handleSubmit} className="space-y-4 px-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <Input
                label="Họ và tên"
                placeholder="Nhập họ và tên"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                required
              />
              {/* Date of Birth */}
              <DatePicker
                label="Ngày sinh"
                value={formData.dateOfBirth}
                onChange={(value) => handleInputChange('dateOfBirth', value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone Number */}
              <Input
                label="Số điện thoại"
                type="tel"
                placeholder="Nhập số điện thoại"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange('phoneNumber', e.target.value)
                }
                required
              />
              {/* Address */}
              <Input
                label="Địa chỉ"
                placeholder="Nhập địa chỉ"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
              />
            </div>

            {/* Gender */}
            <RadioGroup
              label="Giới tính"
              name="gender"
              value={formData.gender}
              onChange={(value) =>
                handleInputChange('gender', value as FormData['gender'])
              }
              options={[
                { value: 'female', label: 'Nữ' },
                { value: 'male', label: 'Nam' },
                { value: 'other', label: 'Khác' },
              ]}
              required
            />

            {/* Product for Trial */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sản phẩm dùng thử <span className="text-red-500">*</span>
              </label>
              <div className="max-w-[450px] bg-pink-50 rounded-lg p-2 flex items-center space-x-3">
                <div className="size-24 bg-pink-200 rounded-lg flex items-center justify-center">
                  <img
                    src="/image/trial/image-03.png"
                    alt="product"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <p className="font-semibold text-xs text-gray-900">MANYO</p>
                  <p className="text-base text-gray-600">
                    Panthetoin Deep Moisture Mask
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex justify-center md:justify-start">
        <Button
          size="xs"
          type="submit"
          className="w-fit"
          endIcon={<ArrowRightIcon weight="bold" className="size-5" />}
          onClick={handleOpenOTPModal}
        >
          Tiếp tục
        </Button>
      </div>
    </div>
  )
}

export default TrialRegistrationForm
