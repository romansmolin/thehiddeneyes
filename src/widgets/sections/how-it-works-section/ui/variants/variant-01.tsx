import { cn } from '@/shared/lib/css/utils'
import { HowItWorksStep } from '../../model/types'
import { Image, Wand2, Download } from 'lucide-react'

interface Props {
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
        title: 'Upload Your Files',
        description:
            'Select the files you want to process. Multiple formats are supported for your convenience.',
        icon: <Image className="h-10 w-10 text-foreground" />,
    },
    {
        title: 'Configure Settings',
        description:
            'Choose your preferred options and configurations. Customize the output to match your needs.',
        icon: <Wand2 className="h-10 w-10 text-foreground" />,
    },
    {
        title: 'Download Results',
        description:
            'Get your processed files in high quality, ready to use in your projects.',
        icon: <Download className="h-10 w-10 text-foreground" />,
    },
]

export function HowItWorksVariant01({ title, subtitle, steps = defaultSteps, className }: Props) {
    const fallbackIcons = [
        <Image key="image" className="h-10 w-10 text-foreground" />,
        <Wand2 key="wand" className="h-10 w-10 text-foreground" />,
        <Download key="download" className="h-10 w-10 text-foreground" />,
    ]
    return (
        <section
            className={cn('w-full py-16 md:py-24 lg:py-32 bg-background', className)}
            id="how-it-works"
        >
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-24">
                    <h2 className="text-3xl font-bold text-primary tracking-tighter sm:text-4xl md:text-5xl text-foreground">
                        {title || 'How It Works'}
                    </h2>
                    <p className="max-w-175 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        {subtitle ||
                            'Three simple steps to get started. No technical skills required.'}
                    </p>
                </div>

                <div className="relative flex flex-col gap-12 md:gap-24">
                    {/* Vertical line for mobile */}
                    <div className="absolute left-4.75 top-4 bottom-4 w-0.5 bg-border md:hidden" />

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="grid md:grid-cols-2 gap-8 md:gap-12 items-start relative"
                        >
                            {/* Text Side */}
                            <div className="flex gap-6 md:gap-8 relative z-10">
                                {/* Number Badge */}
                                <div className="flex-none">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border text-foreground font-bold shadow-sm relative z-10">
                                        {index + 1}
                                    </div>
                                    {/* Vertical line connection for desktop */}
                                    {index !== steps.length - 1 && (
                                        <div className="hidden md:block absolute top-10 left-[19px] w-0.5 h-[calc(100%+19rem)] bg-border -z-10" />
                                    )}
                                </div>

                                <div className="flex flex-col gap-2 pt-1">
                                    <h3 className="text-xl md:text-2xl font-bold text-foreground">
                                        {step.title}
                                    </h3>
                                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Image/Visual Side */}
                            <div className="flex justify-center md:justify-end w-full pl-16 md:pl-0">
                                <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl border border-border bg-card/50 shadow-sm flex items-center justify-center p-8 overflow-hidden group hover:border-primary/50 transition-colors duration-500">
                                    {/* Decorative background grid */}
                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                                    {/* Main Icon/Graphic */}
                                    <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500 ease-out p-6 rounded-2xl bg-background border border-border shadow-lg">
                                        {step.icon ?? fallbackIcons[index % fallbackIcons.length]}
                                    </div>

                                    {/* Decorative accents */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
