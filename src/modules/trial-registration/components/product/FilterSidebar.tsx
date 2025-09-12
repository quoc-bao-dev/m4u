'use client'

import React, { useMemo, useState } from 'react'

type FilterOption = {
  id: string
  label: string
  count?: number
}

type FilterGroup = {
  id: string
  title: string
  options: FilterOption[]
}

const groupsSeed: FilterGroup[] = [
  {
    id: 'without',
    title: 'Không chứa',
    options: [
      { id: 'huong-lieu', label: 'Hương liệu nhân tạo', count: 6 },
      { id: 'con', label: 'Cồn', count: 9 },
      { id: 'sulphates', label: 'Sulphates', count: 8 },
      { id: 'goc-dong-vat', label: 'Gốc động vật', count: 8 },
      { id: 'silicone', label: 'Silicone', count: 24 },
    ],
  },
  {
    id: 'usage',
    title: 'Công dụng',
    options: [
      { id: 'duong-am-sau', label: 'Dưỡng ẩm sâu', count: 6 },
      { id: 'kiem-dau', label: 'Kiểm dầu & cân bằng', count: 9 },
      { id: 'tri-mun', label: 'Trị mụn & làm dịu da', count: 8 },
      { id: 'chong-lao-hoa', label: 'Chống lão hóa & phục hồi', count: 6 },
      { id: 'duong-trang', label: 'Dưỡng trắng & làm sáng da', count: 13 },
    ],
  },
  {
    id: 'skin',
    title: 'Loại da',
    options: [
      { id: 'da-kho', label: 'Da khô', count: 6 },
      { id: 'da-dau', label: 'Da dầu', count: 9 },
      { id: 'da-nhay-cam', label: 'Da nhạy cảm', count: 13 },
      { id: 'da-hon-hop', label: 'Da hỗn hợp', count: 8 },
      { id: 'da-thuong', label: 'Da thường', count: 8 },
      { id: 'da-mun', label: 'Da mụn', count: 24 },
    ],
  },
  {
    id: 'ingredients',
    title: 'Thành phần chính',
    options: [
      { id: 'nha-dam', label: 'Nha đam', count: 6 },
      { id: 'collagen', label: 'Collagen', count: 9 },
      { id: 'ha', label: 'Hyaluronic Acid', count: 8 },
      { id: 'tram-tra', label: 'Tràm trà', count: 6 },
      { id: 'rau-ma', label: 'Rau má', count: 24 },
    ],
  },
  {
    id: 'rating',
    title: 'Đánh giá',
    options: [
      { id: '5', label: '5.0', count: 6 },
      { id: '4', label: '4.0', count: 9 },
      { id: '3', label: '3.0', count: 8 },
      { id: '2', label: '2.0', count: 6 },
      { id: '1', label: '1.0', count: 24 },
    ],
  },
]

const Section = ({
  group,
  values,
  onToggle,
}: {
  group: FilterGroup
  values: Set<string>
  onToggle: (id: string) => void
}) => {
  const [open, setOpen] = useState(true)

  return (
    <div className="border-b last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4"
      >
        <span className="font-semibold text-gray-900">{group.title}</span>
        <span className="text-gray-400">
          <ArrowIcon
            className={`transition-transform duration-200 size-[16px] ${
              open ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </span>
      </button>
      {open && (
        <div className="pb-4 space-y-3">
          {group.options.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-3 text-sm cursor-pointer select-none"
            >
              <input
                type="checkbox"
                className="sr-only peer"
                checked={values.has(opt.id)}
                onChange={() => onToggle(opt.id)}
              />
              <span className="w-4 h-4 rounded border border-gray-300 bg-white grid place-items-center transition-colors peer-checked:bg-pink-600 peer-checked:border-pink-600 peer-checked:[&>svg]:opacity-100">
                <svg
                  viewBox="0 0 12 10"
                  className="w-3 h-3 opacity-0 transition-opacity"
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
              </span>
              <span className="flex-1 text-gray-700">{opt.label}</span>
              {typeof opt.count === 'number' && (
                <span className="text-gray-400">({opt.count})</span>
              )}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

const FilterSidebar = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const groups = useMemo(() => groupsSeed, [])

  const handleToggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <aside className="md:w-[240px] lg:w-[280px] shrink-0">
      <div className="rounded-2xl bg-white shadow-lg p-4">
        <div className="flex items-center gap-2 pb-2 mb-2 border-b">
          <FilterIcon />{' '}
          <span className="font-bold text-xl text-gray-900">Bộ lọc</span>
        </div>
        <div className="divide-y">
          {groups.map((g) => (
            <Section
              key={g.id}
              group={g}
              values={selected}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}

const FilterIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.75 13.5566C16.4022 13.5566 17.0356 13.774 17.5508 14.1738C18.066 14.5738 18.4339 15.1338 18.5957 15.7656L18.6074 15.8125H20.25C20.4323 15.8125 20.6074 15.8847 20.7363 16.0137C20.8653 16.1426 20.9375 16.3177 20.9375 16.5C20.9375 16.6823 20.8653 16.8574 20.7363 16.9863C20.6074 17.1153 20.4323 17.1875 20.25 17.1875H18.6074L18.5957 17.2344C18.4339 17.8662 18.066 18.4262 17.5508 18.8262C17.0356 19.226 16.4022 19.4434 15.75 19.4434C15.0978 19.4434 14.4644 19.226 13.9492 18.8262C13.434 18.4262 13.0661 17.8662 12.9043 17.2344L12.8926 17.1875H3.75C3.56766 17.1875 3.3926 17.1153 3.26367 16.9863C3.13475 16.8574 3.0625 16.6823 3.0625 16.5C3.06251 16.3177 3.13475 16.1426 3.26367 16.0137C3.3926 15.8847 3.56767 15.8125 3.75 15.8125H12.8926L12.9043 15.7656C13.0661 15.1338 13.434 14.5738 13.9492 14.1738C14.4644 13.774 15.0978 13.5566 15.75 13.5566ZM16.3477 15.0566C16.0622 14.9385 15.7483 14.9075 15.4453 14.9678C15.1422 15.0281 14.864 15.177 14.6455 15.3955C14.427 15.614 14.2781 15.8922 14.2178 16.1953C14.1575 16.4983 14.1885 16.8122 14.3066 17.0977C14.4249 17.3831 14.625 17.6271 14.8818 17.7988C15.1388 17.9705 15.441 18.0625 15.75 18.0625C16.1644 18.0625 16.5615 17.8975 16.8545 17.6045C17.1475 17.3115 17.3125 16.9144 17.3125 16.5C17.3125 16.191 17.2205 15.8888 17.0488 15.6318C16.8771 15.375 16.6331 15.1749 16.3477 15.0566ZM9.75 4.55664C10.4022 4.55664 11.0356 4.77397 11.5508 5.17383C12.066 5.57377 12.4339 6.13376 12.5957 6.76562L12.6074 6.8125H20.25C20.4323 6.8125 20.6074 6.88475 20.7363 7.01367C20.8653 7.1426 20.9375 7.31767 20.9375 7.5C20.9375 7.68233 20.8653 7.8574 20.7363 7.98633C20.6074 8.11526 20.4323 8.1875 20.25 8.1875H12.6074L12.5957 8.23438C12.4339 8.86624 12.066 9.42623 11.5508 9.82617C11.0356 10.226 10.4022 10.4434 9.75 10.4434C9.09782 10.4434 8.46443 10.226 7.94922 9.82617C7.43397 9.42623 7.06608 8.86624 6.9043 8.23438L6.89258 8.1875H3.75C3.56766 8.1875 3.3926 8.11526 3.26367 7.98633C3.13475 7.8574 3.0625 7.68233 3.0625 7.5C3.06251 7.31767 3.13475 7.1426 3.26367 7.01367C3.3926 6.88475 3.56767 6.8125 3.75 6.8125H6.89258L6.9043 6.76562C7.06608 6.13376 7.43397 5.57377 7.94922 5.17383C8.46443 4.77397 9.09783 4.55664 9.75 4.55664ZM9.75 5.9375C9.3356 5.9375 8.93853 6.10249 8.64551 6.39551C8.35249 6.68853 8.18751 7.08561 8.1875 7.5C8.1875 7.80903 8.27948 8.11121 8.45117 8.36816C8.62285 8.62502 8.86691 8.82513 9.15234 8.94336C9.43778 9.06155 9.75168 9.09248 10.0547 9.03223C10.3578 8.97194 10.636 8.82301 10.8545 8.60449C11.073 8.38597 11.2219 8.10778 11.2822 7.80469C11.3425 7.50168 11.3116 7.18778 11.1934 6.90234C11.0751 6.61691 10.875 6.37285 10.6182 6.20117C10.3612 6.02948 10.059 5.9375 9.75 5.9375Z"
        fill="#111827"
        stroke="#111827"
        stroke-width="0.125"
      />
    </svg>
  )
}

const ArrowIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9996 6.81201C12.0899 6.81201 12.1798 6.83015 12.2632 6.86475C12.3467 6.89934 12.4231 6.94929 12.4869 7.01318L19.9869 14.5132V14.5142C20.0506 14.5779 20.1008 14.6536 20.1353 14.7368C20.1699 14.8203 20.188 14.9101 20.188 15.0005C20.188 15.0907 20.1699 15.1799 20.1353 15.2632C20.1007 15.3466 20.0508 15.423 19.9869 15.4868C19.923 15.5507 19.8467 15.6016 19.7632 15.6362C19.6798 15.6708 19.5899 15.688 19.4996 15.688C19.4095 15.6879 19.3201 15.6707 19.2369 15.6362C19.1534 15.6016 19.0771 15.5507 19.0132 15.4868L12.0445 8.51611L11.9996 8.47217L11.9556 8.51611L4.98688 15.4868C4.85787 15.6158 4.68202 15.688 4.49957 15.688C4.31728 15.6879 4.14216 15.6157 4.01324 15.4868C3.88434 15.3579 3.81217 15.1828 3.81207 15.0005C3.81207 14.818 3.88424 14.6422 4.01324 14.5132L11.5132 7.01318C11.5771 6.94929 11.6534 6.89933 11.7369 6.86475C11.8202 6.83021 11.9094 6.81207 11.9996 6.81201Z"
        fill="#4B5563"
        stroke="#4B5563"
        stroke-width="0.125"
      />
    </svg>
  )
}

export default FilterSidebar
