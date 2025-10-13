'use client'

import { useTranslations } from 'next-intl'
import { useState, useMemo } from 'react'
import { useProductFilterGroups } from '@/services/product'
import { useProductFilterStore } from '../../stores/useProductFilterStore'
import BottomSheet from './BottomSheet'
import FilterChip from './FilterChip'

const FilterMobile = () => {
  const t = useTranslations('filter')
  const { groups: groupsRaw, isLoading } = useProductFilterGroups()
  const groups = useMemo(() => groupsRaw, [groupsRaw])

  const selectedIdsSet = useProductFilterStore((s) => s.selectedIds)
  const toggle = useProductFilterStore((s) => s.toggle)

  const [open, setOpen] = useState(false)
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null)

  const activeGroup = useMemo(() => {
    if (!activeGroupId) return null
    return groups.find((g) => g.id === activeGroupId) || null
  }, [activeGroupId, groups])

  return (
    <>
      {/* Filter Chips */}
      <div
        className="md:mx-0 md:hidden flex gap-2 xl:px-4 py-3 overflow-x-auto scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 w-24 bg-gray-200 rounded-full" />
            ))
          : groups.map((g) => (
              <FilterChip
                key={g.id}
                label={g.title}
                onClick={() => {
                  setActiveGroupId(g.id)
                  setOpen(true)
                }}
                hasDropdown={true}
              />
            ))}
      </div>

      {/* Bottom Sheet for selected group */}
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title={activeGroup?.title || t('title')}
      >
        <div className="space-y-4">
          {isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 w-48 bg-gray-200 rounded" />
              ))}
            </div>
          )}

          {!isLoading &&
            activeGroup &&
            activeGroup.options.map((opt) => {
              const isSelected = selectedIdsSet.has(opt.id)
              return (
                <label
                  key={opt.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isSelected}
                    onChange={() => toggle(opt.id)}
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
                      {opt.label}
                    </span>
                    {typeof opt.count === 'number' && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                        ({opt.count})
                      </span>
                    )}
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
