import Image from 'next/image'
import { cn } from '@/shared/lib/css/utils'
import { Button } from '@/shared/ui/button'
import { CircleCheck } from 'lucide-react'
import type { ContentVariantProps } from '../../model/types'
import { defaultFeatures, defaultCta } from '../../lib/content-section.mock'

export function Variant02({
    title = 'Everything you need',
    subtitle,
    body,
    image,
    imagePosition = 'right',
    features = defaultFeatures,
    cta = defaultCta,
    className,
}: ContentVariantProps) {
    const isRight = imagePosition === 'right'

    return (
        <section className={cn(className)}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                    className={cn(
                        'flex flex-col items-center gap-12 lg:flex-row lg:gap-16',
                        isRight && 'lg:flex-row-reverse',
                    )}
                >
                    <div className="w-full lg:w-1/2">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                        {subtitle && (
                            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                                {subtitle}
                            </p>
                        )}
                        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                            {title}
                        </h2>
                        {body && (
                            <div className="mt-4 text-lg text-muted-foreground">
                                {typeof body === 'string' ? <p>{body}</p> : body}
                            </div>
                        )}

                        {features && features.length > 0 && (
                            <ul className="mt-8 space-y-4">
                                {features.map((feature) => (
                                    <li key={feature.title} className="flex gap-3">
                                        <CircleCheck className="h-5 w-5 mt-0.5 text-green-600 shrink-0" />
                                        <div>
                                            <p className="font-semibold">{feature.title}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {cta && (
                            <div className="mt-8">
                                <Button asChild size="lg">
                                    <a href={cta.href}>{cta.label}</a>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
