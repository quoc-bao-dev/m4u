'use client'

import { Container } from '@/core/components'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useGetGeneralPolicy } from '@/services/policy'
import { formatHtml } from '../utils/formatHTML'
import { useTranslations } from 'next-intl'

const IMAGE_BACKGROUND = '/image/event/image-blur-01.png'
const IMAGE_HERO = '/image/policy/hero.png'

const MAP_KEY: Record<number, PolicyKey> = {
    1: 'refund',
    2: 'privacy',
    3: 'point',
}

type PolicyKey = 'refund' | 'privacy' | 'point'

type PolicyItem = {
    key: PolicyKey
    title: string
}

const SidebarSkeleton = () => {
    return (
        <>
            {/* DESKTOP SIDEBAR SKELETON */}
            <div className="hidden md:block space-y-2">
                <div className="w-full h-[60px] bg-gray-200 rounded animate-pulse">
                </div>
                <div className="w-full h-[60px] bg-gray-200 rounded animate-pulse">
                </div>
                <div className="w-full h-[60px] bg-gray-200 rounded animate-pulse">
                </div>
            </div>

            {/* MOBILE SIDEBAR SKELETON */}
            <div className="md:hidden">
                <div className="w-full h-[60px] bg-gray-200 rounded animate-pulse">
                </div>
            </div>
        </>
    )
}

const ContentSkeleton = () => {
    return (
        <div className="space-y-2">
            <div className="w-full h-[20px] bg-gray-200 rounded animate-pulse">
            </div>
            <div className="w-full h-[20px] bg-gray-200 rounded animate-pulse">
            </div>
            <div className="w-full h-[20px] bg-gray-200 rounded animate-pulse">
            </div>
            <div className="w-full h-[20px] bg-gray-200 rounded animate-pulse">
            </div>
            <div className="w-full h-[20px] bg-gray-200 rounded animate-pulse">
            </div>
            <div className="w-full h-[20px] bg-gray-200 rounded animate-pulse">
            </div>
            <div className="w-full h-[20px] bg-gray-200 rounded animate-pulse">
            </div>
            <div className="w-full h-[20px] bg-gray-200 rounded animate-pulse">
            </div>
            <div className="w-full h-[20px] bg-gray-200 rounded animate-pulse">
            </div>
            <div className="w-full h-[20px] bg-gray-200 rounded animate-pulse">
            </div>
            <div className="w-full h-[20px] bg-gray-200 rounded animate-pulse">
            </div>
            <div className="w-full h-[20px] bg-gray-200 rounded animate-pulse">
            </div>
            <div className="w-full h-[20px] bg-gray-200 rounded animate-pulse">
            </div>
            <div className="w-full h-[20px] bg-gray-200 rounded animate-pulse">
            </div>
        </div>
    )
}

const PolicyIcon = ({ type }: { type: PolicyKey }) => {
    if (type === 'refund') {
        return (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" />
                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="#E5E7EB" />
                <path
                    d="M9.5 20.5C13.0571 20.4971 16.5987 20.9681 20.0313 21.9007C20.516 22.0327 21 21.6727 21 21.17V20.5M10.5 11V11.5C10.5 11.6326 10.4473 11.7598 10.3536 11.8536C10.2598 11.9473 10.1326 12 10 12H9.5M9.5 12V11.75C9.5 11.336 9.836 11 10.25 11H21.5M9.5 12V18M21.5 11V11.5C21.5 11.776 21.724 12 22 12H22.5M21.5 11H21.75C22.164 11 22.5 11.336 22.5 11.75V18.25C22.5 18.664 22.164 19 21.75 19H21.5M9.5 18V18.25C9.5 18.4489 9.57902 18.6397 9.71967 18.7803C9.86032 18.921 10.0511 19 10.25 19H10.5M9.5 18H10C10.1326 18 10.2598 18.0527 10.3536 18.1464C10.4473 18.2402 10.5 18.3674 10.5 18.5V19M21.5 19V18.5C21.5 18.3674 21.5527 18.2402 21.6464 18.1464C21.7402 18.0527 21.8674 18 22 18H22.5M21.5 19H10.5M18 15C18 15.5304 17.7893 16.0391 17.4142 16.4142C17.0391 16.7893 16.5304 17 16 17C15.4696 17 14.9609 16.7893 14.5858 16.4142C14.2107 16.0391 14 15.5304 14 15C14 14.4696 14.2107 13.9609 14.5858 13.5858C14.9609 13.2107 15.4696 13 16 13C16.5304 13 17.0391 13.2107 17.4142 13.5858C17.7893 13.9609 18 14.4696 18 15ZM20 15H20.0053V15.0053H20V15ZM12 15H12.0053V15.0053H12V15Z"
                    stroke="#3B82F6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        )
    }

    if (type === 'privacy') {
        return (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" />
                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="#E5E7EB" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.444 9.991C12.5295 10.2369 11.6209 10.5043 10.719 10.793C10.6374 10.8182 10.5645 10.8659 10.5088 10.9306C10.4531 10.9954 10.4168 11.0745 10.404 11.159C9.87102 15.056 11.101 17.9 12.568 19.773C13.304 20.713 14.101 21.409 14.765 21.866C15.098 22.094 15.391 22.26 15.622 22.366C15.738 22.419 15.832 22.455 15.904 22.476C15.9358 22.4862 15.9682 22.4942 16.001 22.5C16.008 22.499 16.039 22.495 16.098 22.477C16.17 22.455 16.264 22.419 16.38 22.366C16.61 22.26 16.905 22.094 17.237 21.866C18.0696 21.2818 18.8102 20.5763 19.434 19.773C20.901 17.9 22.131 15.056 21.598 11.159C21.5853 11.0745 21.5489 10.9954 21.4932 10.9306C21.4375 10.8659 21.3646 10.8182 21.283 10.793C20.657 10.593 19.601 10.267 18.558 9.991C17.492 9.71 16.511 9.5 16.001 9.5C15.491 9.5 14.511 9.71 13.444 9.991ZM13.188 9.025C14.231 8.749 15.338 8.5 16.001 8.5C16.663 8.5 17.771 8.749 18.814 9.025C19.7443 9.27477 20.6686 9.54652 21.586 9.84C22.114 10.008 22.512 10.463 22.589 11.024C23.162 15.221 21.833 18.331 20.222 20.389C19.5355 21.2722 18.7204 22.0475 17.804 22.689C17.4854 22.9122 17.1485 23.1082 16.797 23.275C16.527 23.399 16.239 23.5 16.001 23.5C15.763 23.5 15.475 23.399 15.205 23.275C14.8535 23.1084 14.5166 22.9123 14.198 22.689C13.282 22.0474 12.4672 21.2721 11.781 20.389C10.168 18.331 8.84002 15.221 9.41302 11.024C9.45133 10.7521 9.56587 10.4966 9.74337 10.287C9.92088 10.0775 10.1541 9.92249 10.416 9.84C11.3335 9.54652 12.2577 9.27478 13.188 9.025Z"
                    fill="#3B82F6"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.8546 14.1459C18.9012 14.1924 18.9381 14.2475 18.9633 14.3083C18.9886 14.369 19.0015 14.4341 19.0015 14.4999C19.0015 14.5657 18.9886 14.6308 18.9633 14.6916C18.9381 14.7523 18.9012 14.8075 18.8546 14.8539L15.8546 17.8539C15.8082 17.9005 15.753 17.9374 15.6923 17.9626C15.6315 17.9878 15.5664 18.0008 15.5006 18.0008C15.4349 18.0008 15.3697 17.9878 15.309 17.9626C15.2483 17.9374 15.1931 17.9005 15.1466 17.8539L13.6466 16.3539C13.6001 16.3074 13.5633 16.2522 13.5381 16.1915C13.5129 16.1308 13.5 16.0657 13.5 15.9999C13.5 15.9342 13.5129 15.8691 13.5381 15.8083C13.5633 15.7476 13.6001 15.6924 13.6466 15.6459C13.6931 15.5994 13.7483 15.5626 13.809 15.5374C13.8698 15.5122 13.9349 15.4993 14.0006 15.4993C14.0664 15.4993 14.1315 15.5122 14.1922 15.5374C14.253 15.5626 14.3081 15.5994 14.3546 15.6459L15.5006 16.7929L18.1466 14.1459C18.1931 14.0994 18.2483 14.0624 18.309 14.0372C18.3697 14.012 18.4349 13.999 18.5006 13.999C18.5664 13.999 18.6315 14.012 18.6923 14.0372C18.753 14.0624 18.8082 14.0994 18.8546 14.1459Z"
                    fill="#3B82F6"
                />
            </svg>
        )
    }

    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" />
            <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="#E5E7EB" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 15.6348C10 14.4723 12.8024 12.9521 16.2594 12.9521C19.7164 12.9521 22.5189 14.4723 22.5189 15.6348V18.3174C22.5189 19.4799 19.7164 21 16.2594 21C12.8024 21 10 19.4799 10 18.3174V15.6348Z"
                stroke="#3B82F6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.2594 18.3031C19.7164 18.3031 22.5189 16.867 22.5189 15.633C22.5189 14.399 19.7164 12.9521 16.2594 12.9521C12.8024 12.9521 10 14.3981 10 15.633C10 16.867 12.8024 18.3031 16.2594 18.3031Z"
                stroke="#3B82F6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

const ChevronDown = ({ open }: { open: boolean }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
            <path d="M18 9L12 15L6 9" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

type SidebarProps = {
    items: PolicyItem[]
    activeKey: PolicyKey
    onSelect: (key: PolicyKey) => void
}

const PolicySidebarDesktop = ({ items, activeKey, onSelect }: SidebarProps) => {
    return (
        <div className="hidden md:flex flex-col gap-2">
            {items.map((item) => {
                const isActive = item.key === activeKey
                return (
                    <button
                        key={item.key}
                        type="button"
                        onClick={() => onSelect(item.key)}
                        className={`cursor-pointer py-2 px-3 rounded-[8px] flex gap-2 items-center w-full text-left transition-colors ${isActive ? 'bg-[#E7F7FE]' : 'hover:bg-[#E7F7FE]'
                            }`}
                    >
                        <PolicyIcon type={item.key} />
                        <p className="text-[14px] text-[#374151] flex-1">{item.title}</p>
                    </button>
                )
            })}
        </div>
    )
}

const PolicySidebarMobileDropdown = ({ items, activeKey, onSelect }: SidebarProps) => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    const activeItem = items.find((item) => item.key === activeKey) ?? items[0]

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (!wrapperRef.current) return
            if (!wrapperRef.current.contains(event.target as Node)) {
                setMobileOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchstart', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchstart', handleClickOutside)
        }
    }, [])

    return (
        <div ref={wrapperRef} className="md:hidden relative">
            <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                className="w-full cursor-pointer py-3 px-4 rounded-[16px] border border-[#3B82F6] bg-[#E7F7FE] flex gap-3 items-center"
            >
                <PolicyIcon type={activeItem?.key} />
                <p className="text-[14px] leading-[1.3] text-[#374151] flex-1 text-left">{activeItem?.title}</p>
                <ChevronDown open={mobileOpen} />
            </button>

            <div
                className={`absolute top-full left-0 w-full overflow-hidden transition-all duration-200 ease-out ${mobileOpen ? 'max-h-[320px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0 pointer-events-none'
                    }`}
            >
                <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-2 flex flex-col gap-1">
                    {items.map((item) => {
                        const isActive = item.key === activeKey

                        return (
                            <button
                                key={item.key}
                                type="button"
                                onClick={() => {
                                    onSelect(item.key)
                                    setMobileOpen(false)
                                }}
                                className={`cursor-pointer py-2 px-3 rounded-[8px] flex gap-2 items-center w-full text-left transition-colors ${isActive ? 'bg-[#E7F7FE]' : 'hover:bg-[#E7F7FE] border border-transparent'
                                    }`}
                            >
                                <PolicyIcon type={item.key} />
                                <p className="text-[14px] text-[#374151] flex-1">{item.title}</p>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const PolicyPage = () => {
    const [activeKey, setActiveKey] = useState<PolicyKey>('point')

    const t = useTranslations('PolicyPage')

    const { data: generalPolicy, isLoading } = useGetGeneralPolicy()

    const navItems = generalPolicy?.data?.policy?.map((item) => ({
        key: MAP_KEY[item.id],
        title: item.title,
    }))

    const activeItem = generalPolicy?.data?.policy?.find((item) => MAP_KEY[item.id] === activeKey)
    const title = activeItem?.title
    const content = activeItem?.content


    const scrollRef = useRef<HTMLDivElement | null>(null)


    const scrollToActiveKey = () => {
        const scrollElement = scrollRef.current
        if (scrollElement) {
            scrollElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' })
        }
    }


    return (
        <>
            <div className="py-20 relative">
                <div className="absolute top-0 left-0 right-0">
                    <Image src={IMAGE_BACKGROUND} alt="Background" width={1000} height={1000} className="w-full h-full object-cover" />
                </div>
                <Container className="max-w-[1390px] mx-auto relative z-100">

                    {/* ========== HEORO BANNER ========== */}
                    <div className="w-full aspect-[350/211]  md:aspect-[1390/480] rounded-2xl overflow-hidden relative">
                        <Image src={IMAGE_HERO} alt="Hero" width={1000} height={1000} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40">
                            <h1 className="pt-[100px] md:pt-[212px] w-[253px] md:w-auto mx-auto text-center text-[24px] md:text-[76px] font-bold text-white">{t('title')}</h1>
                        </div>
                        <div ref={scrollRef} className="" />
                    </div>
                    {/* ========== MAIN CONTENT ========== */}
                    <div className="pt-[20px] md:pt-[50px]">
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-[20px] md:gap-[80px] relative">
                            {/* ========== SDIEBAR ========== */}
                            {isLoading ? <SidebarSkeleton /> : (
                                <div >
                                    <div className="sticky top-20">
                                        <PolicySidebarDesktop items={navItems ?? []} activeKey={activeKey} onSelect={(key) => {
                                            setActiveKey(key)
                                            scrollToActiveKey();
                                        }} />
                                    </div>
                                    <PolicySidebarMobileDropdown items={navItems ?? []} activeKey={activeKey} onSelect={setActiveKey} />
                                </div>
                            )}

                            {/* ========== CONTENT ========== */}
                            {isLoading ? <ContentSkeleton /> : (
                                <div className="" >
                                    <h1 className="font-bold text-[20px] md:text-[24px] leading-[1.3] text-[#111827] mb-[20px]">
                                        {title}
                                    </h1>
                                    <div dangerouslySetInnerHTML={{ __html: formatHtml(content ?? '') }} />
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default PolicyPage
