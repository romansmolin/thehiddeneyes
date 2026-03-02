import { Button } from '@/shared/ui/button'
import { Gift, Heart } from 'lucide-react'
import { cn } from '@/shared/lib/css/utils'
import { PricingPlan, PricingVariantProps } from '../../model/types'

interface PricingVariant03Props extends PricingVariantProps {
    infoTitle?: string
    infoBody?: string
}

const defaultPlans: PricingPlan[] = [
    {
        id: 'starter',
        name: 'Starter pack',
        credits: 5,
        price: 0.1,
        currency: 'EUR',
        description: '5 credits to get started',
        features: [],
    },
    {
        id: 'boost',
        name: 'Boost pack',
        credits: 25,
        price: 0.5,
        currency: 'EUR',
        description: '25 credits for regular users',
        features: [],
        isPopular: true,
        label: 'Popular',
    },
    {
        id: 'pro',
        name: 'Pro pack',
        credits: 50,
        price: 1.0,
        currency: 'EUR',
        description: '50 credits for power users',
        features: [],
        label: 'Best value',
    },
]

export const PricingVariant03 = ({
    title = 'Buy credits',
    subtitle = 'Pick a pack and checkout securely.',
    plans = defaultPlans,
    onSelectPlan,
    className,
    infoTitle = 'Gifts that start real conversations',
    infoBody = 'People who send a gift get replies more often. A small, thoughtful gesture can break the ice and turn matches into real conversations.',
}: PricingVariant03Props) => {
    return (
        <section className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
            <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl border border-border p-4 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">{title}</h2>
                        <p className="mt-2 text-lg text-foreground/90 sm:text-xl">{subtitle}</p>
                    </div>
                    <div className="inline-flex items-center rounded-2xl border border-border px-4 py-2 text-sm font-medium tracking-[0.2em] uppercase">
                        {plans.length} packs
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className="flex w-full flex-col gap-5 rounded-2xl border border-border p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between"
                        >
                            <div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <h3 className="text-3xl font-extrabold">{plan.name}</h3>
                                    {plan.label && (
                                        <span className="rounded-2xl bg-primary px-3 py-1 text-sm font-semibold">
                                            {plan.label}
                                        </span>
                                    )}
                                </div>
                                {plan.credits && (
                                    <p className="mt-3 text-2xl">{plan.credits} credits</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end lg:items-center">
                                <div className="sm:text-right">
                                    <div className="text-5xl font-extrabold leading-none">
                                        {plan.price} {plan.currency}
                                    </div>
                                    {plan.credits && (
                                        <div className="mt-1 text-2xl text-muted-foreground">
                                            {plan.credits} credits included
                                        </div>
                                    )}
                                </div>
                                <Button
                                    className="h-14 text-xl px-8"
                                    onClick={() => onSelectPlan?.(plan)}
                                >
                                    Buy credits
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                        <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl border border-border bg-background">
                            <Gift className="size-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="flex items-center gap-2 text-xl font-bold sm:text-2xl">
                                {infoTitle}
                                <Heart className="size-5 text-primary" />
                            </h3>
                            <p className="mt-2 text-base text-muted-foreground sm:text-lg">
                                {infoBody}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
