'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import TopReviewerCard from './components/TopReviewerCard'

interface RankingListProps {
  products?: any
  isLoading?: boolean
}

const RankingList = ({ products, isLoading }: RankingListProps) => {
  const t = useTranslations('reviewHub')

  if (!isLoading && products.length === 0) return null

  const filterOptions = {
    freeFrom: [
      { value: 'all', label: t('filters.freeFrom') },
      { value: 'parabens', label: t('filters.parabens') },
      { value: 'sulfates', label: t('filters.sulfates') },
      { value: 'phthalates', label: t('filters.phthalates') },
      { value: 'fragrance', label: t('filters.fragrance') },
      { value: 'alcohol', label: t('filters.alcohol') },
    ],
    benefits: [
      { value: 'all', label: t('filters.benefits') },
      { value: 'hydrating', label: t('filters.hydrating') },
      { value: 'anti-aging', label: t('filters.antiAging') },
      { value: 'brightening', label: t('filters.brightening') },
      { value: 'acne-fighting', label: t('filters.acneFighting') },
      { value: 'soothing', label: t('filters.soothing') },
    ],
    skinType: [
      { value: 'all', label: t('filters.skinType') },
      { value: 'oily', label: t('filters.oily') },
      { value: 'dry', label: t('filters.dry') },
      { value: 'combination', label: t('filters.combination') },
      { value: 'sensitive', label: t('filters.sensitive') },
      { value: 'normal', label: t('filters.normal') },
    ],
    keyIngredients: [
      { value: 'all', label: t('filters.keyIngredients') },
      { value: 'retinol', label: t('filters.retinol') },
      { value: 'vitamin-c', label: t('filters.vitaminC') },
      { value: 'hyaluronic-acid', label: t('filters.hyaluronicAcid') },
      { value: 'niacinamide', label: t('filters.niacinamide') },
      { value: 'salicylic-acid', label: t('filters.salicylicAcid') },
    ],
    rating: [
      { value: 'all', label: t('filters.rating') },
      { value: '5', label: t('filters.fiveStars') },
      { value: '4', label: t('filters.fourStarsUp') },
      { value: '3', label: t('filters.threeStarsUp') },
      { value: '2', label: t('filters.twoStarsUp') },
    ],
  }

  return (
    <div className="w-full flex flex-col gap-3 lg:gap-12">
      {/* Filter Section */}
      <div className="w-full flex flex-col xl:flex-row justify-between items-center gap-3">
        <div className="flex gap-3 2xl:gap-4 overflow-x-scroll scroll-hidden w-full p-1">
          {/* Free From Filter */}
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] bg-white">
              <SelectValue placeholder={t('filters.freeFrom')} />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.freeFrom.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Benefits Filter */}
          <Select defaultValue="all">
            <SelectTrigger className="w-[120px] bg-white">
              <SelectValue placeholder={t('filters.benefits')} />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.benefits.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Skin Type Filter */}
          <Select defaultValue="all">
            <SelectTrigger className="w-[120px] bg-white">
              <SelectValue placeholder={t('filters.skinType')} />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.skinType.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Key Ingredients Filter */}
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px] bg-white">
              <SelectValue placeholder={t('filters.keyIngredients')} />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.keyIngredients.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Rating Filter */}
          <Select defaultValue="all">
            <SelectTrigger className="w-[100px] bg-white">
              <SelectValue placeholder={t('filters.rating')} />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.rating.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <form className="w-full xl:w-[500px]">
          <div className="relative">
            <span className="absolute -translate-y-1/2 left-2 top-1/2 pointer-events-none">
              <MagnifyingGlassIcon className="size-6" />
            </span>
            <input
              //   value={inputValue}
              //   onChange={handleChange}
              type="text"
              placeholder={t('searchPlaceholder')}
              className="h-11 w-full border-b border-greyscale-200 py-2.5 pl-10 pr-4 text-responsive-sm text-gray-800 placeholder:text-gray-400 focus:border-greyscale-600 focus:outline-hidden "
            />
          </div>
        </form>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 xl:gap-x-10 2xl:gap-x-16 gap-y-4 xl:gap-y-8 2xl:gap-y-12">
        {isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="size-full h-[250px] rounded-3xl" />
            ))}
          </>
        ) : (
          products.map((product: any, idx: number) => (
            <TopReviewerCard
              key={product.id}
              data={product}
              // kols={kols}
              topReview={idx + 2}
              isRightColumn={idx % 2 === 1}
            />
          ))
        )}

      </div>
    </div>
  )
}

export default RankingList
