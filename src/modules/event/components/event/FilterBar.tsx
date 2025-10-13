'use client'

import { Select } from '@/core/components'
import { useMemo, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useGetInfoDataArticles } from '@/services/info'
import { useFilterStore } from '../../stores/filterStore'

const FilterBar = () => {
  const t = useTranslations('event.filter')
  const { data: infoDataArticles } = useGetInfoDataArticles()
  const { activeTab, search, filterBy, setActiveTab, setSearch, setFilterBy } =
    useFilterStore()

  // Local state for debounced search input
  const [localSearch, setLocalSearch] = useState(search)

  // Keep local input in sync if external store search changes
  useEffect(() => {
    setLocalSearch(search)
  }, [search])

  // Debounce updating the global store to limit API calls
  useEffect(() => {
    const id = setTimeout(() => {
      setSearch(localSearch)
    }, 300)
    return () => clearTimeout(id)
  }, [localSearch, setSearch])

  const placeholder = useMemo(() => t('searchPlaceholder'), [t])

  // Create tabs from API data
  const tabs = useMemo(() => {
    if (!infoDataArticles?.type_event_articles) return []
    return infoDataArticles.type_event_articles.map((item) => ({
      id: item.id,
      name: item.name,
      count: item.count,
      color: item.color,
    }))
  }, [infoDataArticles?.type_event_articles])

  // Create filter options from API data
  const filterOptions = useMemo(() => {
    if (!infoDataArticles?.list_status) return []
    return infoDataArticles.list_status.map((item) => ({
      id: item.id,
      name: item.name + ' (' + item.count + ')',
      color: item.color,
    }))
  }, [infoDataArticles?.list_status])

  // Default select first filter option when available
  useEffect(() => {
    if (filterOptions.length === 0) return
    const firstId = filterOptions[0].id
    if (filterBy !== firstId) {
      setFilterBy(firstId)
    }
  }, [filterOptions])

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-300 ">
      {/* Top row on mobile: Tabs + Filter; On md+: only Tabs */}
      <div className="flex items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-6 relative pt-4 overflow-x-auto overflow-y-hidden custom-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={
                'relative pb-5 text-[18px] transition-colors  flex gap-2 items-center justify-center' +
                (activeTab === tab.id
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-400 hover:text-gray-600')
              }
              onClick={() => setActiveTab(tab.id)}
            >
              <p className="truncate"> {tab.name}</p>

              <div
                className="ml-2 py-0.5 px-2 rounded-md text-sm font-medium"
                style={{ backgroundColor: tab.color + '1A', color: tab.color }}
              >
                {tab.count}
              </div>
              {activeTab === tab.id && (
                <span className="absolute -bottom-[0px] left-0 right-0 h-[6px] rounded-t bg-pink-600" />
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
            options={filterOptions.map((option) => ({
              label: option.name,
              value: option.id.toString(),
            }))}
            value={filterBy.toString()}
            onChange={(v) => setFilterBy(parseInt(v as string) || 0)}
            buttonClassName="min-w-[130px]"
            className=""
          />
        </div>
      </div>

      {/* Right group on md+: Search + Filter; hidden on mobile */}
      <div className="hidden md:flex items-center gap-4">
        {/* search */}
        <div className="relative w-full max-w-[420px]">
          <input
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
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
            options={filterOptions.map((option) => ({
              label: option.name,
              value: option.id.toString(),
            }))}
            value={filterBy.toString()}
            onChange={(v) => setFilterBy(parseInt(v as string) || 0)}
            buttonClassName="min-w-[180px]"
          />
        </div>
      </div>

      {/* Mobile full-width search below */}
      <div className="md:hidden relative w-full">
        <input
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
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
