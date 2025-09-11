import { Modal } from '@/core/components/common/modal'
import Rating from '@/core/components/common/Rating'
import { IMAGES } from '@/core/constants/IMAGES'
import { useDevice } from '@/core/hooks'
import { QuoteIcon } from '@/icons'
import {
  CalendarBlankIcon,
  CaretRightIcon,
  ChartBarIcon,
} from '@phosphor-icons/react'
import Image from 'next/image'
import React from 'react'

export type KolInfo = {
  image: string | any
  avatar: string | any
  name: string
  rating: number | string
  reviews: number | string
} | null

type InfoKolModalProps = {
  isOpen: boolean
  onClose: () => void
  kol: KolInfo
}

const InfoKolModal: React.FC<InfoKolModalProps> = ({
  isOpen,
  onClose,
  kol,
}) => {
  const { isDesktop } = useDevice()

  return (
    <Modal
      position={isDesktop ? 'center' : 'bottom'}
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-5xl bg-white p-3 max-h-[80vh] overflow-y-auto scroll-hidden xl:max-h-none xl:p-10"
    >
      <div className="flex flex-col-reverse lg:grid grid-cols-9 gap-4 lg:gap-10 h-full">
        <div className="col-span-5 flex gap-3 lg:gap-4">
          <div className="flex flex-col gap-3 flex-shrink-0">
            <Image
              src={IMAGES.topProduct}
              alt="top-product"
              width={1000}
              height={1000}
              className="size-[64px] lg:size-[120px] object-cover rounded-lg lg:rounded-2xl"
            />
            <Image
              src={IMAGES.topProduct}
              alt="top-product"
              width={1000}
              height={1000}
              className="size-[64px] lg:size-[120px] object-cover rounded-lg lg:rounded-2xl"
            />
            <Image
              src={IMAGES.topProduct}
              alt="top-product"
              width={1000}
              height={1000}
              className="size-[64px] lg:size-[120px] object-cover rounded-lg lg:rounded-2xl"
            />
          </div>
          <div className="relative flex-1">
            <div className="absolute top-3 left-3 size-9 rounded-full bg-black/50 flex items-center justify-center">
              <CaretRightIcon weight="fill" className="size-5 text-white" />
            </div>
            <Image
              src={IMAGES.kol3}
              alt="top-product"
              width={1000}
              height={1000}
              className="w-full object-cover rounded-2xl xl:rounded-3xl aspect-[375/666]"
            />
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-3 xl:gap-4">
          <div className="flex gap-3 items-center">
            <Image
              src={IMAGES.kol3}
              alt="top-product"
              width={1000}
              height={1000}
              className="size-9 lg:size-12 object-cover rounded-full"
            />
            <div className="flex flex-col">
              <h3 className="text-sm lg:text-lg font-bold text-greyscale-900">
                Phượng Võ
              </h3>
              <p className="text-xs lg:text-sm text-greyscale-900">
                169 reviews
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-between">
            <div className="flex gap-2 items-center">
              <CalendarBlankIcon
                weight="fill"
                className="size-5 text-greyscale-400"
              />
              <p className="text-sm font-medium text-greyscale-400">
                06/09/2025
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <ChartBarIcon
                weight="fill"
                className="size-5 text-greyscale-400"
              />
              <p className="text-sm font-medium text-greyscale-400">69 views</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-pink-100 p-2 rounded-lg flex gap-3 items-center">
              <div className="w-[91px] lg:w-[106px] aspect-[106/112] rounded-lg bg-white flex justify-center items-center">
                <Image
                  src={IMAGES.deal1}
                  alt="deal"
                  width={1000}
                  height={1000}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-[10px] font-bold text-greyscale-900">
                  MANYO
                </h3>
                <p className="text-sm font-normal text-greyscale-900">
                  Panthetoin Deep Moisture Mask
                </p>
              </div>
            </div>
            <div className="flex gap-8 items-end justify-center xl:justify-start">
              <div className="flex flex-col items-center">
                <p className="text-xl font-bold text-greyscale-400">
                  <span className="text-pink-600 text-[32px] lg:text-[40px]">
                    4.8
                  </span>
                  /5
                </p>
                <p className="text-sm lg:text-base font-bold text-pink-600">
                  Excellent
                </p>
              </div>
              <div className="flex flex-col gap-1 lg:gap-2">
                <div className="flex gap-3 items-center">
                  <Rating
                    value={Number(4.8)}
                    readOnly
                    maxWidth={isDesktop ? 136 : 96}
                  />
                  <p className="text-xs lg:text-sm font-semibold text-[#4E5969]">
                    Absorbability
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <Rating
                    value={Number(4)}
                    readOnly
                    maxWidth={isDesktop ? 136 : 96}
                  />
                  <p className="text-xs lg:text-sm font-semibold text-[#4E5969]">
                    Moisturization
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <Rating
                    value={Number(3)}
                    readOnly
                    maxWidth={isDesktop ? 136 : 96}
                  />
                  <p className="text-xs lg:text-sm font-semibold text-[#4E5969]">
                    Skin brightening
                  </p>
                </div>
              </div>
            </div>
            <div className="relative pt-5 lg:pt-9 pl-8 lg:pl-9">
              <QuoteIcon className="size-7 lg:size-9 text-neutral-200 absolute top-0 left-0" />
              <p className="text-sm lg:text-base font-normal text-greyscale-800">
                Such a pleasant surprise! I got to try premium products for free
                and even picked up so many helpful beauty tips. Highly
                recommended!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default InfoKolModal
