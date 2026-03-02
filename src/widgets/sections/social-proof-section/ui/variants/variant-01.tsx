'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/shared/lib/css/utils'
import type { SocialProofVariantProps } from '../../model/types'

function AnimatedCounter({ value, suffix }: { value: string; suffix?: string }) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    const target = parseFloat(value)
    const isDecimal = value.includes('.')

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const duration = 2000
                    const steps = 60
                    const increment = target / steps
                    let current = 0
                    const timer = setInterval(() => {
                        current += increment
                        if (current >= target) {
                            setCount(target)
                            clearInterval(timer)
                        } else {
                            setCount(current)
                        }
                    }, duration / steps)
                    observer.disconnect()
                }
            },
            { threshold: 0.5 },
        )

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [target])

    return (
        <div ref={ref} className="text-4xl font-bold tracking-tight sm:text-5xl">
            {isDecimal ? count.toFixed(1) : Math.floor(count)}
            {suffix}
        </div>
    )
}

export function Variant01({
    title = 'Trusted by thousands worldwide',
    stats,
    logos,
    className,
}: SocialProofVariantProps) {
    return (
        <section className={cn(className)}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                    {title}
                </h2>

                <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* {logos.length > 0 && (
                    <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-60">
                        {logos.map((logo) => (
                            <div key={logo.alt} className="flex items-center">
                                {logo.href ? (
                                    <a href={logo.href} target="_blank" rel="noopener noreferrer">
                                        <div className="h-8 w-24 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                            {logo.alt}
                                        </div>
                                    </a>
                                ) : (
                                    <div className="h-8 w-24 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                        {logo.alt}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )} */}
            </div>
        </section>
    )
}
