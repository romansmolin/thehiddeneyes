import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/css/utils'
import type { HeroVariantProps } from '../../model/types'

export function HeroVariant04({ content, badge, className }: HeroVariantProps) {
    return (
        <section
            className={cn(
                'flex min-h-[calc(100dvh-4rem)] flex-1 flex-col justify-between gap-12 overflow-x-hidden pt-40 sm:gap-16 sm:pt-24 lg:gap-24',
                className,
            )}
        >
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8">
                {badge && (
                    <div className="flex items-center gap-2.5 rounded-full border bg-muted px-3 py-2">
                        <Badge>{badge}</Badge>
                        <span className="text-muted-foreground">{content.subtitle}</span>
                    </div>
                )}

                <h1 className="text-4xl font-bold leading-tight text-balance sm:text-4xl lg:text-5xl">
                    {content.headlineLine1}
                    <br />
                    <span className="relative">
                        {content.headlineLine2}
                        <svg
                            className="absolute inset-x-0 bottom-0 w-full translate-y-1/2 max-sm:hidden"
                            fill="none"
                            height="12"
                            viewBox="0 0 223 12"
                            width="223"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1.11716 10.428C39.7835 4.97282 75.9074 2.70494 114.894 1.98894C143.706 1.45983 175.684 0.313587 204.212 3.31596C209.925 3.60546 215.144 4.59884 221.535 5.74551"
                                stroke="url(#hero04_gradient)"
                                strokeLinecap="round"
                                strokeWidth="2"
                            />
                            <defs>
                                <linearGradient
                                    gradientUnits="userSpaceOnUse"
                                    id="hero04_gradient"
                                    x1="18.8541"
                                    x2="42.6487"
                                    y1="3.72033"
                                    y2="66.6308"
                                >
                                    <stop stopColor="var(--primary)" />
                                    <stop offset="1" stopColor="var(--primary-foreground)" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                </h1>

                <p className="max-w-3xl text-muted-foreground">{content.subtitle}</p>

                <div className="flex items-center gap-4">
                    <Button asChild size="lg">
                        <Link href={content.primaryCta.href}>{content.primaryCta.label}</Link>
                    </Button>
                    {content.secondaryCta && (
                        <Button asChild size="lg" variant="outline">
                            <Link href={content.secondaryCta.href}>
                                {content.secondaryCta.label}
                            </Link>
                        </Button>
                    )}
                </div>
            </div>

            <div className="w-full border border-primary max-w-4xl rounded-2xl m-auto">
                <Image
                    alt="Product screenshot"
                    className="min-h-67 w-full object-cover"
                    height={200}
                    src="/assets/placeholder-hero-wide.png"
                    width={1000}
                />
            </div>
        </section>
    )
}
