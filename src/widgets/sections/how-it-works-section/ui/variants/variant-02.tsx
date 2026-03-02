import { cn } from '@/shared/lib/css/utils'
import { HowItWorksStep } from '../../model/types'

interface Props {
    title?: string
    titleHighlight?: string
    subtitle?: string
    steps?: HowItWorksStep[]
    imageSrc?: string
    imageAlt?: string
    centerImage?: string
    centerImageAlt?: string
    className?: string
}

const defaultSteps: HowItWorksStep[] = [
    {
        title: 'Comprehensive Planning',
        description:
            'Work together on a thorough plan that reflects your goals, balancing design and budget needs.',
    },
    {
        title: 'Design & Development',
        description:
            'Our expert team collaborates to bring your vision to life with precision and creativity.',
    },
    {
        title: 'Review & Iterate',
        description:
            'Your project is refined to the highest standards. We keep you informed each step of the way.',
    },
    {
        title: 'Launch & Support',
        description:
            'Go live with confidence. We stay ready to answer questions and help solve issues.',
    },
]

export function HowItWorksVariant02({
    title = 'Turning Your Vision Into Reality, Simply!',
    subtitle = "Achieving great results shouldn't be stressful. A clear process brings peace to make your journey effortless and rewarding.",
    steps = defaultSteps,
    className,
}: Props) {
    return (
        <section
            className={cn('w-full py-12 md:py-24 lg:py-32 bg-white', className)}
            id="how-it-works"
        >
            <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="grid md:grid-cols-2 gap-8 mb-12 md:mb-20">
                    <div>
                        <h2 className="text-3xl text-primary sm:text-4xl md:text-[2.5rem] lg:text-[2.75rem] font-bold  tracking-tight leading-tight">
                            {title}
                        </h2>
                    </div>
                    <div className="flex items-start md:items-center">
                        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                            {subtitle}
                        </p>
                    </div>
                </div>

                {/* Three Column Flexbox Layout */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-center">
                    {/* Left Column - Steps 01 & 02 */}
                    <div className="flex-1 flex flex-col justify-center gap-12 md:gap-16 lg:gap-20 w-full">
                        {/* Step 01 */}
                        <div className="space-y-2">
                            <div className="text-xs font-bold text-slate-400 tracking-wider">
                                01
                            </div>
                            <h3 className="text-base md:text-lg font-bold text-slate-900">
                                {steps[0]?.title}
                            </h3>
                            <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-xs">
                                {steps[0]?.description}
                            </p>
                        </div>

                        {/* Step 02 */}
                        <div className="space-y-2">
                            <div className="text-xs font-bold text-slate-400 tracking-wider">
                                02
                            </div>
                            <h3 className="text-base md:text-lg font-bold text-slate-900">
                                {steps[1]?.title}
                            </h3>
                            <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-xs">
                                {steps[1]?.description}
                            </p>
                        </div>
                    </div>

                    {/* Center Column - Visual */}
                    <div className="flex-shrink-0 w-full md:w-auto">
                        <div className="w-full md:w-[280px] lg:w-[320px] xl:w-[360px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl mx-auto">
                            <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-200 p-6 flex flex-col">
                                <div className="flex items-center justify-between">
                                    <div className="text-xs uppercase tracking-wide text-slate-500">
                                        Project Overview
                                    </div>
                                    <div className="text-[10px] px-2 py-1 rounded-full bg-white text-slate-600 shadow-sm border border-slate-200">
                                        Live
                                    </div>
                                </div>

                                <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
                                    <div className="text-xs text-slate-500">Tasks completed</div>
                                    <div className="mt-2 text-3xl font-bold text-slate-900">
                                        148
                                    </div>
                                    <div className="mt-3 h-2 rounded-full bg-slate-100">
                                        <div className="h-2 w-4/5 rounded-full bg-primary/60" />
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    <div className="rounded-2xl bg-white border border-slate-200 p-3">
                                        <div className="text-[10px] text-slate-500">Milestones</div>
                                        <div className="text-lg font-bold text-slate-900">22</div>
                                    </div>
                                    <div className="rounded-2xl bg-white border border-slate-200 p-3">
                                        <div className="text-[10px] text-slate-500">Issues</div>
                                        <div className="text-lg font-bold text-slate-900">3</div>
                                    </div>
                                </div>

                                <div className="mt-auto rounded-2xl bg-white border border-slate-200 p-4">
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>Progress</span>
                                        <span className="text-emerald-600 font-semibold">98%</span>
                                    </div>
                                    <div className="mt-3 space-y-2">
                                        <div className="h-2 w-5/6 rounded-full bg-slate-200" />
                                        <div className="h-2 w-2/3 rounded-full bg-slate-200" />
                                        <div className="h-2 w-1/2 rounded-full bg-slate-200" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Steps 03 & 04 */}
                    <div className="flex-1 flex flex-col justify-center gap-12 md:gap-16 lg:gap-20 w-full md:items-end">
                        {/* Step 03 */}
                        <div className="space-y-2 md:text-right">
                            <div className="text-xs font-bold text-slate-400 tracking-wider">
                                03
                            </div>
                            <h3 className="text-base md:text-lg font-bold text-slate-900">
                                {steps[2]?.title}
                            </h3>
                            <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-xs md:ml-auto">
                                {steps[2]?.description}
                            </p>
                        </div>

                        {/* Step 04 */}
                        <div className="space-y-2 md:text-right">
                            <div className="text-xs font-bold text-slate-400 tracking-wider">
                                04
                            </div>
                            <h3 className="text-base md:text-lg font-bold text-slate-900">
                                {steps[3]?.title}
                            </h3>
                            <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-xs md:ml-auto">
                                {steps[3]?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
