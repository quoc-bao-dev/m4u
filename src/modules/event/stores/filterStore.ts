import { create } from 'zustand'

interface FilterState {
  activeTab: number
  search: string
  filterBy: number
  setActiveTab: (tab: number) => void
  setSearch: (search: string) => void
  setFilterBy: (filter: number) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  activeTab: 0,
  search: '',
  filterBy: 0,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearch: (search) => set({ search }),
  setFilterBy: (filter) => set({ filterBy: filter }),
  resetFilters: () => set({ activeTab: 0, search: '', filterBy: 0 }),
}))
