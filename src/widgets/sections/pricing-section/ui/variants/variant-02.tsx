'use client'

import { useState } from 'react'
import { cn } from '@/shared/lib/css/utils'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Separator } from '@/shared/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'
import { CircleCheck, CircleHelp, ArrowUpRight } from 'lucide-react'
import type { PricingVariantProps, PricingPlan } from '../../model/types'
import { defaultBillingToggle } from '../../lib/pricing-section.mock'

export function Variant02({
    title = 'Pricing',
    subtitle = 'Choose the plan that fits your needs.',
    plans,
    billingToggle = defaultBillingToggle,
    onSelectPlan,
    className,
}: PricingVariantProps) {
    const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

    const getPrice = (plan: PricingPlan) => {
        if (billing === 'yearly' && billingToggle.yearlyDiscount) {
            return Math.round(plan.price * ((100 - billingToggle.yearlyDiscount) / 100))
        }
        return plan.price
    }

    return (
        <section id="pricing" className={cn(className)}>
            <div className="flex flex-col items-center py-10 md:py-14 px-5">
                <h2 className="text-4xl font-bold text-center tracking-tight sm:text-5xl">
                    {title}
                </h2>
                {subtitle && (
                    <p className="mt-4 text-lg text-muted-foreground text-center max-w-2xl">
                        {subtitle}
                    </p>
                )}

                {billingToggle && (
                    <div className="mt-8 flex items-center gap-4 rounded-2xl border border-border p-1">
                        <button
                            className={cn(
                                'rounded-2xl px-6 py-2 text-sm font-medium transition-colors',
                                billing === 'monthly'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:text-foreground',
                            )}
                            onClick={() => setBilling('monthly')}
                        >
                            {billingToggle.monthly}
                        </button>
                        <button
                            className={cn(
                                'rounded-full px-6 py-2 text-sm font-medium transition-colors',
                                billing === 'yearly'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:text-foreground',
                            )}
                            onClick={() => setBilling('yearly')}
                        >
                            {billingToggle.yearly}
                            {billingToggle.yearlyDiscount && (
                                <span className="ml-2 text-xs">
                                    -{billingToggle.yearlyDiscount}%
                                </span>
                            )}
                        </button>
                    </div>
                )}

                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={cn(
                                'relative flex flex-col gap-6 rounded-2xl border bg-background p-8 overflow-hidden',
                                plan.isPopular && 'border-primary shadow-lg',
                            )}
                        >
                            {plan.isPopular && (
                                <Badge className="absolute top-4 right-4 bg-primary uppercase">
                                    Most Popular
                                </Badge>
                            )}

                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-medium">{plan.name}</h3>
                                <p className="mt-2 text-4xl font-bold">
                                    ${getPrice(plan)}
                                    <span className="ml-1.5 text-sm text-muted-foreground font-normal">
                                        /month
                                    </span>
                                </p>
                                <p className="mt-4 font-medium text-muted-foreground">
                                    {plan.description}
                                </p>

                                <Button
                                    className="w-full mt-6 text-base"
                                    size="lg"
                                    variant={plan.isPopular ? 'default' : 'outline'}
                                    onClick={() => onSelectPlan?.(plan)}
                                >
                                    {plan.ctaLabel ?? 'Get Started'}
                                    <ArrowUpRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>

                            <Separator />

                            <ul className="space-y-3">
                                {plan.features.map((feature) => (
                                    <li key={feature.title} className="flex items-start gap-1.5">
                                        <CircleCheck className="h-4 w-4 mt-1 text-green-600 shrink-0" />
                                        <span>{feature.title}</span>
                                        {feature.tooltip && (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger className="cursor-help">
                                                        <CircleHelp className="h-4 w-4 mt-1 text-muted-foreground" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        {feature.tooltip}
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
