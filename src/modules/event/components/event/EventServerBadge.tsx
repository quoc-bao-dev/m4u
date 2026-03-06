'use client'
import { BroadcastIcon } from '@phosphor-icons/react'

type EventServerBadgeProps = {
  id?: number
  name: string
  color: string
  showIcon?: boolean
}

const EventServerBadge = ({
  id,
  name,
  color,
  showIcon = false,
}: EventServerBadgeProps) => {
  const colorText = id === 3 ? 'text-greyscale-500' : 'text-white'
  return (
    <div
      className="flex items-center gap-1 rounded-full py-2 px-3"
      style={{ backgroundColor: color }}
    >
      {showIcon && <BroadcastIcon className={colorText} />}
      <span className={`text-xs font-medium ${colorText}`}>{name}</span>
    </div>
  )
}

export default EventServerBadge
