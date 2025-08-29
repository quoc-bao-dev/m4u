/**
 * Breakpoint types for responsive utilities
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Type for responsive object where keys are breakpoints and values are CSS classes
 */
export type ResponsiveObject = Partial<Record<Breakpoint, string>>;

/**
 * Converts a responsive object to responsive class strings
 *
 * @param responsiveObj - Object with breakpoint keys and CSS class values
 * @returns String of responsive classes
 *
 * @example
 * ```typescript
 * resp({ md: 'text-white', lg: 'text-blue-500' })
 * // Returns: "md:text-white lg:text-blue-500"
 *
 * resp({ xs: 'hidden', md: 'block', xl: 'flex' })
 * // Returns: "xs:hidden md:block xl:flex"
 * ```
 */
export function resp(responsiveObj: ResponsiveObject): string {
  if (!responsiveObj || typeof responsiveObj !== 'object') {
    return '';
  }

  return Object.entries(responsiveObj)
    .filter(([, value]) => value && typeof value === 'string')
    .map(([breakpoint, className]) => `${breakpoint}:${className}`)
    .join(' ');
}
