'use client'

import React, { useEffect, useRef } from 'react'

type VideoWrapperProps = {
  src: string
  className?: string
  playbackRate?: number
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
}

const VideoWrapper: React.FC<VideoWrapperProps> = ({
  src,
  className,
  playbackRate = 0.5,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return
    try {
      videoEl.playbackRate = playbackRate
    } catch {}
  }, [playbackRate])

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      className={className}
    />
  )
}

export default VideoWrapper


