'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/core/utils'
import { Link, useTranslation } from '@/locale'
import { useGetProductListDetail } from '@/services/product'
import { useAppendReviewProduct } from '@/services/trial-registration/mutations'
import { ShoppingCartIcon, ShoppingCartSimpleIcon, TrashIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useCartIconStore } from '../../stores/useCartIconStore'
import { useCartStore } from '../../stores/useCartStore'
import { IMAGES } from '@/core/constants/IMAGES'

interface CartIconProps {
  className?: string
  onOpenChange?: (open: boolean) => void
}

const CartIcon: React.FC<CartIconProps> = ({ className, onOpenChange }) => {
  const { t } = useTranslation()

  const { getItemCount, getIds, removeItem, clearCart } = useCartStore()
  const { isOpen, openCart, closeCart } = useCartIconStore()
  const itemCount = getItemCount()
  const ids = getIds()

  const [isAnimating, setIsAnimating] = useState(false)
  const [previousCount, setPreviousCount] = useState(0)

  const { data: products } = useGetProductListDetail({ ids: ids.map(String) })
  const { mutate: appendReviewProduct, isPending: isRegistering } = useAppendReviewProduct()

  useEffect(() => {
    // Chỉ mở cart khi có sản phẩm mới được thêm (không phải lần đầu load)
    if (itemCount > previousCount && previousCount > 0) {
      // Animation khi thêm sản phẩm mới
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 300)
      // Mở dropdown khi thêm sản phẩm mới
      openCart()
    }
    setPreviousCount(itemCount)
  }, [itemCount, previousCount, openCart])

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openCart()
    } else {
      closeCart()
    }
    onOpenChange?.(open)
  }

  const handleRemoveItem = (id: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    removeItem(id)
  }

  const handleClearCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    clearCart()
  }

  const handleRegister = () => {
    if (!ids || ids.length === 0) return
    appendReviewProduct(
      { id_product: ids },
      {
        onSuccess: () => {
          clearCart()
        },
      }
    )
    closeCart()
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-full shadow-[-6px_6px_20px_0px_#0000000D,8px_-8px_20px_0px_#00000005]">
      <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              'bg-white relative rounded-full shadow-lg p-3 2xl:p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer',
              isAnimating && 'animate-bounce',
              className
            )}
          >
            <div className="relative">
              <ShoppingCartSimpleIcon
                className="size-6 xl:size-8 2xl:size-12 text-pink-600"
              />
              {itemCount > 0 && (
                <div className="absolute z-[2] -top-4 -right-4 2xl:-top-6 2xl:-right-6 size-5 xl:size-5.5 2xl:size-8 bg-pink-600 text-white text-sm 2xl:text-base font-bold rounded-full flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </div>
              )}
            </div>
            <Image src={IMAGES.topGradient1} alt="cart" width={200} height={200} className="absolute rotate-[-45deg] bottom-0 right-0 w-full h-full rounded-full z-[1] pointer-events-none" />

          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-92 p-0 rounded-2xl border border-pink-200 shadow-2xl"
          align="end"
          side="top"
          sideOffset={16}
        >
          {/* Arrow indicator */}
          <div className="absolute -bottom-2 right-4 w-4 h-4 border-r border-b border-pink-200 bg-white shadow-2xl transform rotate-45"></div>
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-greyscale-900">
              {t('cart.title', { count: itemCount })}
            </h3>
          </div>

          {/* Items List */}
          <div className="max-h-80 overflow-y-auto">
            {ids.length === 0 ? (
              <div className="p-8 text-center text-greyscale-500">
                <ShoppingCartIcon size={48} className="mx-auto mb-2 opacity-50" />
                <p>{t('cart.empty')}</p>
              </div>
            ) : (
              products?.map((product) => (
                <Link href={`/product/${product.slug}`} key={product.id} onClick={() => closeCart()}>
                  <div className="px-4 py-2 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="size-12 object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <p className="text-xs text-greyscale-600 truncate">
                          {product.code}
                        </p>
                        <p className="font-medium text-sm text-greyscale-900 truncate">
                          {product.name}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => handleRemoveItem(product.id, e)}
                        className="cursor-pointer p-1 hover:bg-red-100 rounded-md transition-colors group"
                      >
                        <TrashIcon className="size-5 text-red-500 group-hover:text-red-600" />
                      </button>
                    </div>

                  </div>
                </Link>

              ))
            )}
          </div>

          {/* Footer */}
          {ids.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-100">
              <div className="flex gap-2">
                <button
                  onClick={handleClearCart}
                  className="cursor-pointer flex-1 px-4 py-2 text-sm font-medium text-pink-600 hover:bg-pink-50 border border-pink-200 rounded-lg transition-colors"
                >
                  {t('cart.clearAll')}
                </button>
                <button
                  onClick={handleRegister}
                  disabled={isRegistering}
                  className={cn(
                    'cursor-pointer flex-1 px-4 py-2 text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
                  )}
                >
                  {t('product.register')}
                </button>
              </div>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default CartIcon
