'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'

type EventContentRendererProps = {
  htmlContent: string
}

const EventContentRenderer = ({ htmlContent }: EventContentRendererProps) => {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
  const parsedContent = useMemo(() => {
    if (!htmlContent) return null

    // Parse HTML content và tạo React elements
    const parseHtmlContent = (html: string) => {
      // Tạo một div tạm để parse HTML
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = html

      const parseNode = (node: Node): React.ReactNode => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element
          const tagName = element.tagName.toLowerCase()

          switch (tagName) {
            case 'p':
              // Heading heuristic: only promote to heading if the paragraph is
              // essentially a single strong text block without media/links.
              const strongContent = element.querySelector('strong')
              const containsImage = !!element.querySelector('img')
              const containsLink = !!element.querySelector('a')
              const hasSingleChildElement = element.children.length === 1

              if (
                strongContent &&
                !containsImage &&
                !containsLink &&
                hasSingleChildElement &&
                strongContent.textContent?.trim()
              ) {
                const text = strongContent.textContent.trim()
                // Treat as heading only if looks like a heading phrase
                if (/^[A-Z]/.test(text) && !text.includes('.')) {
                  return (
                    <h2
                      key={Math.random()}
                      className="text-2xl font-bold text-gray-900 mt-8 mb-4"
                    >
                      {text}
                    </h2>
                  )
                }
              }
              return (
                <p key={Math.random()} className="text-gray-700 leading-7 mb-4">
                  {Array.from(element.childNodes).map((child, index) =>
                    parseNode(child)
                  )}
                </p>
              )

            case 'h1':
              return (
                <h1
                  key={Math.random()}
                  className="text-3xl font-bold text-gray-900 mt-10 mb-5"
                >
                  {Array.from(element.childNodes).map((child, index) =>
                    parseNode(child)
                  )}
                </h1>
              )

            case 'h2':
              return (
                <h2
                  key={Math.random()}
                  className="text-2xl font-bold text-gray-900 mt-8 mb-4"
                >
                  {Array.from(element.childNodes).map((child, index) =>
                    parseNode(child)
                  )}
                </h2>
              )

            case 'h3':
              return (
                <h3
                  key={Math.random()}
                  className="text-xl font-bold text-gray-900 mt-6 mb-3"
                >
                  {Array.from(element.childNodes).map((child, index) =>
                    parseNode(child)
                  )}
                </h3>
              )

            case 'h4':
              return (
                <h4
                  key={Math.random()}
                  className="text-lg font-bold text-gray-900 mt-5 mb-2.5"
                >
                  {Array.from(element.childNodes).map((child, index) =>
                    parseNode(child)
                  )}
                </h4>
              )

            case 'h5':
              return (
                <h5
                  key={Math.random()}
                  className="text-base font-bold text-gray-900 mt-4 mb-2"
                >
                  {Array.from(element.childNodes).map((child, index) =>
                    parseNode(child)
                  )}
                </h5>
              )

            case 'h6':
              return (
                <h6
                  key={Math.random()}
                  className="text-sm font-bold text-gray-900 mt-3 mb-1.5"
                >
                  {Array.from(element.childNodes).map((child, index) =>
                    parseNode(child)
                  )}
                </h6>
              )

            case 'strong':
              return (
                <strong key={Math.random()} className="font-semibold">
                  {Array.from(element.childNodes).map((child, index) =>
                    parseNode(child)
                  )}
                </strong>
              )

            case 'ul':
              return (
                <ul
                  key={Math.random()}
                  className="list-disc pl-6 flex flex-col gap-4 text-gray-700 mb-4"
                >
                  {Array.from(element.children).map((child, index) =>
                    parseNode(child)
                  )}
                </ul>
              )

            case 'ol':
              return (
                <ol
                  key={Math.random()}
                  className="list-decimal pl-6 flex flex-col gap-6 text-gray-700 mb-4"
                >
                  {Array.from(element.children).map((child, index) =>
                    parseNode(child)
                  )}
                </ol>
              )

            case 'li':
              return (
                <li key={Math.random()} className="mb-2">
                  {Array.from(element.childNodes).map((child, index) =>
                    parseNode(child)
                  )}
                </li>
              )

            case 'img':
              const src = element.getAttribute('src') || ''
              const alt = element.getAttribute('alt') || ''
              const width = element.getAttribute('width') || '1280'
              const height = element.getAttribute('height') || '720'
              console.log('[src] ', src)
              if (failedImages.has(src)) {
                return null
              }
              return (
                <div
                  key={Math.random()}
                  className="w-full h-auto overflow-hidden rounded-xl my-6"
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={parseInt(width)}
                    height={parseInt(height)}
                    unoptimized
                    onError={() => {
                      setFailedImages((prev) => {
                        const next = new Set(prev)
                        next.add(src)
                        return next
                      })
                    }}
                    className="w-full object-cover aspect-[4/3]"
                  />
                </div>
              )

            case 'a':
              const href = element.getAttribute('href') || '#'
              const target = element.getAttribute('target') || '_self'
              const rel = element.getAttribute('rel') || 'noopener noreferrer'

              return (
                <a
                  key={Math.random()}
                  href={href}
                  target={target}
                  rel={rel}
                  className="underline hover:text-gray-700 text-blue-600"
                >
                  {Array.from(element.childNodes).map((child, index) =>
                    parseNode(child)
                  )}
                </a>
              )

            case 'br':
              return <br key={Math.random()} />

            default:
              return (
                <div key={Math.random()}>
                  {Array.from(element.childNodes).map((child, index) =>
                    parseNode(child)
                  )}
                </div>
              )
          }
        }

        return null
      }

      return Array.from(tempDiv.childNodes).map((child, index) =>
        parseNode(child)
      )
    }

    return parseHtmlContent(htmlContent)
  }, [htmlContent])

  if (!parsedContent) return null

  return <article className="flex flex-col gap-8 py-6">{parsedContent}</article>
}

export default EventContentRenderer
