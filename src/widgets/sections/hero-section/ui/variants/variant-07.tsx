import { HeroVariantProps } from '../../model/types'
import { cn } from '@/shared/lib/css/utils'
import { Button } from '@/shared/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const OFFICE_HERO_IMAGE = '/sections/image.png'
const SHARED_DEFAULT_PHONE_IMAGE = '/assets/phone-hand.jpg'

const DECORATIVE_STARS = [
    {
        src: '/sections/star-big.png',
        className:
            'absolute z-11 -top-10 -left-10 size-14 sm:-top-14 sm:-left-14 sm:size-18 lg:-top-19 lg:-left-19 lg:size-26',
    },
    {
        src: '/sections/star-small.png',
        className:
            'absolute z-11 top-3 left-3 size-10 sm:top-4 sm:left-4 sm:size-14 lg:top-5 lg:left-5 lg:size-20',
    },
    {
        src: '/sections/star-small.png',
        className:
            'absolute z-11 bottom-3 right-3 size-10 sm:bottom-4 sm:right-4 sm:size-14 lg:bottom-5 lg:right-5 lg:size-20',
    },
] as const

const DECORATIVE_FRAMES = [
    'absolute rounded-2xl border border-white -top-3 -left-3 h-[20rem] w-[15rem] sm:-top-4 sm:-left-4 sm:h-[24rem] sm:w-[18rem] md:-top-5 md:-left-5 md:h-[30rem] md:w-[22rem] lg:h-84 lg:w-3xs z-0',
    'absolute rounded-2xl border border-white -bottom-3 -right-3 h-[20rem] w-[15rem] sm:-bottom-4 sm:-right-4 sm:h-[24rem] sm:w-[18rem] md:-bottom-5 md:-right-5 md:h-[30rem] md:w-[22rem] lg:h-84 lg:w-3xs z-0',
] as const

const SOCIAL_CHIPS = [
    {
        label: 'Real chemistry.',
        className:
            'hidden sm:block rounded-full bg-white top-4 -right-10 md:-right-12 lg:-right-16 text-black border border-black py-1.5 px-3 text-xs md:text-sm absolute z-11',
    },
    {
        label: 'Deeper connections.',
        className:
            'hidden sm:block rounded-full bg-white left-8 bottom-22 md:left-12 md:bottom-24 lg:left-16 lg:bottom-28 text-black border border-black py-1.5 px-3 text-xs md:text-sm absolute z-11',
    },
    {
        label: 'No more swiping.',
        className:
            'hidden sm:block rounded-full bottom-4 -left-9 md:-left-12 lg:bottom-7 lg:-left-15 bg-white text-black border border-black py-1.5 px-3 text-xs md:text-sm absolute z-11',
    },
] as const

export const HeroVariant07 = ({ content, className, images }: HeroVariantProps) => {
    const heroImageSrc =
        images?.phoneHand && images.phoneHand !== SHARED_DEFAULT_PHONE_IMAGE
            ? images.phoneHand
            : OFFICE_HERO_IMAGE

    return (
        <section className={cn('flex min-h-[calc(100svh-5rem)] p-3 sm:p-5', className)}>
            <div className="bg-primary flex flex-1 flex-col gap-10 rounded-2xl px-5 py-8 text-white sm:rounded-2xl sm:px-8 sm:py-12 md:gap-12 md:px-10 lg:flex-row lg:gap-16 lg:px-18 lg:py-20">
                <div className="flex flex-1 flex-col justify-center gap-6 text-center sm:gap-8 lg:gap-10 lg:pr-6 lg:text-left">
                    <h1 className="font-serif text-4xl leading-tight tracking-wide sm:text-5xl md:text-6xl lg:text-7xl lg:leading-20">
                        {content.headlineLine1}{' '}
                        <span className="italic font-bold">{content.headlineLine2}</span>
                    </h1>

                    <p className="mx-auto max-w-xl text-base sm:text-lg md:text-xl lg:mx-0 lg:max-w-lg lg:text-2xl">
                        {content.subtitle}
                    </p>

                    <div className="mt-2 flex flex-col gap-3 sm:mt-4 sm:flex-row sm:justify-center sm:gap-4 lg:mt-8 lg:justify-start lg:gap-5">
                        <Button
                            asChild
                            size="lg"
                            className="h-12 w-full sm:h-14 sm:w-auto"
                            variant="secondary"
                        >
                            <Link href={content.primaryCta.href}>{content.primaryCta.label}</Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            className="h-12 w-full sm:h-14 sm:w-auto"
                            variant="outline"
                        >
                            <Link href={content.secondaryCta.href}>
                                {content.secondaryCta.label}
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center lg:pl-6">
                    <div className="relative isolate overflow-visible">
                        {DECORATIVE_STARS.map((star, index) => (
                            <Image
                                key={`${star.src}-${index}`}
                                src={star.src}
                                width={150}
                                height={150}
                                alt=""
                                className={star.className}
                                aria-hidden
                            />
                        ))}
                        {DECORATIVE_FRAMES.map((frameClassName) => (
                            <div key={frameClassName} className={frameClassName}></div>
                        ))}
                        <div className="relative z-10 h-[20rem] w-[15rem] overflow-hidden rounded-2xl sm:h-[24rem] sm:w-[18rem] md:h-[30rem] md:w-[22rem] lg:h-125 lg:w-100">
                            <Image
                                src={heroImageSrc}
                                alt="Modern office workspace"
                                width={400}
                                height={600}
                                className="size-full object-cover"
                            />
                        </div>
                        {SOCIAL_CHIPS.map((chip) => (
                            <div key={chip.label} className={chip.className}>
                                {chip.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
