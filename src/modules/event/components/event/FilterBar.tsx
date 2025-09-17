'use client'

import { Select } from '@/core/components'
import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'

const TABS = ['All', 'Event', 'Challenge'] as const
type TabKey = (typeof TABS)[number]

const FILTERS = ['All', 'Upcoming', 'Ongoing', 'Ended'] as const
type FilterKey = (typeof FILTERS)[number]
const FILTER_OPTIONS = FILTERS.map((f) => ({ label: f, value: f }))

const FilterBar = () => {
  const t = useTranslations('event.filter')
  const [activeTab, setActiveTab] = useState<TabKey>('All')
  const [search, setSearch] = useState('')
  const [filterBy, setFilterBy] = useState<FilterKey>('All')

  const placeholder = useMemo(() => t('searchPlaceholder'), [t])

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-300 pb-0.5">
      {/* Top row on mobile: Tabs + Filter; On md+: only Tabs */}
      <div className="flex items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-6 relative pt-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={
                'relative pb-3 text-[18px] transition-colors ' +
                (activeTab === tab
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-400 hover:text-gray-600')
              }
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'All'
                ? t('tabs.all')
                : tab === 'Event'
                ? t('tabs.event')
                : t('tabs.challenge')}
              {activeTab === tab && (
                <span className="absolute -bottom-[2px] left-0 right-0 h-[3px] rounded-t-full bg-pink-600" />
              )}
            </button>
          ))}
        </div>

        {/* Filter (mobile). Hidden on md+ because it's rendered alongside search there */}
        <div className="flex gap-4 items-center md:hidden">
          <p className="text-gray-800 truncate hidden md:block">
            {t('filterBy')}
          </p>
          <Select
            options={FILTER_OPTIONS.map((o) => ({
              ...o,
              label:
                o.label === 'All'
                  ? t('filters.all')
                  : o.label === 'Upcoming'
                  ? t('filters.upcoming')
                  : o.label === 'Ongoing'
                  ? t('filters.ongoing')
                  : t('filters.ended'),
            }))}
            value={filterBy}
            onChange={(v) => setFilterBy((v as FilterKey) ?? 'All')}
            buttonClassName="min-w-[130px]"
          />
        </div>
      </div>

      {/* Right group on md+: Search + Filter; hidden on mobile */}
      <div className="hidden md:flex items-center gap-4">
        {/* search */}
        <div className="relative w-full max-w-[420px]">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className="pl-10 border-0 outline-none"
          />
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5 text-gray-700"
            >
              <path d="M10 2a8 8 0 105.293 14.293l3.707 3.707a1 1 0 001.414-1.414l-3.707-3.707A8 8 0 0010 2zm-6 8a6 6 0 1110.392 4.242A6 6 0 014 10z" />
            </svg>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <p className="text-gray-800 truncate">{t('filterBy')}</p>
          <Select
            options={FILTER_OPTIONS.map((o) => ({
              ...o,
              label:
                o.label === 'All'
                  ? t('filters.all')
                  : o.label === 'Upcoming'
                  ? t('filters.upcoming')
                  : o.label === 'Ongoing'
                  ? t('filters.ongoing')
                  : t('filters.ended'),
            }))}
            value={filterBy}
            onChange={(v) => setFilterBy((v as FilterKey) ?? 'All')}
            buttonClassName="min-w-[130px]"
          />
        </div>
      </div>

      {/* Mobile full-width search below */}
      <div className="md:hidden relative w-full">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="pl-10 border-0 outline-none w-full"
        />
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 text-gray-700"
          >
            <path d="M10 2a8 8 0 105.293 14.293l3.707 3.707a1 1 0 001.414-1.414l-3.707-3.707A8 8 0 0010 2zm-6 8a6 6 0 1110.392 4.242A6 6 0 014 10z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
