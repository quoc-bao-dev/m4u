export const getRatingI18nKey = (value?: number): string => {
  const score = typeof value === 'number' ? value : 0
  if (score >= 4) return 'rating.excellent'
  if (score >= 3) return 'rating.good'
  if (score >= 2) return 'rating.average'
  if (score >= 1) return 'rating.bad'
  return 'rating.veryBad'
}


