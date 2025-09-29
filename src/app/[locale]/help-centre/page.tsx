import Image from 'next/image'

const InfoItem = ({ icon, title, description, phone, note }: any) => {
  return (
    <div className="flex items-start gap-4 p-5">
      {/* Icon 40x40 */}
      <div className="size-10 shrink-0 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {title ? (
          <p className="font-primary font-semibold text-[24px] leading-[140%] tracking-[0%] text-gray-900">
            {title}
          </p>
        ) : null}
        {description ? (
          <p className="font-primary font-normal text-[16px] leading-[100%] tracking-[0%] text-gray-600">
            {description}
          </p>
        ) : null}
        {phone ? (
          <div className="mt-2">
            <a
              href={`tel:${phone.replace(/\s|\+/g, '')}`}
              className="font-primary font-normal text-[16px] leading-[140%] align-middle"
              style={{
                background:
                  'linear-gradient(91.72deg, #0094FF 3.01%, #0047FF 99.46%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block',
              }}
            >
              {phone}
            </a>
            <div className="h-px w-full bg-[#DDE1E7] my-5" />
            {note ? (
              <p className="font-primary font-normal text-[16px] leading-[140%] text-gray-600">
                {note}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

const Page = () => {
  return (
    <div className="pt-6">
      <h1 className="text-[64px] font-semibold text-gray-900 font-primary text-center">
        Help centre
      </h1>

      <div className="flex gap-[80px] py-[36px] px-[120px]">
        {/* Left column: image collage */}
        <div className="relative flex-1 min-h-[360px]">
          {/* Maintain aspect ratio ~ 983x760 using padding-top trick */}
          <div className="relative w-full pt-[77.31%]">
            {/* Image 1: 263px, top 0 left 0 => 26.75% width; radius ≈ 12.17% */}
            <div className="absolute top-0 left-0 w-[36.75%]">
              <div className="relative w-full pt-[100%] rounded-[12.17%] border-[4px] border-white overflow-hidden shadow-sm">
                <Image
                  src="/image/reviewer-carousel/image-01.jpg"
                  alt="help-1"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Image 2: 478px; radius ≈ 6.69% */}
            <div className="absolute top-0 right-[5.49%] w-[48.62%]">
              <div className="relative w-full pt-[100%] rounded-[6.69%] border-[4px] border-white overflow-hidden shadow-sm">
                <Image
                  src="/image/reviewer-carousel/image-02.jpg"
                  alt="help-2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Image 3: 362px; radius ≈ 8.84% */}
            <div className="absolute bottom-[3.95%] left-[14.24%] w-[36.83%]">
              <div className="relative w-full pt-[100%] rounded-[8.84%] border-[4px] border-white overflow-hidden shadow-sm">
                <Image
                  src="/image/reviewer-carousel/image-03.jpg"
                  alt="help-3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Image 4: ~390px; radius ≈ 8.21% */}
            <div className="absolute bottom-0 right-0 w-[39.7%]">
              <div className="relative w-full pt-[100%] rounded-[8.21%] border-[4px] border-white overflow-hidden shadow-sm">
                <Image
                  src="/image/reviewer-carousel/image-04.jpg"
                  alt="help-4"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right column: info items */}
        <div className="flex-1 flex flex-col gap-6">
          <InfoItem
            icon={
              <img
                src="/image/help-centre/image-01.png"
                alt="Messenger"
                className="size-10"
              />
            }
            title="Messenger"
            description="24/7 · Everyday of the week"
          />
          <InfoItem
            icon={
              <img
                src="/image/help-centre/image-02.png"
                alt="M4U chat"
                className="size-10"
              />
            }
            title="M4U chat"
            description="24/7 · Always online, always listening"
          />
          <InfoItem
            icon={
              <img
                src="/image/help-centre/image-03.png"
                alt="Hotline"
                className="size-10"
              />
            }
            title="Hotline"
            description=""
            phone="+1 891 989-11-91"
            note="8:00 AM – 5:30 PM (Mon–Fri, except holidays). Fast responses, friendly support, and a better experience—just for you."
          />
        </div>
      </div>
    </div>
  )
}

export default Page
