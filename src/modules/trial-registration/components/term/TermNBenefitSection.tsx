'use client'

import { Container } from '@/core/components'
import { cn } from '@/core/utils'
import React, { useState, PropsWithChildren } from 'react'

type AccordionItemProps = PropsWithChildren<{
  title: string
  defaultOpen?: boolean
}>

const AccordionItem = ({
  title,
  defaultOpen = false,
  children,
}: AccordionItemProps) => {
  const [open, setOpen] = useState<boolean>(defaultOpen)

  return (
    <div
      className="rounded-lg md:rounded-2xl border border-gray-1000 bg-white"
      onClick={() => setOpen((prev) => !prev)}
    >
      <button
        type="button"
        className="flex w-fit items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span
          className={
            !open ? '-rotate-90 transition-transform' : 'transition-transform'
          }
        >
          <ArrowIcon />
        </span>
        <span className="font-semibold text-gray-800  md:text-[24px]">
          {title}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-4 text-sm text-gray-600">{children}</div>
      )}
    </div>
  )
}

const TermNBenefitSection = () => {
  return (
    <section className="py-[96px]">
      <Container className="space-y-3 xl:px-[200px]">
        <h2 className="text-title-sect font-bold text-gray-400 pb-5">
          <span className="text-gray-900">Quyền lợi </span> & Điều khoản
        </h2>

        <AccordionItem title="Quyền Lợi Thành Viên Reviewer" defaultOpen>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Trải nghiệm sản phẩm miễn phí các sản phẩm làm đẹp hot nhất.
            </li>
            <li>Thu nhập hấp dẫn từ đường link giới thiệu của bạn.</li>
            <li>Được ưu tiên trải nghiệm các sản phẩm mới và giới hạn.</li>
            <li>
              Hỗ trợ và định hướng nâng cao chất lượng review từ chuyên gia.
            </li>
            <li>
              Kết nối cộng đồng để chia sẻ kinh nghiệm và học hỏi lẫn nhau.
            </li>
          </ul>
        </AccordionItem>

        <AccordionItem title="Quyền Lợi Thành Viên Reviewer">
          <p>
            Nội dung minh hoạ: Bạn có thể thay thế bằng nội dung thật khi có dữ
            liệu.
          </p>
        </AccordionItem>

        <AccordionItem title="Quyền Lợi Thành Viên Reviewer">
          <p>
            Nội dung minh hoạ: Thành viên nhận thêm quyền lợi khi tham gia các
            hoạt động.
          </p>
        </AccordionItem>
      </Container>
    </section>
  )
}

const ArrowIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn('w-4 h-4 md:w-6 md:h-6', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.50038 8.3125H19.5004C19.6362 8.31246 19.7692 8.35237 19.8822 8.42773C19.9954 8.50327 20.084 8.61161 20.1361 8.7373C20.1879 8.86268 20.2016 9.00071 20.1752 9.13379C20.1486 9.26715 20.0829 9.3902 19.9867 9.48633L12.4867 16.9863C12.4229 17.0502 12.3465 17.1011 12.2631 17.1357C12.1798 17.1702 12.0905 17.1884 12.0004 17.1885C11.91 17.1885 11.8202 17.1703 11.7367 17.1357C11.6533 17.1012 11.5779 17.0502 11.5141 16.9863H11.5131L4.01308 9.48633C3.91697 9.39022 3.85212 9.2671 3.82558 9.13379C3.79913 9.00057 3.8127 8.8628 3.86464 8.7373C3.91672 8.61161 4.00441 8.50327 4.11757 8.42773C4.2307 8.35225 4.36437 8.31239 4.50038 8.3125Z"
        fill="#4B5563"
        stroke="#4B5563"
        stroke-width="0.125"
      />
    </svg>
  )
}

export default TermNBenefitSection
