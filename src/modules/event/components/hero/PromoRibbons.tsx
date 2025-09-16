type Props = {
  text1: string // dòng hồng phía trên
  text2: string // dòng xám phía dưới
  className?: string // optional: thêm class ngoài cùng
}

const PromoRibbons = ({ text1, text2, className }: Props) => {
  return (
    <div className={`relative ${className}`}>
      <div className="relative ">
        <svg
          width="351"
          height="81"
          viewBox="0 0 351 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.7118 0C3.67778 0 -1.12169 7.11785 1.51529 13.6389L25.8742 73.8766C27.4935 77.8809 31.5175 80.3772 35.8243 80.0491L316.551 58.6614C319.634 58.4266 322.431 56.7678 324.115 54.1754L349.361 15.3253C353.65 8.72591 348.914 0 341.043 0H10.7118Z"
            fill="#FF8092"
          />
        </svg>
        <p className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center text-2xl font-medium truncate rotate-[-2deg]">
          {text1}
        </p>
      </div>
      <div className="absolute top-[57%] left-[27%]">
        <svg
          width="343"
          height="82"
          viewBox="0 0 343 82"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.6526 24.4374C29.3361 21.6684 32.2659 19.8962 35.5 19.6907L332.067 0.847156C338.707 0.425279 343.871 6.53019 342.355 13.0081L334.668 45.8481C333.692 50.0175 330.151 53.0901 325.885 53.4683L11.5472 81.3464C3.4446 82.065 -2.0313 73.2625 2.19446 66.3118L27.6526 24.4374Z"
            fill="#ECECE5"
          />
        </svg>
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FF8092] text-center text-xl font-bold truncate rotate-[-5deg]">
          {text2}
        </p>
      </div>
    </div>
  )
}

export default PromoRibbons
