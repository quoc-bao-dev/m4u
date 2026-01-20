'use client'

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import VideoWrapper from "@/components/VideoWrapper";
import { Container } from "@/core/components";
import Button from "@/core/components/ui/button";
import Image from "next/image";
import { useTranslation } from "@/locale/hooks";
import { useDevice } from "@/core/hooks/useDevice";
import { useGetPackbotWebToAppBanner } from "@/services/packbot-web-to-app-banner";

const IMAGE_HERO = '/image/landing/hero-image-2.png'
const IMAGE_APP_STORE = '/image/landing/app-sotre.png'
const IMAGE_GOOGLE_PLAY = '/image/landing/ch-play.png'
const IMAGE_QR_CODE = '/image/landing/qr-image.png'
const IMAGE_BLUR = '/image/landing/image-blur.png'
const IMAGE_PHONE_FRAME = '/image/landing/image-phone-frame.png'
const IMAGE_DECOR = '/image/landing/image-decor.png'

const IMAGE_HERO_BANNER = '/image/landing/hero-banner.png'


const IMAGE_BACKGROUND = '/image/landing/background-v2.png'

// Tỷ lệ chiều cao màn hình (0 - 1) để kích hoạt story (ví dụ: 0.3 = 30% từ trên xuống)
const ACTIVE_STORY_TRIGGER = 0.75;

type StoryElm = {
    image: string;
    className?: string;
    initial: Partial<Record<'top' | 'left' | 'right' | 'bottom', string>>;
    animate: Partial<Record<'top' | 'left' | 'right' | 'bottom', string>>;
};

type StoryConfig = {
    id: number;
    titleKey: string;
    descriptionKey: string;
    elm: StoryElm[];
};

function StoryPhone({
    elm,
    className,
}: {
    elm?: StoryElm[];
    className?: string;
}) {
    const { isMobile } = useDevice();
    const ref = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(ref, { amount: 0.35, once: false });

    const shouldAnimate = !!elm?.length && (isMobile ? isInView : true);

    return (
        <div
            ref={ref}
            className={`relative overflow-x-visible overflow-y-visible w-[157px] lg:w-[277px] 2xl:w-[344px] ${className ?? ""}`}
        >
            <Image
                src={IMAGE_PHONE_FRAME}
                alt="Phone Frame"
                width={1000}
                height={1000}
                className="w-auto lg:h-[600px] 2xl:h-[721px] object-contain"
            />

            <div className="h-full w-full absolute inset-0 z-10 pointer-events-none overflow-x-visible overflow-y-visible">
                {elm?.map((element, index) => (
                    <motion.div
                        key={index + element.image}
                        className={`absolute ${element.className ?? ""}`}
                        initial={{ opacity: 0, ...element.initial }}
                        animate={shouldAnimate ? { opacity: 1, ...element.animate } : { opacity: 0, ...element.initial }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <Image
                            src={element.image}
                            alt={`Story element ${index + 1}`}
                            width={1000}
                            height={1000}
                            className="w-full h-auto object-contain"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

const STORY_CONFIG: StoryConfig[] = [
    {
        id: 1,
        titleKey: 'introduceApp.stories.trial.title',
        descriptionKey: 'introduceApp.stories.trial.description',
        elm: [
            {
                image: '/image/landing/story-1-elm-1.png',
                className: 'w-[92.44%] ',
                initial: {
                    top: '0%',
                    left: '-72.67%'
                },
                animate: {
                    top: '13.31%',
                    left: '-46.51%'
                }
            },
            {
                image: '/image/landing/story-1-elm-2.png',
                className: 'w-[120.64%] ',
                initial: {
                    bottom: '-5.27%',
                    right: '-87.21%'
                },
                animate: {
                    bottom: '-5.27%',
                    right: '-50.15%'
                }
            }
        ]
    },
    {
        id: 2,
        titleKey: 'introduceApp.stories.share.title',
        descriptionKey: 'introduceApp.stories.share.description',
        elm: [
            {
                image: '/image/landing/story-2-elm-1.png',
                className: 'w-[122.09%] ',
                initial: {
                    top: '26.64%',
                    left: '-72.67%'
                },
                animate: {
                    top: '26.64%',
                    left: '-53.78%'
                }
            },
            {
                image: '/image/landing/story-2-elm-2.png',
                className: 'w-[120.64%] ',
                initial: {
                    bottom: '27.87%',
                    right: '-87.21%'
                },
                animate: {
                    bottom: '27.87%',
                    right: '-63.95%'
                }
            }
        ]
    },
    {
        id: 3,
        titleKey: 'introduceApp.stories.review.title',
        descriptionKey: 'introduceApp.stories.review.description',
        elm: [
            {
                image: '/image/landing/story-3-elm-1.png',
                className: 'w-[128.78%] ',
                initial: {
                    top: '0%',
                    left: '-15.28%'
                },
                animate: {
                    top: '16.67%',
                    left: '-15.28%'
                }
            },
            {
                image: '/image/landing/story-3-elm-2.png',
                className: 'w-[26.28%] ',
                initial: {
                    top: '50.61%',
                    right: '-75.58%'
                },
                animate: {
                    top: '50.61%',
                    right: '-29.07%'
                }
            },
            {
                image: '/image/landing/story-3-elm-3.png',
                className: 'w-[128.78%] ',
                initial: {
                    left: '-63.95%',
                    bottom: '22.48%'
                },
                animate: {
                    left: '-46.51%',
                    bottom: '22.48%'
                }
            }
        ]

    },
    {
        id: 4,
        titleKey: 'introduceApp.stories.refer.title',
        descriptionKey: 'introduceApp.stories.refer.description',
        elm: [
            {
                image: '/image/landing/story-4-elm-1.png',
                className: 'w-[127.33%] ',
                initial: {
                    top: '0%',
                    left: '-13.41%'
                },
                animate: {
                    top: '9.01%',
                    left: '-13.41%'
                }
            },
            {
                image: '/image/landing/story-4-elm-2.png',
                className: 'w-[73.84%] ',
                initial: {
                    bottom: '-5.55%',
                    right: '-50.87%'
                },
                animate: {
                    bottom: '-2.36%',
                    right: '-21.80%'
                }
            },
        ]
    },
    {
        id: 5,
        titleKey: 'introduceApp.stories.challenge.title',
        descriptionKey: 'introduceApp.stories.challenge.description',
        elm: [
            {
                image: '/image/landing/story-5-elm-1.png',
                className: 'w-[129.65%] ',
                initial: {
                    top: '18.45%',
                    left: '-72.67%'
                },
                animate: {
                    top: '27.22%',
                    left: '-51.45%'
                }
            },
            {
                image: '/image/landing/story-5-elm-2.png',
                className: 'w-[122.97%] ',
                initial: {
                    bottom: '16.92%',
                    right: '-72.67%'
                },
                animate: {
                    bottom: '16.92%',
                    right: '-37.50%'
                }
            },
        ]
    },
    {
        id: 6,
        titleKey: 'introduceApp.stories.community.title',
        descriptionKey: 'introduceApp.stories.community.description',
        elm: [
            {
                image: '/image/landing/story-6-elm-1.png',
                className: 'w-[113.37%] ',
                initial: {
                    top: '0%',
                    left: '-58.14%'
                },
                animate: {
                    top: '4.85%',
                    left: '-47.67%'
                }
            },
            {
                image: '/image/landing/story-6-elm-2.png',
                className: 'w-[108.43%] ',
                initial: {
                    bottom: '17.48%',
                    right: '-72.67%'
                },
                animate: {
                    bottom: '17.48%',
                    right: '-36.92%'
                }
            },
        ]
    }
]

export default function Page() {
    const { t } = useTranslation();
    const { isMobile } = useDevice();
    const { data: packbotBannerRes } = useGetPackbotWebToAppBanner();
    const packbotBanner = packbotBannerRes?.data?.banner?.[0];
    const heroBannerSrc = useMemo(() => {
        if (!packbotBanner) return IMAGE_HERO_BANNER;
        if (isMobile && packbotBanner.image_mobile) return packbotBanner.image_mobile;
        return packbotBanner.image || IMAGE_HERO_BANNER;
    }, [isMobile, packbotBanner]);

    const stories = useMemo(
        () =>
            STORY_CONFIG.map((story) => ({
                ...story,
                title: t(story.titleKey),
                description: t(story.descriptionKey),
            })),
        [t]
    );
    const [activeStoryId, setActiveStoryId] = useState<number>(stories[0]?.id ?? 1);
    const storyRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!storyRefs.current.length) return;

        const handleScroll = () => {
            const triggerY = window.innerHeight * ACTIVE_STORY_TRIGGER;

            let candidateId = stories[0]?.id ?? 1;
            let candidateCenter = -Infinity;

            storyRefs.current.forEach((el) => {
                if (!el) return;

                const rect = el.getBoundingClientRect();
                const elementCenter = rect.top + rect.height / 2;

                // chỉ xét các thẻ có tâm đã đi qua ngưỡng % màn hình (từ dưới lên)
                if (elementCenter <= triggerY && elementCenter > candidateCenter) {
                    candidateCenter = elementCenter;
                    const id = Number(el.getAttribute("data-story-id"));
                    if (!Number.isNaN(id)) {
                        candidateId = id;
                    }
                }
            });

            setActiveStoryId(candidateId);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [stories]);

    return (
        <main>
            {/* ===== HERO SECTION ===== */}
            <div className="relative">
                <div className="lg:h-screen min-h-screen">
                    <Image src={heroBannerSrc} alt="Hero Banner" width={1000} height={1000} className="w-full h-full object-cover min-h-screen" />
                </div>
            </div>

            {/* ===== STORIES SECTION ===== */}
            <div className="relative overflow-x-hidden lg:overflow-x-visible overflow-y-visible">
                {/* background */}
                <div className="h-full bg-white absolute top-0 left-0 w-full rounded-b-4xl overflow-hidden"

                >
                    <Image src={IMAGE_BACKGROUND} alt="Background" width={1000} height={1000} className="w-full h-full object-cover" />
                </div>
                <Container className="overflow-x-visible overflow-y-visible">
                    <div className="relative grid grid-cols-1 lg:grid-cols-2 overflow-x-visible overflow-y-visible">
                        {/* content */}
                        <div className="">
                            {stories.map((story, index) => (
                                <div
                                    key={story.id}

                                    className="py-10 lg:py-0 lg:h-screen flex items-center justify-center"
                                >
                                    <div className="flex flex-col gap-2 justify-center items-center">
                                        <div className="relative w-fit">
                                            <div className="absolute top-1/2 -left-16 translate-y-[-50%]">
                                                <Image src={IMAGE_DECOR} alt="Decor" width={1000} height={1000} className="size-[100px] lg:size-[180px] object-cover" />
                                            </div>
                                            <h3
                                                data-story-id={story.id}
                                                ref={(el) => {
                                                    storyRefs.current[index] = el;
                                                }}
                                                className={`relative z-10 font-primary font-bold text-[24px] lg:text-[48px] 2xl:text-[64px] leading-[1] tracking-[0.02em] text-center transition-colors duration-300 ${activeStoryId === story.id ? "text-[#FE6BBA]" : ""}`}
                                            >
                                                {story.title}
                                            </h3>
                                        </div>
                                        <p
                                            className="relative z-10 mt-4 font-primary font-normal text-[16px] lg:text-[20px] 2xl:text-[24px] leading-[1.3] tracking-[0] text-center"
                                        >
                                            {story.description}
                                        </p>
                                        {/* mobile: show phone + elm here, animate on in-view */}
                                        <div className="mt-3 lg:hidden">
                                            <StoryPhone elm={story.elm as StoryElm[] | undefined} className="mx-auto" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* image */}
                        <div className="hidden lg:flex h-screen sticky top-0 items-center justify-center overflow-x-visible overflow-y-visible">
                            <StoryPhone elm={(stories.find(story => story.id === activeStoryId)?.elm as StoryElm[] | undefined)} />
                        </div>
                    </div>
                </Container>
            </div>
        </main>
    );
}

