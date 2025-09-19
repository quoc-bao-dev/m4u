'use client'

import { useTranslations } from 'next-intl'
import { useMobileFilterStore } from '../../stores/useMobileFilterStore'
import BottomSheet from './BottomSheet'
import FilterChip from './FilterChip'

interface FilterOption {
  id: string
  label: string
  hasDropdown?: boolean
  onClick?: () => void
  isActive?: boolean
}

const FilterMobile = () => {
  const {
    isSkinTypeOpen,
    selectedSkinTypes,
    openSkinTypePopup,
    closeSkinTypePopup,
    toggleSkinType,
  } = useMobileFilterStore()

  const t = useTranslations('filter')

  const skinTypes = [
    { id: 'da-kho', label: t('drySkin'), count: 6 },
    { id: 'da-dau', label: t('oilySkin'), count: 9 },
    { id: 'da-nhay-cam', label: t('sensitiveSkin'), count: 13 },
    { id: 'da-hon-hop', label: t('combinationSkin'), count: 8 },
    { id: 'da-thuong', label: t('normalSkin'), count: 8 },
    { id: 'da-mun', label: t('acneSkin'), count: 24 },
  ]

  const filterOptions: FilterOption[] = [
    {
      id: 'without',
      label: t('without'),
    },
    {
      id: 'usage',
      label: t('usage'),
    },
    {
      id: 'skin-type',
      label: t('skinType'),
      hasDropdown: true,
      isActive: isSkinTypeOpen,
    },
    {
      id: 'ingredients',
      label: t('ingredients'),
    },
    {
      id: 'rating',
      label: t('reviews'),
    },
  ]

  return (
    <>
      {/* Filter Chips */}
      <div
        className="md:mx-0 md:hidden flex gap-2 xl:px-4 py-3 overflow-x-auto scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filterOptions.map((option, idx) => (
          <FilterChip
            key={option.id}
            label={option.label}
            onClick={openSkinTypePopup}
            hasDropdown={true}
          />
        ))}
      </div>

      {/* Skin Type Bottom Sheet */}
      <BottomSheet
        open={isSkinTypeOpen}
        onClose={closeSkinTypePopup}
        title={t('skinType')}
      >
        <div className="space-y-4">
          {skinTypes.map((skinType) => {
            const isSelected = selectedSkinTypes.has(skinType.id)
            return (
              <label
                key={skinType.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isSelected}
                  onChange={() => toggleSkinType(skinType.id)}
                />
                <div
                  className={`w-5 h-5 rounded border-2 grid place-items-center transition-all duration-200 ${
                    isSelected
                      ? 'bg-pink-600 border-pink-600'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                  }`}
                >
                  <svg
                    viewBox="0 0 12 10"
                    className={`w-3 h-3 transition-opacity duration-200 ${
                      isSelected ? 'opacity-100' : 'opacity-0'
                    }`}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5L4 8L11 1"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <span className="text-base font-medium text-gray-900 dark:text-white">
                    {skinType.label}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    ({skinType.count})
                  </span>
                </div>
              </label>
            )
          })}
        </div>
      </BottomSheet>
    </>
  )
}

export default FilterMobile
