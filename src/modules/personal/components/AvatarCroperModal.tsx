'use client'

import { ModalClient } from '@/core/components'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Cropper from 'react-easy-crop'
import useAvatarCropper from '../stores/useAvatarCropper'
import { useTranslation } from '@/locale/hooks'

type AreaPixels = { width: number; height: number; x: number; y: number }

async function createCroppedImageBlob(
  imageSrc: string,
  crop: AreaPixels,
  fileType: string = 'image/jpeg',
  quality = 0.9
): Promise<Blob> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = imageSrc
  })

  const canvas = document.createElement('canvas')
  canvas.width = crop.width
  canvas.height = crop.height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas context not available')

  // Fill background with white color
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, crop.width, crop.height)

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  )

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Failed to create blob'))
      },
      fileType,
      quality
    )
  })
}

const AvatarCroperModal = () => {
  const { isOpen, imageSrc, close, onConfirm } = useAvatarCropper()
  const { t } = useTranslation()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<AreaPixels | null>(
    null
  )
  const [submitting, setSubmitting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [cropSize, setCropSize] = useState<{ width: number; height: number }>()
  const [mediaSize, setMediaSize] = useState<{
    width: number
    height: number
  } | null>(null)
  const [minZoom, setMinZoom] = useState(1)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setInset(100)
      }, 400)
    } else {
      setInset(0)
    }
  }, [isOpen])
  const [inset, setInset] = useState(0)
  // Tự động tính cropSize (vuông) nhỏ hơn container một chút để dễ kéo chạm rìa
  useEffect(() => {
    if (!isOpen) return
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const size = Math.min(el.clientWidth, el.clientHeight)
      // const inset = 100 // chừa viền để người dùng kéo ảnh chạm rìa crop dễ hơn
      const target = Math.max(10, size - inset)
      setCropSize({ width: target, height: target })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [isOpen, inset])

  // Khi ảnh đã load xong, lấy kích thước hiển thị để tính minZoom
  const handleMediaLoaded = useCallback(
    ({ width, height }: { width: number; height: number }) => {
      setMediaSize({ width, height })
    },
    []
  )

  // Tính minZoom động dựa trên cạnh ngắn nhất của ảnh để ảnh luôn phủ kín vùng crop
  const recomputeMinZoom = useCallback(() => {
    if (!mediaSize || !cropSize) return
    const shortestMediaSide = Math.min(mediaSize.width, mediaSize.height)
    const required = cropSize.width / shortestMediaSide
    // minZoom phải ít nhất = 1e-6 để tránh NaN, và không vượt quá maxZoom logic
    setMinZoom(required)
    // Kẹp zoom hiện tại ≥ minZoom
    setZoom((z) => Math.max(z, required))
  }, [mediaSize, cropSize])

  useEffect(() => {
    recomputeMinZoom()
  }, [recomputeMinZoom, inset])

  const onCropComplete = useCallback(
    (_croppedArea: any, croppedPixels: any) => {
      setCroppedAreaPixels(croppedPixels as AreaPixels)
    },
    []
  )

  const canSubmit = useMemo(
    () => Boolean(imageSrc && croppedAreaPixels && !submitting),
    [imageSrc, croppedAreaPixels, submitting]
  )

  const handleConfirm = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels || !onConfirm) return
    try {
      setSubmitting(true)
      const blob = await createCroppedImageBlob(imageSrc, croppedAreaPixels)
      await onConfirm(blob)
      close()
    } finally {
      setSubmitting(false)
    }
  }, [imageSrc, croppedAreaPixels, onConfirm, close])

  // Giới hạn maxZoom tương đối để không quá “nhảy”
  const maxZoom = useMemo(() => Math.max(3, minZoom * 6), [minZoom])

  return (
    <ModalClient
      open={isOpen}
      onClose={close}
      className="max-w-[90vw] md:max-w-[560px] h-[75vh]! rounded-2xl! md:h-auto p-4 md:p-5"
      isFullscreen={false}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base md:text-lg font-semibold">
            {t('personal.avatarCropper.title')}
          </h3>
        </div>
        <p className="text-xs text-gray-500">
          {t('personal.avatarCropper.description')}
        </p>

        <div
          ref={containerRef}
          className="relative w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden"
        >
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={(z) =>
                // setZoom(Math.min(Math.max(z, minZoom), maxZoom))
                setZoom(Number(z))
              }
              onCropComplete={onCropComplete}
              onMediaLoaded={handleMediaLoaded}
              objectFit="contain"
              cropShape="rect"
              showGrid={false}
              restrictPosition={true} // ngăn kéo quá biên => crop luôn ở trong ảnh
              minZoom={1} // zoom tối thiểu để ảnh phủ kín vùng crop
              maxZoom={maxZoom}
              zoomWithScroll
              cropSize={cropSize}
              style={{
                containerStyle: {
                  backgroundColor: 'white',
                },
              }}
            />
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 min-w-10">
            {t('personal.avatarCropper.zoom')}
          </span>
          <input
            type="range"
            min={1}
            max={maxZoom}
            step={0.01}
            value={zoom}
            onChange={(e) =>
              setZoom(
                // Math.min(Math.max(parseFloat(e.target.value), minZoom), maxZoom)
                Number(e.target.value)
              )
            }
            className="zoom-range w-full"
          />
        </div>

        <div className="flex justify-end gap-2 md:gap-3">
          <button
            onClick={close}
            className="px-8 py-2 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            {t('personal.avatarCropper.cancel')}
          </button>
          <button
            disabled={!canSubmit}
            onClick={handleConfirm}
            className="px-8 py-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 disabled:bg-gray-300 cursor-pointer"
          >
            {submitting
              ? t('personal.avatarCropper.saving')
              : t('personal.avatarCropper.save')}
          </button>
        </div>

        <style jsx>{`
          .zoom-range {
            -webkit-appearance: none;
            appearance: none;
            height: 6px;
            background: #fce7f3;
            border-radius: 9999px;
            outline: none;
          }
          .zoom-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            background: #db2777;
            border-radius: 9999px;
            cursor: pointer;
            box-shadow: 0 0 0 3px #fff;
            border: 2px solid #db2777;
          }
          .zoom-range::-moz-range-thumb {
            width: 18px;
            height: 18px;
            background: #db2777;
            border-radius: 9999px;
            cursor: pointer;
            border: 2px solid #db2777;
          }
          .zoom-range::-moz-range-track {
            height: 6px;
            background: #fce7f3;
            border-radius: 9999px;
          }
        `}</style>
      </div>
    </ModalClient>
  )
}

export default AvatarCroperModal
