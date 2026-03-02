import { cn } from '@/shared/lib/css/utils'
import { Button } from '@/shared/ui/button'
import type { PricingVariantProps } from '../../model/types'

export function Variant01({
    title = 'Buy Credits',
    subtitle = 'Pick a pack and checkout securely.',
    plans,
    onSelectPlan,
    className,
}: PricingVariantProps) {
    return (
        <section className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
            <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl border border-border p-4 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                            {title}
                        </h2>
                        <p className="mt-2 text-lg text-foreground/90 sm:text-xl">{subtitle}</p>
                    </div>
                    <div className="inline-flex items-center rounded-2xl border border-border px-4 py-2 text-sm font-medium tracking-[0.2em] uppercase">
                        {plans.length} packs
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {plans.map((pack) => (
                        <div
                            key={pack.id}
                            className="flex w-full flex-col gap-5 rounded-2xl border border-border p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between"
                        >
                            <div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <h3 className="text-3xl font-extrabold">{pack.name}</h3>
                                    {pack.label && (
                                        <span className="rounded-2xl bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
                                            {pack.label}
                                        </span>
                                    )}
                                </div>
                                <p className="mt-3 text-2xl">
                                    {pack.credits} credits
                                </p>
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end lg:items-center">
                                <div className="sm:text-right">
                                    <div className="text-5xl font-extrabold leading-none">
                                        {pack.price} {pack.currency}
                                    </div>
                                    <div className="mt-1 text-2xl text-muted-foreground">
                                        {pack.credits} credits included
                                    </div>
                                </div>
                                <Button
                                    className="h-14 text-xl px-8"
                                    onClick={() => onSelectPlan?.(pack)}
                                >
                                    {pack.ctaLabel ?? 'Buy Credits'}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
