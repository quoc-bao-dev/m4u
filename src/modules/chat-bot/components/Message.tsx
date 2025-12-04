import { ChatMessageItem } from '@/services/chat-bot'
import { useToast } from '@/core/hooks'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { memo, useState } from 'react'
import { useHandleNext, useHandleScript } from '../hooks'
import { useAuth } from '@/modules/auth/stores/useAuth'
import { useCartStore } from '@/modules/trial-registration/stores/useCartStore'
import { useCartIconStore } from '@/modules/trial-registration/stores/useCartIconStore'
import useModalRegistration from '@/modules/trial-registration/stores/useModalRegistration'
import { chatStore } from '../store/chatStore'

const IMAGE_AVATAR = '/chat-bot/Avatar.png'

type MessageProps = ChatMessageItem & {
  onClose?: () => void
}

const formatHtmlContent = (html?: string) => {
  if (!html) return ''

  return html
    .replace(/&nbsp;/gi, '')
    .replace(
      /<ul[^>]*>/gi,
      '<ul style="font-family: var(--font-primary); font-size: 11px; line-height: 1.5; color: #525252; list-style: disc; padding-left: 1rem; margin: 0;">'
    )
    .replace(/<\/ul>/gi, '</ul>')
    .replace(
      /<li[^>]*>/gi,
      '<li style="margin-bottom: 3px; list-style: disc;">'
    )
    .replace(/<\/li>/gi, '</li>')
}

const Message = ({
  message,
  event_show,
  event_app,
  options,
  is_multiple,
  next,
  type_send,
  products,
  id,
  event,
  onClose,
}: MessageProps) => {
  const t = useTranslations('chatBot')
  const locale = useLocale()
  const router = useRouter()
  const { showInfo } = useToast()
  const { isAuthenticated } = useAuth()
  const addProductToCart = useCartStore((state) => state.addItem)
  const isItemInCart = useCartStore((state) => state.isItemInCart)
  const openCart = useCartIconStore((state) => state.openCart)
  const openModalRegistration = useModalRegistration((state) => state.open)

  if (event_app === 'event_restart') {
    return (
      <RestartSurveyMessage
        message={message}
        next={typeof next === 'string' ? next : null}
        messageId={id}
      />
    )
  }

  if (event_show === 'select' || event === 'select') {
    return (
      <SelectTextMessage message={message} options={options} messageId={id} />
    )
  }

  if (
    (event_app === 'products_filter' || event_show === 'products_filter') &&
    options?.length
  ) {
    if (is_multiple === 1) {
      return (
        <MultiSelectTab
          question={message}
          options={options}
          next={next as string}
          messageId={id}
        />
      )
    }
    return <SelectTab question={message} options={options} messageId={id} />
  }

  if (event_app === 'result_products_filter') {
    const handleRegisterTrial = () => {
      if (!products) return
      // Đóng chat box sau khi chuyển hướng sang trang sản phẩm
      if (onClose) {
        onClose()
      }

      if (!isAuthenticated) {
        openModalRegistration({
          productId: products.id,
          productImage: products.image,
          productName: products.name,
          productBrand: products.code,
          productColor: products.color_header ?? undefined,
        })
        return
      }

      if (!isItemInCart(products.id)) {
        addProductToCart(products.id)
      }

      openCart()

      const targetLocale = locale || 'vi'
      const slug = products.slug || String(products.id)
      router.push(`/${targetLocale}/product/${slug}`)
    }

    const handleBuyNow = () => {
      showInfo(t('featureInDevelopment'))
    }

    return (
      <div className="flex">
        <div className="flex-1">
          <div className="bg-[#FFF0F7] rounded-[24px] p-4">
            <p className="text-sm text-center w-[80%] mx-auto">{message}</p>

            {/* tag */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {products?.tags.map((tag) => (
                <div
                  key={tag.name}
                  className="bg-[#DBEBFF] rounded-[8px] px-2 py-1"
                >
                  <p className="text-xs text-[#303437] font-medium">
                    {tag.name}
                  </p>
                </div>
              ))}
            </div>

            {/* product info */}
            <div className="flex items-center pt-3">
              <div className="pt-[18px] px-[12px] pb-[16px] rounded-[12px] bg-white">
                <div className="w-full aspect-[251/129] rounded-[8px] overflow-hidden">
                  <img
                    src={products?.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-[#171717] text-[12px] pt-3 font-medium">
                  {products?.name}
                </div>

                <div className="pt-3 flex flex-col gap-2">
                  {products?.ingredients.map((ingredient) => (
                    <div key={ingredient.id}>
                      <p className="text-[#525252] font-medium text-[12px]">
                        {ingredient.title ?? ingredient.name}
                      </p>
                      <div
                        className="text-[11px] pt-1"
                        dangerouslySetInnerHTML={{
                          __html: formatHtmlContent(ingredient.content),
                        }}
                      ></div>
                    </div>
                  ))}
                </div>

                <div className="pt-[18px] flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRegisterTrial}
                    className=" flex-1  cursor-pointer w-fit px-1 py-2 rounded-lg border border-[#F466AA] bg-white text-[#F466AA] text-sm font-medium transition-colors hover:bg-[#F466AA] hover:text-white truncate"
                  >
                    {t('registerTrial')}
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="cursor-pointer flex-1 px-4 py-2 rounded-lg bg-[#F466AA] text-white text-sm font-medium transition-colors hover:bg-[#DB5B9A]"
                  >
                    {t('buyNow')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (type_send == 1) {
    return (
      <div className="flex justify-end">
        <div className="bg-[#DB5B9A] text-white rounded-t-[24px] rounded-l-[24px] px-4 py-2 max-w-[276px]">
          <p className="text-sm">{message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <img src={IMAGE_AVATAR} alt="" className="size-[35px] object-contain" />
      <div className="flex-1">
        <div className="bg-[#FFF0F7] rounded-b-[24px] rounded-r-[24px] p-4">
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default memo(Message)

type RestartSurveyMessageProps = {
  message: string
  next?: string | null
  messageId: number
}

const RestartSurveyMessage = ({
  message,
  next,
  messageId,
}: RestartSurveyMessageProps) => {
  const t = useTranslations('chatBot')
  const { handleNext } = useHandleNext()
  const {
    message: storeMessages,
    setMessageActive,
    clearMessages,
    setIsChatBotTyping,
  } = chatStore()

  const { delay } = useHandleScript()

  const currentMessage = storeMessages.find((item) => item.id === messageId)
  const isMessageActive = currentMessage?.active ?? true

  const handleRestart = async () => {
    if (!isMessageActive) return
    if (!next || typeof next !== 'string') return
    setMessageActive(messageId, false)
    clearMessages()
    setIsChatBotTyping(true)
    await delay()
    handleNext(next)
  }

  return (
    <div className="bg-[#FFF0F7] rounded-b-[24px] rounded-r-[24px] p-4 w-fit">
      <p className="text-sm w-fit">{message}</p>

      <div className="pt-3">
        <button
          type="button"
          onClick={handleRestart}
          disabled={!isMessageActive}
          className={`bg-white py-2 px-4 rounded-full text-sm text-[#525252] font-medium text-center flex items-center gap-2 w-fit transition-colors ${
            isMessageActive
              ? 'cursor-pointer hover:bg-[#F2F2F2]'
              : 'cursor-not-allowed opacity-70'
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.72563 4.94252C3.46675 3.66345 4.64746 2.6973 6.0479 2.22397C7.44835 1.75064 8.97309 1.8024 10.3382 2.3696C11.7034 2.9368 12.8158 3.98078 13.4685 5.30717C14.1212 6.63356 14.2696 8.15194 13.8861 9.5796C13.5026 11.0073 12.6133 12.2469 11.3838 13.0677C10.1544 13.8885 8.66849 14.2345 7.2029 14.0413C5.7373 13.8481 4.39187 13.1288 3.41711 12.0174C2.44236 10.9061 1.90472 9.47832 1.9043 8.00005"
              stroke="#525252"
              strokeWidth="0.952381"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.71363 4.9524H2.66602V1.90479"
              stroke="#525252"
              strokeWidth="0.952381"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="text-sm font-medium">{t('restartSurvey')}</p>
        </button>
      </div>
    </div>
  )
}

type SelectTextMessageProps = {
  message: string
  options?: NonNullable<ChatMessageItem['options']>
  messageId: number
}

const SelectTextMessage = ({
  message,
  options,
  messageId,
}: SelectTextMessageProps) => {
  const { handleNext } = useHandleNext()
  const { delay } = useHandleScript()

  const {
    clearMessages,
    setIsChatBotTyping,
    message: storeMessages,
    setMessageActive,
    setMessageSelectedOptionIds,
  } = chatStore()

  const currentMessage = storeMessages.find((item) => item.id === messageId)
  const isMessageActive = currentMessage?.active ?? true

  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(
    () => {
      const ids = currentMessage?.selectedOptionIds
      if (ids && ids.length > 0) return ids[0]
      return null
    }
  )

  const handleClick = async (
    option: NonNullable<ChatMessageItem['options']>[number]
  ) => {
    if (!isMessageActive) return

    setSelectedOptionId(option.id)
    setMessageSelectedOptionIds(messageId, [option.id])
    setMessageActive(messageId, false)

    if (option.active_start === 1) {
      clearMessages()
      setIsChatBotTyping(true)
      await delay()
    }

    if (option.end_to_reset === 1) {
      clearMessages()
    }

    // Log các key active_start và end_to_reset để debug flow
    console.log('SelectTextMessage option meta:', {
      active_start: option.active_start,
      end_to_reset: option.end_to_reset,
    })

    if (option.next) {
      handleNext(option.next)
    }
  }

  return (
    <div className="flex-1 w-fit">
      <div className="bg-[#FFF0F7] rounded-b-[24px] rounded-r-[24px] p-4 w-fit">
        <p className="text-sm w-fit">{message}</p>
      </div>
      <div className="pt-2 flex gap-3 flex-wrap">
        {options?.map((option) => {
          const isSelected = selectedOptionId === option.id
          const isDisabled = !isMessageActive

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleClick(option)}
              disabled={isDisabled}
              className={`text-left text-sm w-fit rounded-[24px] px-4 py-2 transition-colors cursor-pointer ${
                isSelected ? 'bg-[#F466AA] text-white' : 'bg-[#FFF0F7]'
              } ${
                isDisabled
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:bg-[#F466AA] hover:text-white'
              }`}
            >
              {option.content ?? option.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

type SelectTabProps = {
  question: string
  options: NonNullable<ChatMessageItem['options']>
  messageId: number
}

const SelectTab = ({ question, options, messageId }: SelectTabProps) => {
  const { handleNext } = useHandleNext()
  const {
    message: storeMessages,
    setMessageActive,
    setMessageSelectedOptionIds,
  } = chatStore()

  const currentMessage = storeMessages.find((item) => item.id === messageId)
  const isMessageActive = currentMessage?.active ?? true

  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(
    () => {
      const ids = currentMessage?.selectedOptionIds
      if (ids && ids.length > 0) return ids[0]
      return null
    }
  )

  const onOptionClick = (next: string, optionId: number) => () => {
    if (!isMessageActive) return

    setSelectedOptionId(optionId)
    setMessageSelectedOptionIds(messageId, [optionId])
    setMessageActive(messageId, false)
    handleNext(next)
  }

  return (
    <div className="w-fit">
      <div className="bg-[#FFF0F7] rounded-[24px] p-4 w-fit">
        <p className="text-sm w-fit">{question}</p>
        <div className="pt-2 flex flex-wrap gap-2 w-fit">
          {options.map((option) => {
            const isSelected = selectedOptionId === option.id
            const isActive = isSelected && !isMessageActive
            const iconSrc =
              isActive && option.icon_active ? option.icon : option.icon_active
            const isDisabled = !isMessageActive

            return (
              <button
                key={option.id}
                type="button"
                onClick={onOptionClick(option.next, option.id)}
                disabled={isDisabled}
                className={`flex gap-2 px-[12px] py-[6px] items-center rounded-[16px] transition-colors ${
                  isActive
                    ? 'bg-[#F466AA] text-white'
                    : 'bg-white text-[#525252]'
                } ${
                  isDisabled
                    ? 'opacity-90- cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                {iconSrc && (
                  <img
                    src={iconSrc}
                    alt=""
                    className="size-[22px] rounded-full"
                  />
                )}
                <p className="text-xs py-0.5">
                  {option.content ?? option.name}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

type MultiSelectTabProps = {
  question: string
  options: NonNullable<ChatMessageItem['options']>
  next: string
  messageId: number
}

const MultiSelectTab = ({
  question,
  options,
  next,
  messageId,
}: MultiSelectTabProps) => {
  const { handleNext } = useHandleNext()
  const {
    message: storeMessages,
    setMessageActive,
    setMessageSelectedOptionIds,
  } = chatStore()

  const currentMessage = storeMessages.find((item) => item.id === messageId)
  const isMessageActive = currentMessage?.active ?? true

  const [selectedOptionIds, setSelectedOptionIds] = useState<number[]>(() => {
    return currentMessage?.selectedOptionIds ?? []
  })

  const onOptionClick = (optionId: number) => () => {
    if (!isMessageActive) return

    setSelectedOptionIds((prev) => {
      let nextSelected: number[]
      if (prev.includes(optionId)) {
        nextSelected = prev.filter((id) => id !== optionId)
      } else {
        nextSelected = [...prev, optionId]
      }
      setMessageSelectedOptionIds(messageId, nextSelected)
      return nextSelected
    })
  }

  const handleSubmit = () => {
    if (!isMessageActive) return

    if (selectedOptionIds.length === 0 || !next || typeof next !== 'string') {
      return
    }

    // Lấy giá trị từ các option đã chọn
    // Theo demo: value > id > key > name > content
    // Trong type hiện tại chỉ có id và name, nên dùng id
    const selectedValues = selectedOptionIds
      .map((optionId) => {
        const option = options.find((opt) => opt.id === optionId)
        // Ưu tiên: value > id > key > name > content
        // Vì type không có value/key/content, dùng id
        return option?.id?.toString() || ''
      })
      .filter(Boolean)

    if (selectedValues.length === 0) return

    // Xây dựng query string: id[]=value1&id[]=value2...
    const queryParam = selectedValues
      .map((value) => `id[]=${encodeURIComponent(value)}`)
      .join('&')

    // Ghép vào URL
    let url = next
    if (url.indexOf('?') === -1) {
      url += '?' + queryParam
    } else {
      url += '&' + queryParam
    }

    handleNext(url)
    setMessageActive(messageId, false)
  }

  const hasSelection = selectedOptionIds.length > 0

  return (
    <div className="w-fit">
      <div className="bg-[#FFF0F7] rounded-[24px] p-4 w-fit">
        <p className="text-sm w-fit">{question}</p>
        <div className="flex items-end flex-col gap-2">
          {/* ==== options ==== */}
          <div className="pt-2 flex flex-wrap gap-2">
            {options.map((option) => {
              const isSelected = selectedOptionIds.includes(option.id)
              const iconSrc =
                isSelected && option.icon_active
                  ? option.icon_active
                  : option.icon

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={onOptionClick(option.id)}
                  disabled={!isMessageActive}
                  className={`flex gap-2 px-[12px] py-[6px] items-center rounded-[16px] transition-colors ${
                    isSelected
                      ? 'bg-[#F466AA] text-white'
                      : 'bg-white text-[#525252]'
                  } ${
                    !isMessageActive
                      ? 'opacity-90- cursor-not-allowed'
                      : 'cursor-pointer'
                  }`}
                >
                  {iconSrc && (
                    <img
                      src={iconSrc}
                      alt=""
                      className="size-[22px] rounded-full"
                    />
                  )}

                  <p className="text-xs py-0.5">
                    {option.content ?? option.name}
                  </p>
                </button>
              )
            })}
          </div>

          {/* ==== icon send ==== */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!hasSelection || !isMessageActive}
            className={`flex items-center justify-center size-[32px] rounded-lg transition-colors flex-shrink-0 ${
              hasSelection && isMessageActive
                ? 'bg-[#F466AA] text-white cursor-pointer'
                : 'bg-[#A3A3A3] text-white cursor-not-allowed'
            }`}
          >
            {iconSend}
          </button>
        </div>
      </div>
    </div>
  )
}

const iconSend = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.6667 1.33334L7.33334 8.66667M14.6667 1.33334L10 14.6667L7.33334 8.66667M14.6667 1.33334L1.33334 6.00001L7.33334 8.66667"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
