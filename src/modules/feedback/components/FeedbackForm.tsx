'use client'

import { useGetImproveFeedback, useSendFeedback } from '@/services/feedback'
import { Check, Image as ImageIcon, X } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import useFeedbackSuccessModal from '../stores/useFeedbackSuccessModal'
import FeedbackSelect from './FeedbackSelect'

interface FeedbackFormProps {
  titleExperience: string
  titleImprove: string
  titleFeedback: string
}

const FeedbackForm = ({
  titleExperience,
  titleImprove,
  titleFeedback,
}: FeedbackFormProps) => {
  const t = useTranslations('feedback.form')

  const [selectedReasons, setSelectedReasons] = useState<string[]>([])
  const [agree, setAgree] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState<number>(5)
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const feedbackSuccessModal = useFeedbackSuccessModal()
  const [feedbackContent, setFeedbackContent] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    data: improveFeedbackData,
    isLoading,
    error,
  } = useGetImproveFeedback()

  const sendFeedbackMutation = useSendFeedback()

  // Kiểu cho lý do hiển thị (label từ name, value từ key_main)
  interface ImproveReasonOption {
    label: string
    value: string
  }

  // Lấy reasons từ API dựa trên selectedFeedback
  const getReasonsFromApi = (): ImproveReasonOption[] => {
    if (!improveFeedbackData?.data) return []

    // Sử dụng selectedFeedback trực tiếp làm key (1-5)
    const feedbackData = improveFeedbackData.data[selectedFeedback]

    if (!feedbackData || feedbackData.length === 0) return []

    // Lấy improve items từ feedback data đầu tiên
    const improveItems = feedbackData[0]?.improve || []

    return improveItems.map((item: any) => ({
      label: item.name,
      value: item.key_main,
    }))
  }
  const reasons = getReasonsFromApi()

  // Reset selectedReasons khi selectedFeedback thay đổi
  const handleFeedbackChange = (feedback: number) => {
    setSelectedFeedback(feedback)
    setSelectedReasons([]) // Reset selected reasons khi thay đổi feedback
  }

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    )
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith('image/')
    )

    const remainingSlots = 3 - uploadedImages.length
    const filesToAdd = imageFiles.slice(0, remainingSlots)

    setUploadedImages((prev) => [...prev, ...filesToAdd])

    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleImageIconClick = () => {
    if (uploadedImages.length < 3) {
      fileInputRef.current?.click()
    }
  }

  // Lấy trực tiếp danh sách key_main đã chọn
  const getKeyMainValues = (): string[] => {
    return selectedReasons
  }

  const handleSubmit = () => {
    // Kiểm tra checkbox đã được tích chưa
    if (!agree) {
      return
    }

    // Lấy key_main values từ selected reasons
    const keyMainValues = getKeyMainValues()

    // Kiểm tra người dùng đã chọn ít nhất một lý do chưa
    if (keyMainValues.length === 0) {
      return
    }

    // Chuẩn bị dữ liệu theo type SendFeedbackRequest
    const submitData = {
      star_like: selectedFeedback,
      content_feedback: feedbackContent,
      improve: keyMainValues,
      file: uploadedImages.length > 0 ? uploadedImages : undefined,
    }

    // Gọi API để gửi feedback
    sendFeedbackMutation.mutate(submitData, {
      onSuccess: (data) => {
        setSelectedReasons([])
        setAgree(false)
        setSelectedFeedback(5)
        setUploadedImages([])
        setFeedbackContent('')
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        feedbackSuccessModal.open()
      },
      onError: (error) => {
        console.error('Error sending feedback:', error)
      },
    })
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-6 sm:gap-8 lg:gap-10 shadow-[0px_12px_40px_0px_#19213D0D] p-4 sm:p-6 lg:p-8 2xl:p-8 rounded-2xl sm:rounded-3xl bg-white mt-4 sm:mt-6 lg:mt-0">
      <div className="flex flex-col ">
        <h3 className="text-lg sm:text-xl leading-[140%] font-semibold font-primary">
          {titleExperience}
        </h3>
        <div className="flex items-center">
          <FeedbackSelect
            selected={selectedFeedback}
            onChange={handleFeedbackChange}
            defaultActive={5}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        <h3 className="text-lg sm:text-xl leading-[140%] font-semibold font-primary">
          {titleImprove}
        </h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {/* Loading state */}
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pink-600"></div>
              Loading reasons...
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-red-500 text-sm">Failed to load reasons</div>
          )}

          {/* Render reasons từ API */}
          {!isLoading &&
            !error &&
            reasons.map((reason: ImproveReasonOption) => {
              const active = selectedReasons.includes(reason.value)
              return (
                <button
                  key={reason.value}
                  type="button"
                  onClick={() => toggleReason(reason.value)}
                  className={
                    `cursor-pointer rounded-full border px-2 sm:px-3 py-1 text-xs sm:text-sm transition-all duration-200 active:scale-95 hover:shadow-md ` +
                    (active
                      ? 'bg-pink-600 text-white border-pink-600 hover:shadow-pink-200'
                      : 'bg-white text-gray-600 border-gray-600 hover:bg-gray-50 hover:border-gray-700 hover:shadow-gray-200')
                  }
                >
                  {reason.label}
                </button>
              )
            })}

          {/* No reasons available */}
          {!isLoading && !error && reasons.length === 0 && (
            <div className="text-gray-500 text-sm">
              No improvement options available for this rating
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        {/* TODO: phần này không làm đa ngôn khi tôi sẽ lấy từ api trả về sau */}
        <h3 className="text-lg sm:text-xl leading-[140%] font-semibold font-primary">
          {titleFeedback}
        </h3>
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />

          <div
            className={`w-full rounded-xl sm:rounded-2xl border border-[#D1D5DB] p-2 sm:p-3 pr-4 sm:pr-6 pt-4 sm:pt-6 flex flex-col transition-all duration-300 ${
              uploadedImages.length > 0
                ? 'min-h-[160px] sm:min-h-[180px] h-[180px] sm:h-[200px]'
                : 'min-h-[100px] sm:min-h-[120px] h-[120px] sm:h-[145px]'
            }`}
          >
            <textarea
              className="w-full resize-none outline-none text-xs sm:text-sm flex-1 placeholder:text-[#9CA3AF]"
              placeholder={t('textareaPlaceholder')}
              value={feedbackContent}
              onChange={(e) => setFeedbackContent(e.target.value)}
            />

            {/* Image previews */}
            {uploadedImages.length > 0 && (
              <div className="flex gap-1.5 sm:gap-2 mb-2">
                {uploadedImages.map((file, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded image ${index + 1}`}
                      width={60}
                      height={60}
                      className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                    >
                      <X size={10} weight="bold" className="sm:hidden" />
                      <X size={12} weight="bold" className="hidden sm:block" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-start gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handleImageIconClick}
                disabled={uploadedImages.length >= 3}
                className={`transition-all duration-200 hover:scale-110 active:scale-95 ${
                  uploadedImages.length >= 3
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer hover:opacity-80'
                }`}
              >
                <ImageIcon
                  size={16}
                  color={uploadedImages.length >= 3 ? '#9F9F9F' : '#6B7280'}
                  weight="regular"
                  className="sm:hidden"
                />
                <ImageIcon
                  size={18}
                  color={uploadedImages.length >= 3 ? '#9F9F9F' : '#6B7280'}
                  weight="regular"
                  className="hidden sm:block"
                />
              </button>
              {uploadedImages.length >= 3 && (
                <span className="text-xs text-gray-500">
                  {t('maxImagesReached')}
                </span>
              )}
            </div>
          </div>

          <label
            className="flex items-center gap-2 select-none cursor-pointer group"
            onClick={() => setAgree((v) => !v)}
            htmlFor="privacy-checkbox"
          >
            <span
              className={
                `h-[16px] w-[16px] sm:h-[18px] sm:w-[18px] rounded-[4px] border flex items-center justify-center transition-all duration-200 group-active:scale-95 ` +
                (agree
                  ? 'bg-pink-600 border-pink-600 '
                  : 'bg-white border-gray-300 group-hover:border-gray-400 group-hover:bg-gray-50')
              }
            >
              {agree && (
                <Check
                  size={12}
                  color="#ffffff"
                  weight="bold"
                  className="sm:hidden"
                />
              )}
              {agree && (
                <Check
                  size={14}
                  color="#ffffff"
                  weight="bold"
                  className="hidden sm:block"
                />
              )}
            </span>
            <span className="text-xs sm:text-sm leading-[100%] font-primary group-hover:text-gray-800 transition-colors duration-200">
              {t('privacyPolicy')}
            </span>
          </label>

          <div>
            <button
              onClick={handleSubmit}
              disabled={
                !agree ||
                selectedReasons.length === 0 ||
                sendFeedbackMutation.isPending
              }
              className={`px-3 sm:px-4 py-2 rounded-full text-white text-xs sm:text-sm transition-all duration-200 ${
                !agree || selectedReasons.length === 0
                  ? 'cursor-not-allowed bg-gray-400 opacity-50 hover:scale-100 hover:shadow-none'
                  : sendFeedbackMutation.isPending
                  ? 'cursor-wait bg-pink-400'
                  : 'cursor-pointer bg-pink-600 hover:bg-pink-600/80 active:scale-95'
              }`}
            >
              {sendFeedbackMutation.isPending
                ? 'Loading...'
                : t('submitFeedback')}
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal is provided globally via ModalProvider */}
    </div>
  )
}

export default FeedbackForm
