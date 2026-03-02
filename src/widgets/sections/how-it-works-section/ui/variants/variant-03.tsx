import { cn } from '@/shared/lib/css/utils'
import Image from 'next/image'
import { HowItWorksStep } from '../../model/types'

interface HowItWorksVariant03Props {
    title?: string
    titleHighlight?: string
    subtitle?: string
    steps?: HowItWorksStep[]
    imageSrc?: string
    imageAlt?: string
    className?: string
}

const defaultSteps: HowItWorksStep[] = [
    {
        title: 'Create your profile',
        description:
            'Share your values, lifestyle, and goals so we can understand what truly matters to you.',
    },
    {
        title: 'Get curated matches',
        description:
            'We highlight people with strong compatibility so every match is intentional from the start.',
    },
    {
        title: 'Start meaningful chats',
        description:
            'Use guided prompts to move beyond small talk and begin conversations that feel natural.',
    },
    {
        title: 'Meet with confidence',
        description:
            'Built-in safety tools and clear intentions help you connect with more trust and less guesswork.',
    },
]

export function HowItWorksVariant03({
    title = 'How it works',
    titleHighlight = 'it works',
    subtitle = 'A simpler way to meet people who truly fit your life.',
    steps = defaultSteps,
    imageSrc = '/assets/how-it-works.png',
    imageAlt = 'How it works preview',
    className,
}: HowItWorksVariant03Props) {
    const displaySteps = steps.slice(0, 4)
    const leftSteps = displaySteps.slice(0, 2)
    const rightSteps = displaySteps.slice(2, 4)
    const titleParts = title.split(titleHighlight)

    return (
        <section className={cn('container mx-auto', className)} id="how-it-works">
            <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                <div className="flex justify-between items-center gap-8 mb-12 md:mb-20">
                    <div>
                        <h2 className="text-3xl font-extrabold uppercase leading-tight sm:text-4xl lg:text-5xl">
                            {titleParts[0]}
                            <span className="text-primary">{titleHighlight}</span>
                            {titleParts[1]}
                        </h2>
                    </div>
                    <div className="flex items-start md:items-center">
                        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                            {subtitle}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-center">
                    {/* Left Column - Steps 01 & 02 */}
                    <div className="flex-1 flex flex-col justify-center gap-12 md:gap-16 lg:gap-20 w-full">
                        {leftSteps.map((step, index) => (
                            <div key={index} className="space-y-2">
                                <div className="text-xs font-bold text-slate-400 tracking-wider">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <h3 className="text-base md:text-lg font-bold text-slate-900">
                                    {step.title}
                                </h3>
                                <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-xs">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Center Column - Visual */}
                    <div className="shrink-0 w-full md:w-auto">
                        <div className="relative w-full md:w-70 lg:w-[320px] xl:w-90 aspect-3/4 rounded-2xl overflow-hidden shadow-2xl mx-auto">
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                fill
                                className="object-cover"
                                priority={false}
                            />
                        </div>
                    </div>

                    {/* Right Column - Steps 03 & 04 */}
                    <div className="flex-1 flex flex-col justify-center gap-12 md:gap-16 lg:gap-20 w-full md:items-end">
                        {rightSteps.map((step, index) => (
                            <div key={index} className="space-y-2 md:text-right">
                                <div className="text-xs font-bold text-slate-400 tracking-wider">
                                    {String(index + 3).padStart(2, '0')}
                                </div>
                                <h3 className="text-base md:text-lg font-bold text-slate-900">
                                    {step.title}
                                </h3>
                                <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-xs md:ml-auto">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
