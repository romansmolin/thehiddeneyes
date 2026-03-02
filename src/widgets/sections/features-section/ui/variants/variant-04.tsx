import { Compass, HeartHandshake, Lock, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react'
import { Feature } from '../../model/types'
import { cn } from '@/shared/lib/css/utils'

interface FeaturesSectionVariant04Props {
    title?: string
    subtitle?: string
    titleHighlight?: string
    features?: Feature[]
    className?: string
}

const defaultFeatures: Feature[] = [
    {
        title: 'Better matches',
        description:
            'Compatibility-based matching helps you meet people who actually fit your lifestyle and values.',
        icon: HeartHandshake,
        className: 'md:col-span-2',
    },
    {
        title: 'Real conversations',
        description: 'Thoughtful prompts make starting conversations easier and more natural.',
        icon: MessageCircle,
    },
    {
        title: 'Less swiping',
        description: 'We focus on quality over quantity, so you spend less time scrolling.',
        icon: Sparkles,
    },
    {
        title: 'Safer profiles',
        description: 'Profile verification helps reduce fake accounts and spam.',
        icon: ShieldCheck,
    },
    {
        title: 'Privacy control',
        description: 'You decide what to share and when.',
        icon: Lock,
    },
    {
        title: 'Intentional use',
        description:
            'Designed for people who want meaningful connections, not distractions.',
        icon: Compass,
        className: 'md:col-span-3',
    },
]

const fallbackIcons = [HeartHandshake, MessageCircle, Sparkles, ShieldCheck, Lock, Compass]

export const FeatureSectionVariant04 = ({
    title = 'Why people choose us',
    titleHighlight = 'us',
    subtitle = 'Built for meaningful connections with less noise and more intention.',
    features = defaultFeatures,
    className,
}: FeaturesSectionVariant04Props) => {
    const titleParts = title.split(titleHighlight)

    return (
        <section className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)} id="features">
            <div className="mb-8 flex flex-col gap-3 sm:mb-10">
                <h2 className="text-3xl font-extrabold uppercase leading-tight sm:text-4xl lg:text-5xl">
                    {titleParts[0]}
                    <span className="text-primary">{titleHighlight}</span>
                    {titleParts[1]}
                </h2>
                <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">{subtitle}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {features.map(({ title: featureTitle, description, icon: Icon, className: itemClass }, index) => {
                    const FallbackIcon = fallbackIcons[index % fallbackIcons.length]
                    const ResolvedIcon = Icon ?? FallbackIcon
                    return (
                        <article
                            key={featureTitle}
                            className={cn(
                                'rounded-2xl border border-border bg-card p-5 sm:p-6',
                                itemClass,
                            )}
                        >
                            <div className="mb-4 inline-flex rounded-2xl border border-border bg-background p-2.5">
                                <ResolvedIcon className="size-5 text-primary" />
                            </div>
                            <h3 className="mb-2 text-lg font-bold sm:text-xl">{featureTitle}</h3>
                            <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                                {description}
                            </p>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}
