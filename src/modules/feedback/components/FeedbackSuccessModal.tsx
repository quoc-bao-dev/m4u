'use client'

import { ModalClient } from '@/core/components'
import { useRouter } from '@/locale'
import { Heart } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import useFeedbackSuccessModal from '../stores/useFeedbackSuccessModal'

const FeedbackSuccessModal = () => {
  const t = useTranslations('feedback.modal')
  const store = useFeedbackSuccessModal()
  const router = useRouter()

  const handleClose = () => {
    store.close()
    router.push('/')
  }

  return (
    <ModalClient
      open={store.isOpen}
      onClose={handleClose}
      showCloseButton={true}
      className="w-full mx-3 md:mx-0 md:w-[420px] h-fit md:h-auto rounded-3xl"
    >
      <div className="relative bg-white rounded-2xl max-w-sm w-full p-8">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-gray-900">
              {t('thankYou')}
            </h2>
            <Heart size={20} weight="fill" className="text-pink-500" />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {t('message')}
          </p>
        </div>
      </div>
    </ModalClient>
  )
}

export default FeedbackSuccessModal
