import { create } from 'zustand'

export interface TableFilterState {
  activeTab: string
  setActiveTab: (tab: string) => void

  searchQuery: string
  setSearchQuery: (query: string) => void

  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  setDateRange: (from: Date | undefined, to: Date | undefined) => void

  resetFilters: () => void
}

export const useTableFilter = create<TableFilterState>((set) => ({
  activeTab: '',
  setActiveTab: (tab: string) => set({ activeTab: tab }),

  searchQuery: '',
  setSearchQuery: (query: string) => set({ searchQuery: query }),

  dateRange: { from: undefined, to: undefined },
  setDateRange: (from: Date | undefined, to: Date | undefined) =>
    set({ dateRange: { from, to } }),

  resetFilters: () =>
    set({
      activeTab: '',
      searchQuery: '',
      dateRange: { from: undefined, to: undefined },
    }),
}))
