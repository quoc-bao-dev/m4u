'use client'
import Rating from '@/core/components/common/Rating'
import Button from '@/core/components/ui/button'
import { IMAGES } from '@/core/constants/IMAGES'
import { CornerTag } from '@/icons'
import { useTranslations } from 'next-intl'
import { CaretLeftIcon, CheckIcon, FilmStripIcon, ImageIcon, LightbulbIcon, XIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useGetListProductReview, useGetTypeEvaluate } from '@/services/review/queries'
import { useSubmitReview } from '@/services/review/mutations'
import { withAlpha } from '@/core/utils'

const SubmitReview = ({ id }: { id: number }) => {
  const router = useRouter()
  const t = useTranslations('submitReview')
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [ratings, setRatings] = useState<Record<number, number>>({})
  const [content, setContent] = useState('')
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const { data: typeEvaluate } = useGetTypeEvaluate()
  const { data: listProductReview } = useGetListProductReview(id)
  console.log(listProductReview)

  const { mutateAsync: submitReview, isPending } = useSubmitReview()

  useEffect(() => {
    if (Array.isArray(listProductReview) && listProductReview.length && selectedProductId === null) {
      setSelectedProductId(listProductReview[0].id)
    }
  }, [listProductReview, selectedProductId])

  const handleVideoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      const previewUrl = URL.createObjectURL(file)
      setVideoPreview(previewUrl)
      setVideoFile(file)
    }
  }

  const handleVideoRemove = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview)
    }
    setVideoPreview(null)
    setVideoFile(null)
    if (videoInputRef.current) {
      videoInputRef.current.value = ''
    }
  }

  const openVideoPicker = () => {
    videoInputRef.current?.click()
  }

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages: string[] = []
      const newFiles: File[] = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file.type.startsWith('image/')) {
          const previewUrl = URL.createObjectURL(file)
          newImages.push(previewUrl)
          newFiles.push(file)
        }
      }
      // Giới hạn tối đa 8 ảnh
      setSelectedImages(prev => [...prev, ...newImages].slice(0, 8))
      setImageFiles(prev => [...prev, ...newFiles].slice(0, 8))
    }
  }

  const handleImageRemove = (index: number) => {
    const imageToRemove = selectedImages[index]
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove)
    }
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
    setImageFiles(prev => prev.filter((_, i) => i !== index))
  }

  const openImagePicker = () => {
    imageInputRef.current?.click()
  }

  const productQualityItems = Array.isArray(typeEvaluate)
    ? typeEvaluate.filter((item) => item.type === 1)
    : []
  const overallExperienceItems = Array.isArray(typeEvaluate)
    ? typeEvaluate.filter((item) => item.type === 2)
    : []

  const activeColor = (listProductReview || []).find((p: any) => p.id === selectedProductId)?.background_color || '#FE6BBA'

  const handleChangeRating = (id: number, value: number) => {
    setRatings(prev => ({ ...prev, [id]: value }))
  }

  const resetForm = () => {
    // Revoke video preview
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview)
    }
    // Revoke image previews
    selectedImages.forEach((url) => {
      try { URL.revokeObjectURL(url) } catch {}
    })
    setVideoPreview(null)
    setVideoFile(null)
    setSelectedImages([])
    setImageFiles([])
    setRatings({})
    setContent('')
    if (videoInputRef.current) videoInputRef.current.value = ''
    if (imageInputRef.current) imageInputRef.current.value = ''
  }

  const handleSubmit = async () => {
    try {
      const form = new FormData()
      Object.entries(ratings).forEach(([id, value]) => {
        if (value && Number(value) > 0) {
          form.append(`list_evaluate[${id}]`, String(value))
        }
      })
      if (content.trim()) {
        form.append('content_evaluate', content.trim())
      }
      if (videoFile) {
        form.append('video_review', videoFile)
      }
      imageFiles.forEach((file, idx) => {
        form.append(`media_other[${idx}]`, file)
      })

      if (!selectedProductId) return
      await submitReview({ id: selectedProductId, data: form })
      resetForm()
      // TODO: Có thể reset form hoặc điều hướng nếu cần
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='pt-[72px] relative'>
      <Image src={IMAGES.topGradient2} width={1000} height={600} alt='top-gradient' className='absolute z-[-1] top-0 left-0 w-full object-cover -translate-y-1/3 scale-x-[-1.3] opacity-60' />
      <div className='px-3 lg:px-6 xl:px-40 2xl:px-[240px] lg:py-4 xl:py-16 flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-20 2xl:gap-32 w-full h-full'>
        {/* Cột trái - tỷ lệ 397/1312 ≈ 30.3% */}
        <div className='lg:flex-[300] xl::flex-[397] flex flex-col gap-2 xl:gap-8'>
          <div className='flex items-center gap-2 group cursor-pointer' onClick={() => router.back()}>
            <CaretLeftIcon className='size-5 text-greyscale-600 group-hover:text-pink-600 transition-all duration-300' />
            <p className='text-base font-normal text-greyscale-600 group-hover:text-pink-600 group-hover:font-medium transition-all duration-300'>{t('back')}</p>
          </div>
          <h2 className='pb-6 lg:pb-0 text-2xl xl:text-5xl font-semibold text-greyscale-700'>{t('title')}</h2>
          <div className='flex lg:flex-col gap-2 lg:gap-5 xl:gap-8 w-full overflow-x-auto pb-2'>
            {listProductReview?.map((item: any) => {
              const isActive = item.id === selectedProductId
              return (
                <div
                  key={item.id}
                  className='w-[134px] lg:w-full shrink-0 relative rounded-md xl:rounded-xl overflow-hidden cursor-pointer'
                  onClick={() => {
                    if (selectedProductId !== item.id) {
                      resetForm()
                      setSelectedProductId(item.id)
                    }
                  }}
                >
                  {isActive && (
                    <>
                      <CornerTag className='absolute top-0 right-0 w-[25px] lg:w-[50px]' style={{ color: item.background_color || '#FE6BBA' }} />
                      <CheckIcon className='absolute top-0.5 right-0.5 size-2.5 lg:size-5 xl:size-6 text-white' />
                    </>
                  )}
                  <div
                    className='p-1.5 lg:p-3 flex flex-col gap-1.5 lg:gap-3 rounded-md xl:rounded-xl border-[1.5px] lg:border-3 transition-colors duration-200'
                    style={{
                      borderColor: isActive ? withAlpha(item.background_color || '#FE6BBA', 0.9) : 'transparent',
                      backgroundColor: withAlpha(item.background_color || '#FE6BBA', 0.2),
                    }}
                  >
                    <div className='p-0.5 lg:p-1 px-7 lg:px-10 2xl:px-20 rounded-md xl:rounded-xl bg-white w-full aspect-[209/221] flex items-center justify-center'>
                      <Image src={item?.image || IMAGES.imageNoData} alt='review' width={1000} height={1000} className='w-full object-cover' />
                    </div>
                    <div className='flex flex-col gap-0.5 lg:gap-1'>
                      <h3 className='text-[6px] lg:text-[10px] font-bold text-greyscale-900'>{item?.code}</h3>
                      <p className='text-[8px] lg:text-sm font-normal text-greyscale-900'>{item?.name}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Cột phải - tỷ lệ 915/1312 ≈ 69.7% */}
        <div className='lg:flex-[915] h-fit p-0 lg:p-4 xl:p-10 rounded-none lg:rounded-3xl flex flex-col gap-4 xl:gap-6 bg-transparent lg:bg-white shadow-none lg:shadow-[0px_0px_60px_0px_rgba(0,0,0,0.1)]'>
          <div className='flex items-center gap-3'>
            <span className='w-3 h-8 rounded' style={{ backgroundColor: activeColor }}></span>
            <h2 className='text-xl font-semibold text-greyscale-900'>{t('shareReview')}</h2>
          </div>
          <hr className='border-greyscale-200 -mt-3 xl:mt-0' />
          <div className='flex flex-col gap-3'>
            <h3 className='text-sm font-medium text-greyscale-900'>
              <span className='text-red-500'>* </span>
              {t('addVideo')}
            </h3>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoSelect}
              className="hidden"
            />
            {videoPreview ? (
              <div className='relative w-full'>
                <video
                  src={videoPreview}
                  controls
                  className='w-full h-[200px] lg:h-[300px] rounded-3xl object-cover'
                />
                <button
                  onClick={handleVideoRemove}
                  className='absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 flex justify-center items-center'
                >
                  <XIcon className='size-4 text-white' />
                </button>
              </div>
            ) : (
              <div
                className='flex flex-col justify-center items-center gap-2.5 p-10 rounded-3xl bg-greyscale-50 border border-greyscale-200 cursor-pointer hover:bg-greyscale-100 transition-all duration-300'
                onClick={openVideoPicker}
              >
                <div className='p-3 rounded-full bg-white w-fit'>
                  <FilmStripIcon className='size-6 text-greyscale-500' />
                </div>
                <p className='text-base font-normal text-black/60'>{t('dropFiles')}</p>
              </div>
            )}
          </div>
          <div className='flex flex-col gap-3'>
            <h3 className='text-sm font-medium text-greyscale-900'>{t('addPhotos')}</h3>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="hidden"
            />
            <div className='flex gap-1 flex-wrap'>
              <div
                className='size-[72px] rounded-lg border border-greyscale-200 bg-greyscale-100 flex flex-col justify-center items-center gap-1 cursor-pointer hover:bg-greyscale-200 transition-all duration-300'
                onClick={openImagePicker}
              >
                <ImageIcon className='size-6 text-greyscale-500' />
                <p className='text-xs font-normal text-greyscale-900'>{selectedImages.length}/8</p>
              </div>
              {selectedImages.map((imageUrl, index) => (
                <div key={index} className='relative size-[72px] rounded-lg overflow-hidden'>
                  <div
                    className='absolute top-1 right-1 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 cursor-pointer flex justify-center items-center'
                    onClick={() => handleImageRemove(index)}
                  >
                    <XIcon className='size-4 text-white' />
                  </div>
                  <Image src={imageUrl} alt={`review ${index + 1}`} width={72} height={72} className='w-full h-full object-cover' />
                </div>
              ))}
            </div>
          </div>
          <div className='flex items-center gap-3 pt-6'>
            <span className='w-3 h-8 rounded' style={{ backgroundColor: activeColor }}></span>
            <h2 className='text-xl font-semibold text-greyscale-900'>{t('rating')}</h2>
          </div>
          <hr className='border-greyscale-200' />
          <div className='flex flex-col lg:flex-row justify-between gap-6'>
            <div className='flex flex-col gap-4'>
              <h3 className='text-sm font-medium text-greyscale-900'>{t('productQuality')}</h3>
              {(productQualityItems.length ? productQualityItems : []).map((item) => (
                <div key={item.id} className='flex items-center gap-2'>
                  <Rating value={ratings[item.id] ?? 0} onChange={(v) => handleChangeRating(item.id, v)} maxWidth={136} />
                  <p className='text-sm font-normal text-[#4E5969]'>{item.name}</p>
                </div>
              ))}
            </div>
            <div className='flex flex-col gap-4'>
              <h3 className='text-sm font-medium text-greyscale-900'>{t('overallExperience')}</h3>
              {(overallExperienceItems.length ? overallExperienceItems : []).map((item) => (
                <div key={item.id} className='flex items-center gap-2'>
                  <Rating value={ratings[item.id] ?? 0} onChange={(v) => handleChangeRating(item.id, v)} maxWidth={136} />
                  <p className='text-sm font-normal text-[#4E5969]'>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <div className='flex justify-between gap-2'>
              <h3 className='text-sm font-semibold text-[#4E5969]'>{t('tellUsWhatYouThink')}</h3>
              <div className='flex items-center gap-2 group cursor-pointer'>
                <LightbulbIcon className='size-4 text-[#3B82F6]' />
                <p className='text-sm font-normal text-[#3B82F6] group-hover:underline'>{t('reviewTips')}</p>
              </div>
            </div>
            <textarea
              placeholder={t('placeholder')}
              className='w-full h-[160px] rounded-xl border border-black/10 bg-white p-3 placeholder:text-greyscale-400 placeholder:text-base placeholder:font-normal focus:outline-pink-500'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className='flex justify-center xl:justify-start pb-6 xl:pb-0'>
            <Button onClick={handleSubmit} disabled={isPending}>{t('submitReview')}</Button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default SubmitReview
