'use client'

import { useReferralProgramQuery } from '@/services/referral-program/queries'

import { SectionHeader } from '@/core/components'
import React from 'react'

const parseRewardsTable = (
  html: string | undefined
): Array<{ title: string; description: string }> => {
  if (!html) return []
  // Use DOMParser on the client to safely parse the HTML table from API
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const cells = Array.from(doc.querySelectorAll('td'))
    return cells.map((td) => {
      const title = td.querySelector('strong')?.textContent?.trim() || ''
      // Extract text without the title and line break
      const fullText = td.textContent || ''
      const description = fullText
        .replace(title, '')
        .replace(/^[\s\n\r]*|\n/g, '')
        .trim()
      return { title, description }
    })
  } catch {
    return []
  }
}

const highlightAmountsAndPercents = (text: string): React.ReactNode => {
  // Highlight currency-like values and percentages across locales:
  // - 50,000 đ, 50,000đ, ₫50,000, 50,000₫, 10%, 10.5%
  const regex =
    /(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?(?:\s|\u00A0|\u2009|\u202F)?[%％]|(?:[₫₩]\s?\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?|\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?(?:\s?[₫₩]|\s?đ|₫)))/g
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = regex.exec(text)) !== null) {
    const [value] = match
    const start = match.index
    const end = start + value.length
    if (lastIndex < start) {
      nodes.push(text.slice(lastIndex, start))
    }
    nodes.push(
      <span key={`${start}-${end}`} className="text-blue-500">
        {value}
      </span>
    )
    lastIndex = end
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }
  return <>{nodes}</>
}

const LeftContent = () => {
  const { data } = useReferralProgramQuery()
  const rewards = parseRewardsTable(data?.two?.content)
  return (
    <div className="order-2 xl:order-1 flex-1 space-y-8">
      {/* Steps Section */}
      <div>
        <SectionHeader title={data?.one.title || ''} titleSize="lg" />
        <div className="h-px bg-gray-200 mb-6"></div>
        <div
          className="text-gray-700!"
          dangerouslySetInnerHTML={{ __html: data?.one.content || '' }}
        ></div>
      </div>

      {/* Rewards Section */}
      <div>
        <SectionHeader title={data?.two.title || ''} titleSize="lg" />
        <div className="h-px bg-gray-200 mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {rewards.map((item, idx) => (
            <div key={idx}>
              <div className="text-gray-700 text-base font-bold mb-1">
                {item.title}
              </div>
              <div className="text-gray-700 text-base font-normal">
                {highlightAmountsAndPercents(item.description)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guidelines Section */}
      <div>
        <SectionHeader title={data?.three.title || ''} titleSize="lg" />
        <div className="h-px bg-gray-200 mb-6"></div>
        <div
          className="space-y-6- text-gray-700!"
          dangerouslySetInnerHTML={{ __html: data?.three.content || '' }}
        ></div>
      </div>
    </div>
  )
}

export default LeftContent
