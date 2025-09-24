'use client'

import { Rating, Timer } from '@/core/components'
import Button from '@/core/components/ui/button'
import { useToast } from '@/core/hooks'
import { getRatingI18nKey } from '@/core/utils'
import { useRouter, useTranslation } from '@/locale'
import { useAuth } from '@/modules/auth'
import { AccordionItem } from '@/modules/trial-registration'
import { useCartIconStore } from '@/modules/trial-registration/stores/useCartIconStore'
import { useCartStore } from '@/modules/trial-registration/stores/useCartStore'
import useModalRegistration from '@/modules/trial-registration/stores/useModalRegistration'
import { Ingredient } from '@/services/product'
import { useGetDataReviewHubDetailInfinite } from '@/services/review-hub/queries'
import { PauseIcon, PenIcon, PlayIcon } from '@phosphor-icons/react'
import React from 'react'
import AvatarStack from './AvatarStack'

type RightContentProps = {
  id: string | number
  name: string
  code: string
  image: string
  colorHeader?: string | null
  time?: string
  ingredients: Ingredient[]
  rate: number
  quantityReviews: number
  limitPeople: number
  participation: number
  isSig?: number
  video_review?: string | null
  evaluate: number
  id_review: number
  slug: string
}

const RightContent = ({ id, name, code, image, colorHeader, time, ingredients, rate, quantityReviews, limitPeople, participation, isSig, video_review, evaluate, id_review, slug,
}: RightContentProps) => {
  const { t } = useTranslation()
  const { data } = useGetDataReviewHubDetailInfinite(slug as string)

  return (
    <div className="w-full bg-yellow-100  py-4 px-4 lg:p-[48px] md:rounded-3xl">
      <p className="text-[12px] md:text-[20px] font-bold">&nbsp;</p>
      <h2 className="text-[16px] md:text-[32px]">{name}</h2>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center flex-row md:flex-col lg:flex-row">
          <Rating rate={rate} className=":mb-2 w-[100px] md:w-[120px]" />
          <p className="text-[14px] md:text-[16px] lg:text-[20px] xl:text-[28px] text-greyscale-900 truncate">
            {rate}{' '}
            <span className="text-greyscale-400 truncate">
              ({quantityReviews} {t('product.reviews')})
            </span>
          </p>
        </div>

        {time && time !== '0:00:00:00' ? (
          <div className="relative hidden md:flex items-center gap-2">
            <Timer initTime={time} />
          </div>
        ) : null}
      </div>

      <div className="pt-2 md:pt-6 flex md:flex-row flex-col md:justify-between md:items-end gap-4">
        <AvatarStack data={data?.pages?.[0]?.review} limitPeople={limitPeople} participation={participation} />
        <div className="flex justify-start">
          <ButtonRegister
            productId={id}
            productImage={image}
            productName={name}
            productCode={code}
            productColor={colorHeader || undefined}
            isSig={isSig}
            id_review={id_review}
            video_review={video_review || undefined}
            evaluate={evaluate}
          />
        </div>
      </div>

      <div className="pt-4 md:pt-10 flex flex-col gap-4">
        {ingredients?.map((ing, index) => (
          <AccordionItem
            key={ing.id}
            title={ing.title || ing.name}
            defaultOpen={index == 0}
          >
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <h1 className="text-lg font-medium ">{ing.name}</h1>
              <p dangerouslySetInnerHTML={{ __html: ing.content }} />
            </div>
          </AccordionItem>
        ))}
      </div>
    </div>
  )
}

type ButtonRegisterProps = {
  productId: string | number
  productImage: string
  productName: string
  productCode: string
  productColor?: string
  isSig?: number
  video_review?: string
  evaluate: number
  id_review: number
}

const ButtonRegister = ({ productId, productImage, productName, productCode, productColor, isSig, video_review, evaluate, id_review }: ButtonRegisterProps) => {
  const { open: onpen } = useModalRegistration()
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()
  const { addItem, isItemInCart } = useCartStore()
  const { openCart } = useCartIconStore()
  const { showSuccess, showError } = useToast()
  const router = useRouter()
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const togglePlay = (e: any) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation()
      e.preventDefault()
    }
    const el = videoRef.current
    if (!el) return
    if (isPlaying) {
      el.pause()
      setIsPlaying(false)
    } else {
      el.play()
      setIsPlaying(true)
    }
  }

  if (isSig === 0) {
    return (
      <button
        type="button"
        onClick={() => router.push(`/submit-review/${id_review}`)}
        className="transform-gpu border-gradient-button-dynamic bg-white w-fit py-3 px-5 md:py-3 md:px-6 rounded-full cursor-pointer text-sm md:text-base flex items-center gap-3"
        style={{
          color: '#FF8500',
          transition: 'all 300ms ease',
          boxShadow:
            "0px 2px 4px rgba(255, 133, 0, 0.15), -2px -2px 8px rgba(255, 133, 0, 0.48) inset, 2px 2px 8px -5px rgba(255, 133, 0, 0.48) inset",
          ['--accent-color' as any]: '#FF8500',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#FF8500'
          e.currentTarget.style.color = '#fff'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff'
          e.currentTarget.style.color = '#FF8500'
        }}
      >
        <span className="truncate">{t('product.writeYourReview')}</span>
        <PenIcon />
      </button>
    )
  }
  if (isSig === 1) {
    return (
      <div className='flex flex-col gap-3 items-center'>
        {video_review ? (
          <div className='relative cursor-pointer group' onClick={togglePlay}>
            <div className={`absolute size-7 2xl:size-9 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-black/50 rounded-full transition-opacity duration-200 pointer-events-none ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
              {isPlaying ? (
                <PauseIcon weight="fill" className="size-5 text-white" />
              ) : (
                <PlayIcon weight="fill" className="size-5 text-white" />
              )}
            </div>
            <video ref={videoRef} muted loop playsInline src={video_review} className='w-16 aspect-[65/83] rounded-lg object-cover' />
          </div>
        ) : null}
        <div className='flex flex-col items-center'>
          <Rating rate={evaluate || 0} className='w-24' />
          <p className='text-xs font-semibold text-[#4E5969]'>{t(getRatingI18nKey(evaluate))}</p>
        </div>
      </div>
    )
  }

  if (isSig === null) {
    return (
      <Button
        size="md"
        variant="primary"
        onClick={() => {
          if (!isAuthenticated) {
            onpen({
              productId,
              productImage,
              productName,
              productBrand: productCode,
              productColor,
            })
            return
          }

          if (!isItemInCart(Number(productId))) {
            addItem(Number(productId))
            showSuccess(t('cart.addedToCart'))
            openCart()
          } else {
            showError(t('cart.alreadyInCart'))
          }
        }}
      >
        <span className="truncate"> {t('product.registerBtn')}</span>
      </Button>
    )
  }

  return null
}

export default RightContent
