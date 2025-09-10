'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu } from '@/icons'
import MenuContent from './menu-content'

interface DesktopMenuWrapperProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  isReviewer: boolean | null
  setIsReviewer: (value: boolean) => void
}

const DesktopMenuWrapper = ({
  isOpen,
  onOpenChange,
  isReviewer,
  setIsReviewer,
}: DesktopMenuWrapperProps) => {
  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <button className="hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
          <Menu className="text-gray-700 size-9 cursor-pointer" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="hidden sm:block w-[550px] p-0 rounded-2xl border border-pink-200 shadow-2xl -ml-4"
        align="start"
        sideOffset={16}
      >
        <div className="absolute -top-2 left-2 w-4 h-4 border-l border-t border-pink-200 bg-white shadow-2xl transform rotate-45"></div>

        <MenuContent
          isReviewer={isReviewer}
          setIsReviewer={setIsReviewer}
          onClose={() => onOpenChange(false)}
          isMobile={false}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DesktopMenuWrapper
