import React, { useCallback, useMemo, useState } from 'react'

interface UserAvatarProps {
  userName?: string
  src?: string | null
  className?: string
  size?: number // px
}

const DEFAULT_AVATAR = '/image/avatar/image-03.png'

const getInitials = (name?: string) => {
  if (!name) return ''
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : ''
  return (first + last).toUpperCase()
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  userName,
  src,
  className,
  size = 40,
}) => {
  const [imgError, setImgError] = useState(false)
  const initials = useMemo(() => getInitials(userName), [userName])
  const fontSize = Math.max(16, Math.floor(size / 3.2))

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setImgError(true)
      const target = e.currentTarget
      target.src = DEFAULT_AVATAR
    },
    []
  )

  // If both userName and src are missing, show default image directly
  if (!userName && !src) {
    return (
      <div
        className={`w-full h-full rounded-full overflow-hidden border-2 border-greyscale-200 ${
          className ?? ''
        }`.trim()}
        style={{ width: size, height: size }}
      >
        <img
          src={DEFAULT_AVATAR}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  // If img is available and not errored, show it first
  if (src && !imgError) {
    return (
      <div
        className={`w-full h-full rounded-full overflow-hidden border-2 border-greyscale-200 ${
          className ?? ''
        }`.trim()}
        style={{ width: size, height: size }}
      >
        <img
          src={src}
          alt={userName ?? 'avatar'}
          className="w-full h-full object-cover"
          onError={handleError}
        />
      </div>
    )
  }

  // Fallback to initials avatar when image fails or not provided
  return (
    <div
      className={`w-full h-full rounded-full flex items-center justify-center text-white text-sm font-semibold border-2 border-greyscale-200 ${
        className ?? ''
      }`.trim()}
      style={{ background: '#ec4899', width: size, height: size, fontSize }}
      aria-label={userName}
      title={userName}
    >
      {initials || 'A'}
    </div>
  )
}

export default UserAvatar
