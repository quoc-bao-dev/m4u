'use client'

import React, { useEffect, useRef, useState } from 'react'

interface ReviewVideoProps {
  src: string
  poster?: string
  className?: string
  autoPlay?: boolean
}

const ReviewVideo: React.FC<ReviewVideoProps> = ({
  src,
  poster,
  className = '',
  autoPlay = true,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [objectUrl, setObjectUrl] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let worker: Worker | null = null
    let currentUrl: string | null = null
    let cancelled = false

    const setVideoSource = (videoUrl: string) => {
      if (cancelled) return
      currentUrl = videoUrl
      setObjectUrl(videoUrl)
    }

    const fallbackToDirectSrc = () => {
      console.warn('[ReviewVideo] Falling back to direct video src')
      setVideoSource(src)
    }

    const loadVideo = () => {
      if (typeof window === 'undefined' || !('Worker' in window)) {
        fallbackToDirectSrc()
        return
      }

      worker = new Worker(new URL('./videoLoader.worker.ts', import.meta.url))
      worker.postMessage({ src })
      worker.onmessage = (event) => {
        const { objectUrl: workerUrl, error } = event.data || {}
        if (error) {
          console.error('[ReviewVideo] load error:', error)
          fallbackToDirectSrc()
          return
        }
        if (workerUrl) {
          setVideoSource(workerUrl)
        }
      }
      worker.onerror = (error) => {
        console.error('[ReviewVideo] worker error:', error.message)
        fallbackToDirectSrc()
      }
    }

    loadVideo()

    return () => {
      cancelled = true
      if (worker) {
        worker.terminate()
      }
      if (currentUrl && currentUrl !== src) {
        URL.revokeObjectURL(currentUrl)
      }
      setObjectUrl(null)
      setIsReady(false)
    }
  }, [src])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !objectUrl) return

    if (video.src !== objectUrl) {
      video.src = objectUrl
    }
    const handleCanPlay = () => {
      setIsReady(true)
      if (autoPlay) {
        video.play().catch(() => {})
      }
    }

    const handleWaiting = () => setIsReady(false)
    const handleError = () => setIsReady(false)

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('waiting', handleWaiting)
    video.addEventListener('error', handleError)

    video.load()

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('waiting', handleWaiting)
      video.removeEventListener('error', handleError)
    }
  }, [objectUrl, autoPlay])

  return (
    <div className={`absolute inset-0 ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        poster={poster}
        preload="auto"
      />
      <div
        className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-300 ${
          isReady ? 'opacity-0' : 'opacity-20'
        }`}
      />
    </div>
  )
}

export default ReviewVideo
