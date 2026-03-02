'use client'

import { cn } from '@/shared/lib/css/utils'
import dynamic from 'next/dynamic'

const MagicBento = dynamic(() => import('@/shared/components/MagicBento'), {
    ssr: false,
})

interface FeaturesSectionVariant05Props {
    title?: string
    subtitle?: string
    className?: string
}

export const FeatureSectionVariant05 = ({
    title = 'Everything you need to find the one',
    subtitle = 'From smart matching and compatibility insights to private messaging and date planning — every feature is designed to help you build real connections.',
    className,
}: FeaturesSectionVariant05Props) => {
    return (
        <section
            className={cn(
                'relative overflow-hidden bg-primary/40 px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-8 lg:py-20',
                className,
            )}
            id="features"
        >
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:gap-5">
                <h2 className="mt-4 text-center font-serif text-3xl leading-tight sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl lg:leading-16">
                    {title}
                </h2>
                <p className="max-w-2xl text-sm text-primary-foreground/60 sm:text-base lg:text-lg">
                    {subtitle}
                </p>
            </div>

            <div className="mx-auto mt-10 flex justify-center sm:mt-12 md:mt-14">
                <MagicBento
                    enableSpotlight
                    enableBorderGlow
                    enableStars
                    enableMagnetism
                    clickEffect
                    glowColor="230, 6, 122"
                />
            </div>
        </section>
    )
}
