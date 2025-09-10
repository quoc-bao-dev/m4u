'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IMAGES } from '@/core/constants/IMAGES'
import { StarIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import React from 'react'

const filterOptions = {
  sortBy: [
    { value: 'latest', label: 'Mới nhất' },
    { value: 'oldest', label: 'Cũ nhất' },
    { value: 'most-viewed', label: 'Xem nhiều nhất' },
    { value: 'highest-rated', label: 'Đánh giá cao nhất' },
    { value: 'most-liked', label: 'Thích nhiều nhất' },
  ],
  mostViewed: [
    { value: 'all', label: 'Tất cả' },
    { value: 'today', label: 'Hôm nay' },
    { value: 'week', label: 'Tuần này' },
    { value: 'month', label: 'Tháng này' },
    { value: 'year', label: 'Năm nay' },
    { value: 'all-time', label: 'Mọi thời gian' },
  ],
}
const KOLs = () => {
  return (
    <div className="flex flex-col gap-12 w-full">
      <div className="flex justify-end items-center gap-4 w-full">
        <h3 className="text-lg font-normal text-greyscale-600">Filter by:</h3>
        <Select defaultValue="latest">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.sortBy.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Most viewed" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.mostViewed.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="shadow-[0px_4px_24px_0px_#0000000F] rounded-3xl">
          <div className="overflow-hidden rounded-3xl">
            <Image
              src={IMAGES.kol3}
              alt="kol"
              width={1000}
              height={1000}
              className="w-full object-cover aspect-[410/342]"
            />

            <div className="2xl:p-5 p-4 bg-orange-100 flex gap-3 items-center justify-between">
              <Image
                src={IMAGES.kol1}
                alt="heart"
                width={1000}
                height={1000}
                className="size-12 rounded-full"
              />
              <div className="flex flex-col flex-1">
                <h3 className="2xl:text-lg text-base font-bold text-greyscale-900">
                  Đào Bùi
                </h3>
                <p className="2xl:text-sm text-xs font-normal text-greyscale-900">
                  88 views
                </p>
              </div>
              <div className="p-2 h-fit flex items-center gap-2 bg-white rounded-full">
                <StarIcon
                  weight="fill"
                  className="size-3 xl:size-5 text-yellow-600"
                />
                <span className=" text-xs xl:text-base 2xl:text-lg font-medium text-greyscale-900">
                  4.9
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KOLs
