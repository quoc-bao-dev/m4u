import { create } from 'zustand'

export interface TableFilterState {
  // Tab filter
  activeTab: string
  setActiveTab: (tab: string) => void

  // Search filter
  searchQuery: string
  setSearchQuery: (query: string) => void

  // Date range filter
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  setDateRange: (from: Date | undefined, to: Date | undefined) => void

  // Reset all filters
  resetFilters: () => void
}

export const useTableFilter = create<TableFilterState>((set) => ({
  // Tab filter
  activeTab: '',
  setActiveTab: (tab: string) => set({ activeTab: tab }),

  // Search filter
  searchQuery: '',
  setSearchQuery: (query: string) => set({ searchQuery: query }),

  // Date range filter
  dateRange: {
    from: undefined,
    to: undefined,
  },
  setDateRange: (from: Date | undefined, to: Date | undefined) =>
    set({ dateRange: { from, to } }),

  // Reset all filters
  resetFilters: () =>
    set({
      activeTab: '',
      searchQuery: '',
      dateRange: { from: undefined, to: undefined },
    }),
}))
