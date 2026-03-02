import { Zap, Shield, Wand2, Layers, Printer, Coins, Heart } from 'lucide-react'
import { Feature } from '../../model/types'
import { cn } from '@/shared/lib/css/utils'
import { ReactNode } from 'react'
import { Badge } from '@/shared/ui/badge'

interface FeaturesSectionVariant01Props {
    title?: string
    subtitle?: string
    badge?: {
        icon?: ReactNode
        text: string
    }
    features?: Feature[]
    className?: string
}

const defaultFeatures: Feature[] = [
    {
        title: 'Powerful Processing',
        description: 'Advanced algorithms deliver exceptional results quickly and reliably.',
        icon: Wand2,
        className: 'md:col-span-3',
    },
    {
        title: 'Secure & Private',
        description:
            'Your data is handled with enterprise-grade security and complete privacy protection.',
        icon: Shield,
        className: 'md:col-span-3',
    },
    {
        title: 'Lightning Fast',
        description: 'Get results in seconds with our optimized infrastructure.',
        icon: Zap,
        className: 'md:col-span-2',
    },
    {
        title: 'Multiple Options',
        description: 'Choose from various modes and configurations to fit your needs.',
        icon: Layers,
        className: 'md:col-span-2',
    },
    {
        title: 'Export Ready',
        description: 'Download your results in multiple formats for immediate use.',
        icon: Printer,
        className: 'md:col-span-2',
    },
    {
        title: 'Flexible Pricing',
        description:
            'Pay as you go with flexible credit packs. No subscriptions, just transparent pricing.',
        icon: Coins,
        className: 'md:col-span-6',
    },
]

export const FeatureSectionVariant01 = ({
    title = 'Features You Will Love',
    subtitle = 'Everything you need to get the job done, built with care and attention to detail.',
    badge = {
        icon: <Heart className="w-4 h-4 fill-current" />,
        text: 'Why People Love Us',
    },
    features = defaultFeatures,
    className,
}: FeaturesSectionVariant01Props) => {
    const fallbackIcons = [Wand2, Shield, Zap, Layers, Printer, Coins]
    return (
        <section className={cn('py-16 md:py-24 lg:py-32 ', className)} id="features">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    {badge && (
                        <Badge className="mb-6">
                            {badge.icon ? badge.icon : null}
                            <span>{badge.text}</span>
                        </Badge>
                    )}

                    {title && (
                        <h2 className="mt-4 text-center font-serif text-3xl leading-tight sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl lg:leading-16">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto mt-6">{subtitle}</p>
                    )}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon ?? fallbackIcons[index % fallbackIcons.length]
                        return (
                            <div
                                key={index}
                                className={`
                                ${feature.className}
                                group relative p-8 rounded-2xl border border-primary bg-primary/20
                                hover:border-dashed hover:rotate-2 hover:shadow-xl hover:shadow-pink-100/50
                                transition-all duration-300 flex flex-col items-start
                            `}
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white border border-primary border-dashed flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>

                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                                    {feature.title}
                                </h3>

                                <p className="text-slate-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
