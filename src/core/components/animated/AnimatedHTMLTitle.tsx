'use client'
import { motion, useInView, type Variants } from 'framer-motion'
import React from 'react'

interface Letter {
  id: number
  letter: string
  className?: string
  style?: React.CSSProperties
}

interface AnimatedHTMLTitleProps {
  htmlContent: string
  className?: string
  delay?: number
  duration?: number
  disableViewportDetection?: boolean
}

export default function AnimatedHTMLTitle({
  htmlContent,
  className,
  delay = 0,
  duration,
  disableViewportDetection = false,
}: AnimatedHTMLTitleProps) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  // Parse HTML content thành các ký tự với styling
  const parsedLetters = React.useMemo(() => {
    if (!htmlContent) return []

    // Tạo một div tạm để parse HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlContent

    const letters: Letter[] = []
    let letterId = 1

    // Hàm đệ quy để traverse DOM tree
    const traverseNode = (
      node: Node,
      inheritedClassName?: string,
      inheritedStyle?: React.CSSProperties
    ) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || ''
        for (const char of text) {
          // Giữ nguyên tất cả ký tự bao gồm space, newline, tab
          letters.push({
            id: letterId++,
            letter: char,
            className: inheritedClassName,
            style: inheritedStyle,
          })
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element
        const tagName = element.tagName.toLowerCase()

        // Xử lý các thẻ đặc biệt
        if (tagName === 'br') {
          letters.push({
            id: letterId++,
            letter: '\n',
            className: inheritedClassName,
            style: inheritedStyle,
          })
          return
        }

        const elementClassName = element.getAttribute('class') || ''
        const elementStyle = element.getAttribute('style') || ''

        // Parse style attribute
        let parsedStyle: React.CSSProperties = { ...inheritedStyle }
        if (elementStyle) {
          const stylePairs = elementStyle.split(';')
          for (const pair of stylePairs) {
            const [property, value] = pair.split(':').map((s) => s.trim())
            if (property && value) {
              // Convert CSS property to React style
              const reactProperty = property.replace(/-([a-z])/g, (g) =>
                g[1].toUpperCase()
              )
              // Safely assign style properties
              ;(parsedStyle as any)[reactProperty] = value
            }
          }
        }

        // Combine class names
        const combinedClassName = [inheritedClassName, elementClassName]
          .filter(Boolean)
          .join(' ')

        // Traverse child nodes
        for (const childNode of Array.from(element.childNodes)) {
          traverseNode(childNode, combinedClassName, parsedStyle)
        }
      }
    }

    // Bắt đầu traverse từ root
    for (const childNode of Array.from(tempDiv.childNodes)) {
      traverseNode(childNode)
    }

    return letters
  }, [htmlContent])

  const computedStagger = React.useMemo(() => {
    const count = parsedLetters?.length ?? 0
    if (!duration || duration <= 0 || count === 0) return 0.05
    const per = duration / count
    return Math.max(0.01, Math.min(per, 0.2))
  }, [duration, parsedLetters?.length])

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: computedStagger, delayChildren: delay },
    },
  }

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 15,
        stiffness: 20,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring' as const,
        damping: 15,
        stiffness: 20,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={disableViewportDetection || inView ? 'visible' : 'hidden'}
    >
      {parsedLetters.map((letter) => {
        // Xử lý các ký tự đặc biệt
        if (letter.letter === '\n') {
          return <br key={letter.id.toString()} />
        }

        if (letter.letter === ' ') {
          return (
            <motion.span
              key={letter.id.toString()}
              variants={child}
              className={letter.className}
              style={letter.style}
            >
              &nbsp;
            </motion.span>
          )
        }

        return (
          <motion.span
            key={letter.id.toString()}
            variants={child}
            className={letter.className}
            style={letter.style}
          >
            {letter.letter}
          </motion.span>
        )
      })}
    </motion.div>
  )
}
