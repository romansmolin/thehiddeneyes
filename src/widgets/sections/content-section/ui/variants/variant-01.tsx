import Image from 'next/image'
import { cn } from '@/shared/lib/css/utils'
import { Button } from '@/shared/ui/button'
import type { ContentVariantProps } from '../../model/types'
import { defaultCta } from '../../lib/content-section.mock'

export function Variant01({
    title = 'Built for modern teams',
    subtitle,
    body = 'Our platform helps you streamline workflows, automate repetitive tasks, and focus on what matters most — building great products.',
    image,
    imagePosition = 'left',
    cta = defaultCta,
    className,
}: ContentVariantProps) {
    const isLeft = imagePosition === 'left'

    return (
        <section className={cn(className)}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                    className={cn(
                        'flex flex-col items-center gap-12 lg:flex-row lg:gap-16',
                        !isLeft && 'lg:flex-row-reverse',
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
                        <div className="mt-6 text-lg text-muted-foreground leading-relaxed">
                            {typeof body === 'string' ? <p>{body}</p> : body}
                        </div>
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
