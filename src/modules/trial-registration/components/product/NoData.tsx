import Image from 'next/image'

interface NoDataProps {
  title?: string
  description?: string
  className?: string
}

const NoData = ({
  title = 'No products found.',
  description = 'Try adjusting your filters, or clear them to see all of our products.',
  className = '',
}: NoDataProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full md:h-[600px]  ${className}`}
    >
      <div className="relative mb-6">
        <img
          src="/image/product/image-nodata.png"
          alt="No data found"
          className="object-contain size-[200px]"
        />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
        <p className="text-sm text-gray-500 max-w-md">{description}</p>
      </div>
    </div>
  )
}

export default NoData
