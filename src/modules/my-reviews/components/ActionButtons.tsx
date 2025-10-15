'use client'

import { useCallback } from 'react'
import { useTranslations } from 'next-intl'

type Props = {
  active: number
  onEdit?: () => void
  onViewDetails?: () => void
  onViewReason?: () => void
  onRewrite?: () => void
  layout?: 'row' | 'col'
}

const ActionButtons = ({
  active,
  onEdit,
  onViewDetails,
  onViewReason,
  onRewrite,
}: Props) => {
  const tTable = useTranslations('myReviews.history.table')

  const handleEdit = useCallback(() => {
    onEdit?.()
  }, [onEdit])

  const handleViewDetails = useCallback(() => {
    onViewDetails?.()
  }, [onViewDetails])

  const handleViewReason = useCallback(() => {
    onViewReason?.()
  }, [onViewReason])

  const handleRewrite = useCallback(() => {
    onRewrite?.()
  }, [onRewrite])

  if (active === 0) {
    return (
      <button
        className="truncate  w-fit lg:w-full cursor-pointer px-4 py-2.5 text-xs bg-white text-greyscale-900 font-medium border border-greyscale-300 hover:bg-white/60 transition-colors rounded-full"
        onClick={handleEdit}
      >
        {tTable('actions.edit', { default: 'Edit' })}
      </button>
    )
  }

  if (active === 1) {
    return (
      <button
        className="truncate w-fit lg:w-full cursor-pointer px-4 py-2.5 text-xs bg-white text-pink-600 font-medium border border-pink-600 hover:bg-pink-50 transition-colors rounded-full"
        onClick={handleViewDetails}
      >
        {tTable('actions.viewDetails', { default: 'View details' })}
      </button>
    )
  }

  if (active === 2) {
    return (
      <div className="flex md:flex-col gap-2">
        <button
          className="truncate w-full cursor-pointer px-4 py-2.5 text-xs bg-white text-greyscale-900 font-medium border border-greyscale-300 hover:bg-white/60 transition-colors rounded-full"
          onClick={handleViewReason}
        >
          {tTable('actions.viewReason', { default: 'View reason' })}
        </button>
        <button
          className="cursor-pointer px-4 py-2.5 text-xs bg-pink-600 text-white font-medium hover:bg-pink-600/80 transition-colors rounded-full whitespace-nowrap"
          onClick={handleRewrite}
        >
          {tTable('actions.rewriteReview', { default: 'Rewrite review' })}
        </button>
      </div>
    )
  }

  return null
}

export default ActionButtons
