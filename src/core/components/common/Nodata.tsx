'use client'

import Image from 'next/image'

interface NodataProps {
  title: string
  description?: string
  className?: string
}

const Nodata = ({ title, description = '', className = '' }: NodataProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full py-10 ${className}`}
    >
      <div className="relative mb-4">
        <Image
          src="/image/product/image-nodata.png"
          alt="no-data"
          width={200}
          height={200}
          className="object-contain w-[160px] h-[160px] md:w-[200px] md:h-[200px]"
        />
      </div>
      <div className="text-center space-y-2 px-4">
        <h3 className="text-base md:text-lg font-semibold text-gray-700">
          {title}
        </h3>
        {description ? (
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  )
}

export default Nodata
