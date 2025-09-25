import { create } from 'zustand'

export interface NotificationFilterState {
  activeTab: string
  setActiveTab: (tab: string) => void

  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  setDateRange: (from: Date | undefined, to: Date | undefined) => void

  resetFilters: () => void
}

export const useNotificationFilter = create<NotificationFilterState>((set) => ({
  activeTab: '',
  setActiveTab: (tab: string) => set({ activeTab: tab }),

  dateRange: { from: undefined, to: undefined },
  setDateRange: (from: Date | undefined, to: Date | undefined) =>
    set({ dateRange: { from, to } }),

  resetFilters: () =>
    set({
      activeTab: '',
      dateRange: { from: undefined, to: undefined },
    }),
}))
