'use client'

import { useInView } from '@/core/hooks'
import { LiveStreamBadge } from '../badge'
import { sLiveStreamStatus } from './sLiveStreamSignal'
import { useEffect } from 'react'

const LiveStreamTracking = () => {
  const { ref: badgeRef, isInView } = useInView<HTMLDivElement>({
    threshold: 0.1, // Element phải có ít nhất 10% nằm trong viewport
    rootMargin: '0px 0px -50px 0px', // Thêm margin bottom để trigger sớm hơn

    onInView: () => {
      sLiveStreamStatus.set(false)
    },
    onNotInView: () => {
      sLiveStreamStatus.set(true)
    },
  })

  useEffect(() => {
    sLiveStreamStatus.set(!isInView)
  }, [isInView])

  return (
    <div className="" ref={badgeRef}>
      <LiveStreamBadge />
    </div>
  )
}

export default LiveStreamTracking
