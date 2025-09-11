'use client'

import { useState } from 'react'
import Button from '@/core/components/ui/button'
import { Input, RadioGroup, DatePicker } from '@/core/components/ui'
import { ArrowRightIcon } from '@phosphor-icons/react'

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

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  return (
    <div className="bg-white p-6 rounded-2xl">
      {/* Form Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Đăng ký dùng thử sản phẩm
        </h2>
        <p className="text-sm text-gray-600">
          Để lại thông tin chúng tôi sẽ liên lạc với bạn
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <Input
          label="Họ và tên"
          placeholder="Nhập họ và tên"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          required
        />

        {/* Phone Number */}
        <Input
          label="Số điện thoại"
          type="tel"
          placeholder="Nhập số điện thoại"
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          required
        />

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

        {/* Date of Birth */}
        <DatePicker
          label="Ngày sinh"
          value={formData.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          required
        />

        {/* Product for Trial */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sản phẩm dùng thử <span className="text-red-500">*</span>
          </label>
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 flex items-center space-x-3">
            <div className="w-12 h-12 bg-pink-200 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-pink-300 rounded"></div>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900">MANYO</p>
              <p className="text-xs text-gray-600">
                Panthetoin Deep Moisture Mask
              </p>
            </div>
          </div>
        </div>

        {/* Address */}
        <Input
          label="Địa chỉ"
          placeholder="Nhập địa chỉ"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          required
        />

        {/* Submit Button */}
        <div className="pt-4 w-fit">
          <Button
            type="submit"
            className="w-fit"
            endIcon={<ArrowRightIcon weight="bold" className="size-5" />}
          >
            Tiếp tục
          </Button>
        </div>
      </form>
    </div>
  )
}

export default TrialRegistrationForm
