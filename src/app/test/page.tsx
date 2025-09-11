import ReviewerCarousel from '@/modules/landing/components/introduction/ReviewerCarousel'
import { DatePicker } from '@/core/components/ui'
import { useState } from 'react'

const page = () => {
  const [date, setDate] = useState('')

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">DatePicker Test</h1>
        <DatePicker
          label="Test Date Picker"
          value={date}
          onChange={setDate}
          placeholder="Chọn ngày test"
        />
        <p className="mt-2 text-sm text-gray-600">
          Selected date: {date || 'None'}
        </p>
      </div>
      <div>
        <ReviewerCarousel />
      </div>
    </div>
  )
}

export default page
