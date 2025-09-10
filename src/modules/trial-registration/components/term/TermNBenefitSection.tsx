'use client'

import { Container } from '@/core/components'
import { cn } from '@/core/utils'
import React, { useState, PropsWithChildren } from 'react'
import AccordionItem from './AccordionItem'

const TermNBenefitSection = () => {
  return (
    <section className=" pb-[60px] md:py-[96px]">
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

export default TermNBenefitSection
