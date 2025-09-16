import Image from 'next/image'
import SidebarAnnouncementCountdown from './SidebarAnnouncementCountdown'

type ProductItem = {
  image: string
  name: string
}

type EventSidebarProps = {
  sponsorName?: string
  sponsorLogo?: string
  products?: ProductItem[]
  totalPrizes?: number
  totalPrizePool?: number
  time?: string // ISO string for announcement time
  title?: string // headline text under date
  onJoin?: () => void
  status?: 'active' | 'coming_soon' | 'expired'
  registrationDate?: string
  endDate?: string
}

const formatCurrency = (value: number) => value.toLocaleString('vi-VN')

const EventSidebar = ({
  sponsorName = 'M4U charity fund',
  sponsorLogo = '/image/avatar/image-02.png',
  products = [
    {
      image: '/image/home/deal1.png',
      name: 'Panthetoin Deep Moisture Mask',
    },
    {
      image: '/image/home/deal2.png',
      name: 'Panthetoin Deep Moisture Mask',
    },
  ],
  totalPrizes = 3,
  totalPrizePool = 1234567,
  time = '2025-10-01T00:00:00+07:00',
  title = 'WINNERS WILL BE ANNOUNCED',
  onJoin,
  status = 'active',
  registrationDate = '2025-09-06',
  endDate = '2025-09-09',
}: EventSidebarProps) => {
  return (
    <aside className="rounded-2xl bg-gray-100">
      <div className="p-6 flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-greyscale-900">
          Contribution Details
        </h3>

        {/* Sponsor */}
        <div>
          <p className="text-sm text-greyscale-700">Sponsor</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="size-14 rounded-full overflow-hidden bg-greyscale-100 flex items-center justify-center">
              <Image
                src={sponsorLogo}
                alt="Sponsor"
                width={56}
                height={56}
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium text-greyscale-800">
              {sponsorName}
            </span>
          </div>
        </div>

        <div className=" h-px bg-greyscale-200" />

        {/* Products */}
        <div>
          <p className="text-sm text-greyscale-700">Product</p>
          <div className="mt-3 flex flex-col gap-3">
            {products.map((p) => (
              <div key={p.image} className="flex items-center gap-3">
                <div className="relative size-14 rounded-lg overflow-hidden bg-white">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <span className="text-sm text-greyscale-800">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className=" h-px bg-greyscale-200" />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-greyscale-700">Total Prizes</p>
            <p className="mt-1 text-xl font-semibold text-[16px] lg:text-xl text-orange-500">
              {status === 'coming_soon' ? '-' : totalPrizes}
            </p>
          </div>
          <div>
            <p className="text-xs text-greyscale-700">Total Prize Pool</p>
            <p className="mt-1 text-[16px] lg:text-xl font-semibold text-orange-500">
              {status === 'coming_soon' ? (
                <>
                  - <span className="text-sm underline">đ</span>
                </>
              ) : (
                <>
                  {formatCurrency(totalPrizePool)}{' '}
                  <span className="text-sm underline">đ</span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className=" h-px bg-greyscale-200" />

        {status === 'coming_soon' ? (
          <div>
            <SidebarAnnouncementCountdown
              time={time}
              title={title}
              onJoin={onJoin}
              buttonText="COMING SOON"
              variant="green"
            />
          </div>
        ) : status === 'expired' ? (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-greyscale-700">Registration date</p>
                <p className="mt-1 text-sm text-greyscale-900">
                  {new Date(registrationDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs text-greyscale-700">End date</p>
                <p className="mt-1 text-sm text-greyscale-900">
                  {new Date(endDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <SidebarAnnouncementCountdown
              time={time}
              title={title}
              onJoin={onJoin}
              buttonText="JOIN NOW"
              variant="gray"
            />
          </div>
        ) : (
          <div>
            <SidebarAnnouncementCountdown
              time={time}
              title={title}
              onJoin={onJoin}
              buttonText="JOIN NOW"
              variant="pink"
            />
          </div>
        )}

        {/* Optional standard button removed to avoid duplication with framed button */}
      </div>
    </aside>
  )
}

export default EventSidebar
