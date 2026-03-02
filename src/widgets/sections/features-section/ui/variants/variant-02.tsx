'use client'

import type { ReactNode } from 'react'
import type { Feature } from '../../model/types'
import { cn } from '@/shared/lib/css/utils'
import { Badge } from '@/shared/ui/badge'
import { Zap, Shield, Image as ImageIcon, Download, Palette, Layers } from 'lucide-react'

interface FeaturesSectionVariant02Props {
    title?: string
    subtitle?: string
    badge?: {
        icon?: ReactNode
        text: string
    }
    visualStats?: {
        label: string
        value: string
        caption?: string
    }[]
    features?: Feature[]
    className?: string
}

const defaultFeatures: Feature[] = [
    {
        icon: Zap,
        title: 'Lightning Fast',
        description:
            'Get high-quality results in under 60 seconds. Powered by optimized processing.',
    },
    {
        icon: Palette,
        title: 'Multiple Options',
        description:
            'Choose from various modes and configurations to match your specific needs perfectly.',
    },
    {
        icon: Shield,
        title: 'Privacy First',
        description:
            'Your data is yours. We auto-delete files after 7 days or you can remove them anytime.',
    },
    {
        icon: Download,
        title: 'High-Quality Export',
        description: 'Download results in multiple formats ready for professional use.',
    },
    {
        icon: Layers,
        title: 'No Subscriptions',
        description:
            'Pay only for what you use with flexible credit packs. No monthly commitments.',
    },
    {
        icon: ImageIcon,
        title: 'Premium Quality',
        description: 'Enterprise-grade processing with attention to detail and quality.',
    },
]

const StatCard = ({
    label,
    value,
    caption,
}: {
    label: string
    value: string
    caption?: string
}) => (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6 shadow-sm">
        <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
        <div className="mt-3 text-3xl font-bold text-slate-900">{value}</div>
        {caption ? <div className="mt-2 text-sm text-slate-500">{caption}</div> : null}

        <div className="mt-4 flex items-end gap-1">
            <div className="h-2 w-3 rounded-full bg-primary/30" />
            <div className="h-4 w-3 rounded-full bg-primary/40" />
            <div className="h-6 w-3 rounded-full bg-primary/60" />
            <div className="h-3 w-3 rounded-full bg-primary/30" />
            <div className="h-5 w-3 rounded-full bg-primary/50" />
        </div>
    </div>
)

const FeatureCard = ({
    feature,
    defaultIcon: DefaultIcon,
}: {
    feature: Feature
    defaultIcon: Feature['icon']
}) => {
    const Icon = feature.icon ?? DefaultIcon

    return (
        <article className="group rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:shadow-xl">
            <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-105">
                {Icon ? <Icon className="h-6 w-6 text-primary" /> : null}
            </div>

            <h3 className="mb-3 text-xl font-bold text-slate-900">{feature.title}</h3>
            <p className="leading-relaxed text-slate-600">{feature.description}</p>
        </article>
    )
}

export const FeatureSectionVariant02 = ({
    title = 'Why Choose Our Platform?',
    subtitle = "We've optimized every part of the process to give you the best experience possible.",
    badge,
    visualStats = [
        { label: 'Avg time saved', value: '3.2 hrs', caption: 'Per task' },
        { label: 'Key insights', value: '18', caption: 'Per report' },
        { label: 'Action items', value: '6', caption: 'Auto-tagged' },
    ],
    features = defaultFeatures,
    className,
}: FeaturesSectionVariant02Props) => {
    return (
        <section
            id="features"
            className={cn('bg-white text-slate-900', className)}
        >
            <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 lg:py-32">
                {(title || subtitle || badge) && (
                    <header className="mb-16 text-center">
                        {badge ? (
                            <Badge className="mb-6 inline-flex items-center gap-2 bg-transparent px-3 py-2 text-sm font-medium text-primary border border-primary border-dashed">
                                {badge.icon ?? null}
                                {badge.text}
                            </Badge>
                        ) : null}

                        {title ? (
                            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                                {title}
                            </h2>
                        ) : null}

                        {subtitle ? (
                            <p className="mx-auto max-w-2xl text-lg text-slate-600">{subtitle}</p>
                        ) : null}
                    </header>
                )}

                {visualStats?.length ? (
                    <div className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-3">
                        {visualStats.map((stat) => (
                            <StatCard
                                key={stat.label}
                                label={stat.label}
                                value={stat.value}
                                caption={stat.caption}
                            />
                        ))}
                    </div>
                ) : null}

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} feature={feature} defaultIcon={Zap} />
                    ))}
                </div>
            </div>
        </section>
    )
}
