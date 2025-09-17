'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/core/utils'
import { useTranslation } from '@/locale'
import { ShoppingCartIcon, ShoppingCartSimpleIcon, TrashIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useCartIconStore } from '../../stores/useCartIconStore'
import { useCartStore } from '../../stores/useCartStore'

interface CartIconProps {
  className?: string
  onOpenChange?: (open: boolean) => void
}

const CartIcon: React.FC<CartIconProps> = ({ className, onOpenChange }) => {
  const { getItemCount, items, removeItem, clearCart } = useCartStore()
  const { isOpen, openCart, closeCart } = useCartIconStore()
  const [isAnimating, setIsAnimating] = useState(false)
  const [previousCount, setPreviousCount] = useState(0)
  const { t } = useTranslation()

  const itemCount = getItemCount()

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
    e.stopPropagation()
    removeItem(id)
  }

  const handleClearCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    clearCart()
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              'bg-white rounded-full shadow-lg p-5 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer',
              isAnimating && 'animate-bounce',
              className
            )}
            style={{
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)'
            }}
          >
            <div className="relative">
              <ShoppingCartSimpleIcon
                className="size-[72px] text-pink-600"
              />
              {itemCount > 0 && (
                <div className="absolute -top-4 -right-4 p-2 size-8 aspect-square bg-pink-600 text-white text-base font-bold rounded-full flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </div>
              )}
            </div>
          </button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent
          className="w-92 p-0 rounded-2xl border border-gray-200 shadow-2xl"
          align="end"
          side="top"
          sideOffset={16}
        >
          {/* Arrow indicator */}
          <div className="absolute -bottom-2 right-4 w-4 h-4 border-r border-b border-gray-200 bg-white shadow-2xl transform rotate-45"></div>
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-greyscale-900">
              {t('cart.title', { count: itemCount })}
            </h3>
          </div>

          {/* Items List */}
          <div className="max-h-80 overflow-y-auto">
            {items.length === 0 ? (
              <div className="p-8 text-center text-greyscale-500">
                <ShoppingCartIcon size={48} className="mx-auto mb-2 opacity-50" />
                <p>{t('cart.empty')}</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-2 border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-greyscale-900 truncate">
                        {item.productName}
                      </p>
                      <p className="text-xs text-greyscale-600 truncate">
                        {item.productBrand}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleRemoveItem(item.id, e)}
                      className="cursor-pointer p-1 hover:bg-red-100 rounded-md transition-colors group"
                    >
                      <TrashIcon size={16} className="text-red-500 group-hover:text-red-600" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t border-gray-100">
              <div className="flex gap-2">
                <button
                  onClick={handleClearCart}
                  className="flex-1 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  {t('cart.clearAll')}
                </button>
                <button
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                >
                  {t('cart.viewDetails')}
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
