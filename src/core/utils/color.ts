export const withAlpha = (hexColor?: string, alpha = 0.4): string | undefined => {
  if (!hexColor) return undefined
  const match = /^#([0-9a-fA-F]{6})$/.exec(hexColor)
  if (!match) return hexColor
  const a = Math.max(0, Math.min(1, alpha))
  const alphaInt = Math.round(a * 255)
  const alphaHex = alphaInt.toString(16).padStart(2, '0').toUpperCase()
  return `${hexColor}${alphaHex}`
}
