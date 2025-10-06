'use client'

import { Tabs } from '@/core/components'

type DetailTabsProps = {
  tabs: string[]
  defaultActive?: string
  onChange?: (active: string) => void
  className?: string
}

const DetailTabs = ({
  tabs,
  defaultActive,
  onChange,
  className,
}: DetailTabsProps) => {
  const items = tabs.map((tab) => ({ key: tab, label: tab }))

  return (
    <Tabs
      className={className}
      items={items}
      activeKey={defaultActive ?? tabs[0]}
      onChange={(key) => onChange?.(key)}
    />
  )
}

export default DetailTabs
