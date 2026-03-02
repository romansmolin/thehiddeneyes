import type { AboutVariantProps } from '../../model/types'
import { cn } from '@/shared/lib/css/utils'
import { Badge } from '@/shared/ui/badge'
import Image from 'next/image'

export const AboutSectionVariant01 = ({
    title,
    subtitle,
    badge,
    image,
    cards,
    className,
}: AboutVariantProps) => {
    return (
        <section
            className={cn(
                'mx-auto flex w-full max-w-6xl flex-col items-center px-4 sm:px-6 lg:px-8',
                className,
            )}
            id="how-it-works"
        >
            <Badge variant="outline" className="text-xs sm:text-sm">
                {badge}
            </Badge>

            <h2 className="mt-4 text-center font-serif text-3xl leading-tight sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl lg:leading-16">
                {title}
            </h2>
            <p className="mt-3 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base md:text-lg">
                {subtitle}
            </p>

            <div className="mt-8 grid w-full gap-6 sm:mt-10 lg:mt-12 lg:grid-cols-2 lg:gap-10">
                <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-2xl">
                    <Image
                        src={'/sections/copy.png'}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col gap-3 sm:gap-4">
                    {cards.map((card, index) => {
                        const isOutline = card.variant === 'outline'
                        return (
                            <div
                                key={`${card.title}-${index}`}
                                className={cn(
                                    'flex flex-col gap-3 rounded-2xl p-4 sm:p-5 lg:p-6',
                                    isOutline
                                        ? 'border-2 border-dashed text-foreground'
                                        : 'bg-primary text-white',
                                )}
                            >
                                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm">
                                    {card.title}
                                </h3>
                                <p className="text-sm leading-relaxed sm:text-base">
                                    {card.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
