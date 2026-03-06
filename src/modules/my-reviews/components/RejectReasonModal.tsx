'use client'

import { ModalClient } from '@/core/components/common/modal-client/ModalClient'
import { useTranslations } from 'next-intl'

type RejectReasonModalProps = {
  open: boolean
  onClose: () => void
  reason?: string | null
}

const RejectReasonModal = ({
  open,
  onClose,
  reason,
}: RejectReasonModalProps) => {
  const t = useTranslations('myReviews.history.reasonModal')
  return (
    <ModalClient
      open={open}
      onClose={onClose}
      className="max-w-[560px] w-full h-auto md:max-h-[80vh]"
    >
      <div className="p-4 sm:p-6 md:p-8">
        <div className="text-lg md:text-xl font-semibold text-greyscale-900 mb-3 md:mb-4">
          {t('title')}
        </div>
        <div className="text-sm md:text-base text-greyscale-700 whitespace-pre-line break-words">
          {reason && reason.trim().length > 0 ? reason : t('empty')}
        </div>
        <div className="mt-6 md:mt-8 flex justify-end">
          <button
            className="cursor-pointer px-10 py-2.5 text-sm bg-pink-600  text-white font-medium hover:bg-pink-600/80 transition-colors rounded-full"
            onClick={onClose}
          >
            {t('close')}
          </button>
        </div>
      </div>
    </ModalClient>
  )
}

export default RejectReasonModal
