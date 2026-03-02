import { cn } from '@/shared/lib/css/utils'
import type { SocialProofVariantProps } from '../../model/types'

export function Variant02({
    title,
    stats,
    logos,
    className,
}: SocialProofVariantProps) {
    return (
        <section className={cn('py-8 border-y border-border', className)}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
                    <div className="flex flex-wrap items-center gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="flex items-baseline gap-1.5">
                                <span className="text-2xl font-bold">
                                    {stat.value}{stat.suffix}
                                </span>
                                <span className="text-sm text-muted-foreground">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {logos.length > 0 && (
                        <div className="flex items-center gap-6 opacity-50">
                            {logos.slice(0, 4).map((logo) => (
                                <div
                                    key={logo.alt}
                                    className="h-6 w-20 rounded bg-muted flex items-center justify-center text-[10px] text-muted-foreground"
                                >
                                    {logo.alt}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
