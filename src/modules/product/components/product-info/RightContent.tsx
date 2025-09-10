import { RegisterCTA } from '@/modules/landing/components/cta'
import AvatarStack from './AvatarStack'
import { AccordionItem } from '@/modules/trial-registration'
import { Fragment } from 'react'
import { Rating } from '@/core/components'
import Timer from './Timer'
import Button from '@/core/components/ui/button'

const RightContent = () => {
  const time = '19:25:00'
  const termContent = (
    <div className="space-y-6">
      {/* Feature Icons */}
      <div className="flex gap-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 ">
          <LeafIcon />
          <span className="text-sm font-medium text-gray-700 text-center md:text-left">
            Vegan Friendly
          </span>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 ">
          <RabbitIcon />
          <span className="text-sm font-medium text-gray-700 text-center md:text-left">
            Cruelty Free
          </span>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 ">
          <HeartIcon />
          <span className="text-sm font-medium text-gray-700 text-center md:text-left">
            Pregnancy Safe
          </span>
        </div>
      </div>

      {/* Product Description */}
      <div className="bg-amber-50 md:p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          The Biodance Hydro Cera-nol Real Deep Mask
        </h3>
        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
          <p>
            This mask provides intensive hydration and soothing benefits,
            infused with active ingredients and utilizes Biodance's patented
            Hydro Cera-nol to help strengthen the skin's barrier while calming
            irritation.
          </p>
          <p>
            The mask contains 50,000 PPM of high-purity glacial water, rich in
            minerals, which enhances the absorption of active ingredients and
            forms a moisturizing film that helps to lock in hydration.
          </p>
          <p>
            Solidified into an ampoule form, delivering a concentrated dose of
            nourishment directly to the skin. Over time, the mask turns
            transparent, allowing the active ingredients to deeply penetrate the
            skin for maximum effectiveness.
          </p>
        </div>
      </div>
    </div>
  )
  return (
    <div className="w-full bg-yellow-100  py-5 px-6 md:p-[48px] md:rounded-3xl">
      <p className="text-[12px] md:text-[20px] font-bold">MANYO</p>
      <h2 className="text-[16px] md:text-[32px]">
        Panthetoin Deep Moisture Mask
      </h2>
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <Rating
            rate={3}
            className="md:mb-2 w-[100px] md:w-auto md:h-[16px]"
          />
          <p className="text-[14px] md:text-[28px] text-greyscale-900">
            4.8 <span className="text-greyscale-400">(69 reviews)</span>
          </p>
        </div>

        <div className="relative hidden md:flex items-center gap-2">
          <Timer time={time} />
        </div>
      </div>

      <div className="pt-2 md:pt-6 flex md:flex-row flex-col md:justify-between md:items-end gap-4 md:gap-0">
        <AvatarStack />
        <div className="flex justify-start">
          <Button size="md" variant="primary">
            Register now
          </Button>
        </div>
      </div>

      <div className="pt-4 md:pt-10 flex flex-col gap-4">
        <AccordionItem title="Ingredients" defaultOpen>
          {termContent}{' '}
        </AccordionItem>
        <AccordionItem title="Ingredients">{termContent} </AccordionItem>
        <AccordionItem title="Ingredients">{termContent} </AccordionItem>
        <AccordionItem title="Ingredients">{termContent} </AccordionItem>
      </div>
    </div>
  )
}

const LeafIcon = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#887EF9" />
      <path
        d="M24.9484 7.75655C24.9377 7.57307 24.86 7.39991 24.73 7.26994C24.6001 7.13998 24.4269 7.06226 24.2434 7.05155C17.1062 6.63249 11.3894 8.78124 8.95187 12.8125C8.10697 14.1915 7.69062 15.7903 7.75562 17.4062C7.79806 18.4396 8.0083 19.4591 8.37812 20.425C8.39986 20.4844 8.43628 20.5374 8.48399 20.579C8.53171 20.6205 8.58918 20.6494 8.65103 20.6627C8.71289 20.6761 8.77713 20.6736 8.83776 20.6555C8.8984 20.6374 8.95346 20.6042 8.99781 20.559L16.9666 12.4684C17.0362 12.3987 17.119 12.3435 17.21 12.3058C17.3011 12.268 17.3986 12.2486 17.4972 12.2486C17.5957 12.2486 17.6933 12.268 17.7844 12.3058C17.8754 12.3435 17.9581 12.3987 18.0278 12.4684C18.0975 12.5381 18.1528 12.6208 18.1905 12.7119C18.2282 12.8029 18.2476 12.9005 18.2476 12.999C18.2476 13.0976 18.2282 13.1952 18.1905 13.2862C18.1528 13.3773 18.0975 13.46 18.0278 13.5297L9.31937 22.3694L7.98906 23.6997C7.85071 23.8344 7.76811 24.0162 7.75769 24.209C7.74727 24.4018 7.80979 24.5915 7.93281 24.7403C8.00019 24.8183 8.08292 24.8816 8.17586 24.9262C8.26879 24.9708 8.36992 24.9958 8.47294 24.9996C8.57595 25.0034 8.67865 24.9859 8.7746 24.9482C8.87055 24.9105 8.95771 24.8535 9.03062 24.7806L10.6047 23.2065C11.9303 23.8478 13.2681 24.1975 14.5947 24.2444C14.6991 24.2481 14.8031 24.25 14.9069 24.25C16.4176 24.2539 17.8996 23.8377 19.1875 23.0481C23.2188 20.6106 25.3684 14.8947 24.9484 7.75655Z"
        fill="#887EF9"
      />
    </svg>
  )
}

const RabbitIcon = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#2DD4BF" />
      <path
        d="M22.05 25L19.32 20.26C19.32 18.53 18.25 17.42 16.95 17.42C16.05 17.42 15.27 17.92 14.87 18.66C15.2 18.47 15.59 18.37 16 18.37C17.3 18.37 18.36 19.43 18.36 20.73C18.36 22.04 17.31 23.11 16 23.11H19.3V25H10.79C10.55 25 10.3 24.91 10.12 24.72C9.9429 24.542 9.84349 24.3011 9.84349 24.05C9.84349 23.7989 9.9429 23.558 10.12 23.38L10.62 22.88C10.28 22.73 9.99999 22.5 9.72 22.26C9.49999 22.76 9 23.11 8.42 23.11C8.04206 23.11 7.67961 22.9599 7.41237 22.6926C7.14513 22.4254 6.995 22.0629 6.995 21.685C6.995 21.3071 7.14513 20.9446 7.41237 20.6774C7.67961 20.4101 8.04206 20.26 8.42 20.26L8.89 20.34V18.37C8.88868 17.7472 9.01038 17.1302 9.24812 16.5545C9.48586 15.9788 9.83496 15.4558 10.2754 15.0154C10.7158 14.575 11.2388 14.2259 11.8145 13.9881C12.3902 13.7504 13.0072 13.6287 13.63 13.63H13.65C15.77 13.64 17.42 14.47 17.42 13.16C17.42 12.23 17.62 11.86 17.96 11.34C17.23 11 16.4 10.79 15.53 10.79C15 10.79 14.58 10.37 14.58 9.84C14.58 9.41 14.86 9.05 15.25 8.93L14.58 8.89C14.06 8.89 13.63 8.47 13.63 7.95C13.63 7.42 14.06 7 14.58 7H15.53C17.63 7 19.47 8.15 20.46 9.85L20.74 9.84C21.45 9.84 22.11 10.07 22.65 10.45L23.1 10.83C25.27 12.78 25 14.1 25 14.11C25 15.39 23.94 16.44 22.65 16.44L22.16 16.39V16.47C22.16 17.58 21.68 18.57 20.93 19.27L24.24 25H22.05ZM22.16 11.74C21.63 11.74 21.21 12.16 21.21 12.68C21.21 13.21 21.63 13.63 22.16 13.63C22.68 13.63 23.11 13.21 23.11 12.68C23.11 12.16 22.68 11.74 22.16 11.74Z"
        fill="#2DD4BF"
      />
    </svg>
  )
}

const HeartIcon = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#FF8092" />
      <path
        d="M15.1992 7.49994H15.2021C15.7802 7.49631 16.3525 7.61942 16.8779 7.86029C17.4033 8.10116 17.8696 8.45423 18.2441 8.89447L18.625 9.34174L19.0059 8.89447C19.3804 8.45423 19.8467 8.10116 20.3721 7.86029C20.8975 7.61942 21.4698 7.49631 22.0479 7.49994H22.0508C24.2227 7.50002 26 9.28928 26 11.4999C26 13.0512 25.2029 14.6996 23.4932 16.4257L22.4238 17.5058L23.9258 17.2714C24.1646 17.2342 24.4085 17.2457 24.6426 17.3056C24.8767 17.3656 25.0966 17.4726 25.2881 17.6201L25.3213 17.6454C25.5515 17.8286 25.7345 18.0641 25.8525 18.3339C25.9754 18.6148 26.0249 18.9223 25.9961 19.2275C25.9672 19.5327 25.8608 19.8261 25.6875 20.079C25.5146 20.3312 25.2802 20.5348 25.0068 20.6718L24.9805 20.6845L21.3477 22.2294L21.3418 22.2324C21.3336 22.236 21.3251 22.2391 21.3164 22.2411L21.3105 22.2421L15.3105 23.7421L15.3096 23.7431C15.2902 23.748 15.27 23.7499 15.25 23.7499H5.5C5.23478 23.7499 4.9805 23.6445 4.79297 23.457C4.60546 23.2694 4.5 23.0151 4.5 22.7499V18.9999C4.50002 18.7348 4.60545 18.4804 4.79297 18.2929C4.9805 18.1054 5.2348 17.9999 5.5 17.9999H8.39648L8.54297 17.8535L10.6641 15.7353V15.7343C10.9815 15.4157 11.3804 15.1885 11.8164 15.0781L12.4697 14.913L12.1211 14.3359C11.5197 13.3385 11.25 12.4242 11.25 11.4999C11.25 9.28928 13.0273 7.50002 15.1992 7.49994ZM12.4316 15.4999C12.169 15.4993 11.9087 15.5507 11.666 15.6513C11.4236 15.7518 11.2036 15.8998 11.0186 16.0859L8.89648 18.207L8.75 18.3535V23.2499H15.2178L15.2773 23.2353L21.1299 21.7714L21.1689 21.7617L21.2051 21.747L24.7676 20.2294L24.7402 20.0956L24.8018 20.2128C25.0871 20.0629 25.3069 19.812 25.4189 19.5097C25.5308 19.2076 25.5268 18.8747 25.4082 18.5751C25.2895 18.2755 25.064 18.0302 24.7754 17.8867C24.5228 17.7611 24.2374 17.7208 23.9619 17.7704L23.8535 17.7949L23.8242 17.8017L17.5586 19.2431C17.539 19.2475 17.5191 19.2499 17.499 19.2499H14.5C14.4337 19.2499 14.3701 19.2236 14.3232 19.1767C14.2764 19.1298 14.25 19.0662 14.25 18.9999C14.25 18.9337 14.2764 18.87 14.3232 18.8232C14.3701 18.7763 14.4337 18.7499 14.5 18.7499H17.125C17.556 18.7499 17.9697 18.5791 18.2744 18.2744C18.5791 17.9696 18.75 17.5559 18.75 17.1249C18.75 16.694 18.5791 16.2802 18.2744 15.9755C17.9697 15.6708 17.556 15.4999 17.125 15.4999H12.4316Z"
        fill="#FF8092"
        stroke="#FF8092"
      />
    </svg>
  )
}

export default RightContent
