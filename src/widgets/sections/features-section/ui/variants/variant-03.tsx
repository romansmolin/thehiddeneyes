import type { FeatureWithMockup } from '../../model/types'
import { cn } from '@/shared/lib/css/utils'
import type { JSX, ReactNode } from 'react'
import { Badge } from '@/shared/ui/badge'
import { FileText, Settings, Zap } from 'lucide-react'

type MockupComponent = () => JSX.Element

type FeatureWithLocalMockup = FeatureWithMockup & {
    mockup?: MockupComponent
}

interface FeaturesSectionVariant03Props {
    title?: string
    titleDecorator?: ReactNode
    badge?: {
        icon?: ReactNode
        text: string
    }
    features?: FeatureWithLocalMockup[]
    className?: string
}

const SummaryMockup: MockupComponent = () => (
    <div className="flex h-full w-full flex-col gap-3 p-4">
        <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                <FileText className="h-4 w-4 text-slate-600" />
            </div>
            <div className="h-2 w-24 rounded-full bg-slate-200" />
        </div>

        <div className="space-y-2">
            <div className="h-2 w-40 rounded-full bg-slate-200" />
            <div className="h-2 w-32 rounded-full bg-slate-200" />
            <div className="h-2 w-28 rounded-full bg-slate-200" />
        </div>

        <div className="mt-auto grid grid-cols-3 gap-2">
            <div className="h-10 rounded-2xl bg-slate-100" />
            <div className="h-10 rounded-2xl bg-slate-100" />
            <div className="h-10 rounded-2xl bg-slate-100" />
        </div>
    </div>
)

const FindingsMockup: MockupComponent = () => (
    <div className="flex h-full w-full flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <FileText className="h-4 w-4 text-slate-600" />
                </div>
                <div className="h-2 w-20 rounded-full bg-slate-200" />
            </div>
            <div className="h-2 w-12 rounded-full bg-amber-200" />
        </div>

        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-300" />
                <div className="h-2 w-40 rounded-full bg-slate-200" />
            </div>
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-slate-300" />
                <div className="h-2 w-36 rounded-full bg-slate-200" />
            </div>
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-rose-300" />
                <div className="h-2 w-28 rounded-full bg-slate-200" />
            </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2">
            <div className="h-8 rounded-2xl bg-slate-100" />
            <div className="h-8 rounded-2xl bg-slate-100" />
        </div>
    </div>
)

const ActionsMockup: MockupComponent = () => (
    <div className="flex h-full w-full flex-col gap-3 p-4">
        <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                <FileText className="h-4 w-4 text-slate-600" />
            </div>
            <div className="h-2 w-28 rounded-full bg-slate-200" />
        </div>

        <div className="space-y-3">
            <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded-2xl border border-slate-300 bg-white" />
                <div className="h-2 w-36 rounded-full bg-slate-200" />
            </div>
            <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded-2xl border border-slate-300 bg-white" />
                <div className="h-2 w-28 rounded-full bg-slate-200" />
            </div>
            <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded-2xl border border-slate-300 bg-white" />
                <div className="h-2 w-32 rounded-full bg-slate-200" />
            </div>
        </div>

        <div className="mt-auto flex gap-2">
            <div className="h-6 w-16 rounded-full bg-slate-100" />
            <div className="h-6 w-20 rounded-full bg-slate-100" />
        </div>
    </div>
)

const FeatureMockup = ({ children }: { children: ReactNode }) => (
    <div className="relative mt-auto w-full overflow-hidden rounded-2xl bg-slate-100 aspect-[4/3]">
        <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200">
            {children}
        </div>
    </div>
)

const defaultFeatures: FeatureWithLocalMockup[] = [
    {
        number: 1,
        title: 'Smart Dashboard',
        description:
            'View all your key metrics in one place. Monitor performance, track progress, and make data-driven decisions with ease.',
        mockupImage: '/assets/dashboard-mockup.png',
        mockupAlt: 'Dashboard showing key metrics',
        mockup: SummaryMockup,
    },
    {
        number: 2,
        title: 'Team Collaboration',
        description:
            'Work together seamlessly. Share updates, assign tasks, and keep everyone aligned in real time.',
        mockupImage: '/assets/collaboration-mockup.png',
        mockupAlt: 'Team collaboration interface',
        mockup: FindingsMockup,
    },
    {
        number: 3,
        title: 'Analytics & Reports',
        description:
            'Generate comprehensive reports with actionable insights. Always stay informed and in control.',
        mockupImage: '/assets/analytics-mockup.png',
        mockupAlt: 'Analytics dashboard',
        mockup: ActionsMockup,
    },
]

const renderTitle = (title: string, titleDecorator: ReactNode) => {
    if (!title) return null
    if (!titleDecorator || !title.includes('workflow')) return title

    const [before, after] = title.split('workflow')
    return (
        <>
            {before}
            <span className="mx-2 inline-block">{titleDecorator}</span>
            workflow{after}
        </>
    )
}

export const FeatureSectionVariant03 = ({
    title = 'A complete toolkit to streamline your workflow',
    titleDecorator,
    badge = { text: 'Solutions', icon: <Settings className="h-4 w-4" /> },
    features = defaultFeatures,
    className,
}: FeaturesSectionVariant03Props) => {
    return (
        <section id="features" className={cn('bg-slate-50', className)}>
            <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24 lg:py-32">
                <div className="mb-16 space-y-4 text-center">
                    {badge ? (
                        <Badge className="mb-2 inline-flex items-center gap-2 bg-transparent px-3 py-2 text-sm font-medium text-primary border border-primary border-dashed">
                            {badge.icon ?? null}
                            {badge.text}
                        </Badge>
                    ) : null}

                    {title ? (
                        <h2 className="mx-auto max-w-4xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
                            {renderTitle(title, titleDecorator)}
                        </h2>
                    ) : null}
                </div>

                <div className="grid grid-cols-1  gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => {
                        const Mockup = feature.mockup
                        const key = feature.number ?? feature.title
                        const Icon = feature.icon ?? Zap

                        return (
                            <article
                                key={key}
                                className={cn(
                                    'group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl',
                                    feature.className,
                                )}
                            >
                                {feature.number ? (
                                    <div className="mb-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-900">
                                        {feature.number}
                                    </div>
                                ) : null}

                                <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-105">
                                    <Icon className="h-6 w-6 text-primary" />
                                </div>

                                <h3 className="mb-3 text-xl font-bold text-slate-900 md:text-2xl">
                                    {feature.title}
                                </h3>

                                <p className="mb-6 text-sm leading-relaxed text-slate-600 md:text-base">
                                    {feature.description}
                                </p>

                                {feature.mockupImage ? (
                                    <FeatureMockup>{Mockup ? <Mockup /> : null}</FeatureMockup>
                                ) : null}
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
