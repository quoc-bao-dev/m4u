/**
 * Remove inline font-size declarations and legacy size attributes from HTML
 * so text inherits font size from parent styles.
 */
export function stripFontSize(html: string | undefined | null): string {
  if (!html) return ''

  // Remove CSS font-size in inline style attributes
  let output = html.replace(/font-size\s*:\s*[^;"']+;?/gi, '')

  // Remove legacy size attributes e.g., <font size="4"> or any size="..."
  output = output.replace(/\s+size\s*=\s*(["']).*?\1/gi, '')

  // Collapse duplicate semicolons introduced by removal
  output = output.replace(/;{2,}/g, ';')

  // Remove empty style attributes resulting from cleanup
  output = output.replace(/\sstyle\s*=\s*(["'])\s*;?\s*\1/gi, '')

  return output
}
