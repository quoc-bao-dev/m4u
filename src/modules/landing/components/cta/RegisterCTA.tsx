import { cn } from '@/core/utils'
import { motion } from 'framer-motion'

type RegisterCTAProps = {
  className?: string
  onClick?: () => void
}
const RegisterCTA = ({ className, onClick }: RegisterCTAProps) => {
  return (
    <motion.div
      className={cn(
        'flex gap-2 items-center bg-[#FFF0F8] p-1 pr-4 lg:pr-6 rounded-full w-fit cursor-pointer',
        className
      )}
      onClick={onClick}
      whileHover="hover"
      initial="initial"
    >
      <button className="bg-[#FE6BBA] text-white px-8 py-6 rounded-full text-sm lg:text-xl  font-medium h-[45px] lg:h-[77px]  hover:bg-[#e55ba5] transition-colors duration-200 flex items-center gap-3">
        Đăng ký trải nghiệm ngay
      </button>
      <svg
        width="28"
        height="29"
        viewBox="0 0 28 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.5536 15.4287L16.6786 23.3037C16.432 23.5502 16.0976 23.6888 15.7489 23.6888C15.4002 23.6888 15.0658 23.5502 14.8192 23.3037C14.5727 23.0571 14.4341 22.7227 14.4341 22.374C14.4341 22.0253 14.5727 21.6909 14.8192 21.4443L20.4531 15.8126H4.375C4.0269 15.8126 3.69306 15.6743 3.44692 15.4281C3.20078 15.182 3.0625 14.8482 3.0625 14.5001C3.0625 14.152 3.20078 13.8181 3.44692 13.572C3.69306 13.3259 4.0269 13.1876 4.375 13.1876H20.4531L14.8214 7.55257C14.5748 7.306 14.4363 6.97158 14.4363 6.62288C14.4363 6.27418 14.5748 5.93976 14.8214 5.69319C15.068 5.44663 15.4024 5.30811 15.7511 5.30811C16.0998 5.30811 16.4342 5.44663 16.6808 5.69319L24.5558 13.5682C24.6782 13.6903 24.7752 13.8354 24.8414 13.9951C24.9075 14.1548 24.9415 14.326 24.9413 14.4989C24.9411 14.6718 24.9067 14.8429 24.8402 15.0024C24.7737 15.162 24.6763 15.3069 24.5536 15.4287Z"
          fill="#FE6BBA"
        />
      </svg>
    </motion.div>
  )
}

export default RegisterCTA
