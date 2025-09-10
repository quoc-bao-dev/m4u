import { Modal } from '@/core/components/common/modal'
import { IMAGES } from '@/core/constants/IMAGES'
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
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-5xl flex gap-10 p-10"
    >
      <div className="flex gap-4">
        <div className='flex flex-col gap-3'>
          <Image
            src={IMAGES.topProduct}
            alt="top-product"
            width={1000}
            height={1000}
            className="size-[120px] object-cover rounded-2xl"
          />
          <Image
            src={IMAGES.topProduct}
            alt="top-product"
            width={1000}
            height={1000}
            className="size-[120px] object-cover rounded-2xl"
          />
          <Image
            src={IMAGES.topProduct}
            alt="top-product"
            width={1000}
            height={1000}
            className="size-[120px] object-cover rounded-2xl"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4"></div>
    </Modal>
  )
}

export default InfoKolModal
