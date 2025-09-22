import Button from '@/core/components/ui/button'
import { IMAGES } from '@/core/constants/IMAGES'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const NodataReviewhub = () => {
  const t = useTranslations('nodataReviewhub')

  return (
    <div className='flex flex-col items-center justify-center gap-1 w-1/2'>
      <Image src={IMAGES.nodataReviewhub} alt='nodataReviewhub' width={1000} height={1000} className='w-1/2 h-full object-cover' />
      <div className='flex flex-col gap-4 items-center justify-center pb-12'>
        <h3 className='text-gradient-blue-black text-5xl leading-[110%] font-semibold text-center'>{t('title')}</h3>
        <p className='text-2xl text-greyscale-600 text-center'>{t('description')}</p>
      </div>
      <Button>{t('registerButton')}</Button>
    </div>
  )
}

export default NodataReviewhub
