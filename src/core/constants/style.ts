export const _text = {
  xs: ['text-[10px]', 'md:text-[12px]', 'lg:text-[12px]'], // mobile nhỏ, tablet/desktop 12px
  sm: ['text-[12px]', 'md:text-[14px]', 'lg:text-[14px]'],
  base: ['text-[14px]', 'md:text-[16px]', 'lg:text-[16px]'],
  lg: ['text-[16px]', 'md:text-[18px]', 'lg:text-[20px]'], // tăng dần mobile → desktop
  xl: ['text-[18px]', 'md:text-[20px]', 'lg:text-[24px]'],
  '2xl': ['text-[20px]', 'md:text-[24px]', 'lg:text-[28px]'],
  '3xl': ['text-[24px]', 'md:text-[28px]', 'lg:text-[32px]'],
  '4xl': ['text-[28px]', 'md:text-[32px]', 'lg:text-[36px]'],
  '5xl': ['text-[32px]', 'md:text-[36px]', 'lg:text-[48px]'],
} as const;
