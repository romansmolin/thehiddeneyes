import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/css/utils'
import type { HeroVariantProps } from '../../model/types'

export function HeroVariant05({ content, className }: HeroVariantProps) {
    return (
        <section
            className={cn(
                'grid items-center gap-10 px-4 pt-24 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:pt-32',
                className,
            )}
        >
            <div className="mx-auto max-w-7xl space-y-7">
                <h1 className="max-w-xl text-5xl font-semibold leading-tight lg:text-6xl">
                    {content.headlineLine1}{' '}
                    <span className="text-primary">{content.headlineLine2}</span>
                </h1>
                <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
                    {content.subtitle}
                </p>
                <div className="flex items-center gap-4">
                    <Button size="lg" asChild>
                        <Link href={content.primaryCta.href}>{content.primaryCta.label}</Link>
                    </Button>
                    {content.secondaryCta && (
                        <Button size="lg" variant="outline" asChild>
                            <Link href={content.secondaryCta.href}>{content.secondaryCta.label}</Link>
                        </Button>
                    )}
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-muted p-4 shadow-sm">
                <Image
                    src="/assets/placeholder-hero-illustration.png"
                    alt="Product illustration"
                    className="h-full w-full object-cover"
                    width={500}
                    height={500}
                />
            </div>
        </section>
    )
}
