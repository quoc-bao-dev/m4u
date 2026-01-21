'use client'

import { useLayoutEffect, useRef } from "react"
import { Container } from "../../common"
import ButtonDownloadApp from "./ButtonDownloadApp"
import { useFooterHieghtStore } from "@/modules/introduce-app/store/useFooterHieght"
import { useTranslations } from 'next-intl'

const IMAGE_FOOTER_STICKY = '/image/landing/footer-sticky.svg'
const StickyFooter = () => {
    const t = useTranslations('common')
    const buttonRef = useRef<HTMLDivElement>(null)
    const { setHeight } = useFooterHieghtStore()

    useLayoutEffect(() => {
        const button = buttonRef.current

        if (!button) {
            setHeight(0)
            return
        }

        // Set initial height
        setHeight(button.clientHeight ?? 0)

        // Observer for changes in size
        const observer = new window.ResizeObserver((entries) => {
            for (let entry of entries) {
                setHeight(entry.target.clientHeight ?? 0)
            }
        })

        observer.observe(button)
        return () => {
            observer.disconnect()
        }
    }, [setHeight])

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-999" ref={buttonRef} style={{
            boxShadow: '0 -8px 32px 0 rgba(0,0,0,0.12), 0 -2px 8px 0 rgba(215,38,161,0.10)'
        }} >
            <div className="absolute inset-0 backdrop-blur-md"></div>
            <div className="relative z-999 w-full shadow-xl">
                <img src={IMAGE_FOOTER_STICKY} alt="" className="w-full" />
            </div>

            <div className="absolute inset-0 z-999">
                <Container className="h-full">
                    <div className="absolute top-[50%] translate-y-[-50%] left-[21%]">
                        <p
                            className="font-baloo font-black text-[14px] text-[#D726A1] leading-[132%] tracking-[0] uppercase"
                        >
                            {t('stickyFooterText1')} <br /> {t('stickyFooterText2')}
                        </p>
                    </div>
                    <div className="w-full h-full flex items-center justify-end">
                        <ButtonDownloadApp />
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default StickyFooter