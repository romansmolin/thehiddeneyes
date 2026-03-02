import { Button } from '@/shared/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import type { HeroVariantProps } from '../../model/types'
import { cn } from '@/shared/lib/css/utils'
import Link from 'next/link'

const BrushStroke = ({
    color = '#3B82F6',
    className = '',
}: {
    color?: string
    className?: string
}) => (
    <svg
        className={`absolute -bottom-2 left-0 w-full h-3 md:h-5 ${className}`}
        viewBox="0 0 200 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
    >
        <path
            d="M5 15C50 12 100 18 150 10C180 5 195 15 195 15"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export const HeroVariant02 = ({ content, className }: HeroVariantProps) => {
    return (
        <section
            className={cn(
                'relative min-h-svh bg-[#020617] text-white overflow-hidden flex flex-col',
                className,
            )}
        >
            <div className="relative flex flex-col items-center justify-start pt-16 md:pt-24 px-4 z-10">
                <h1 className="text-5xl sm:text-7xl md:text-[100px] lg:text-[120px] font-bold text-center leading-[0.9] tracking-tight mb-8">
                    <span className="relative inline-block">
                        {content.headlineLine1}
                        <BrushStroke color="#3B82F6" className="w-full left-0 opacity-80" />
                    </span>
                    <br />
                    <span className="relative inline-block mt-2">{content.headlineLine2}</span>
                </h1>

                <p className="text-lg md:text-2xl text-zinc-400 font-medium mb-10 text-center max-w-2xl leading-relaxed">
                    {content.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center mb-20">
                    <Button asChild className="h-14">
                        <Link href={content.primaryCta.href}>
                            {content.primaryCta.label}
                            <span className="rounded-full bg-black p-2">
                                <ArrowRight className="w-5 h-5 text-white" />
                            </span>
                        </Link>
                    </Button>
                    <Button asChild variant={'ghost'} className="h-14 border border-dashed">
                        <Link href={content.secondaryCta.href}>{content.secondaryCta.label}</Link>
                    </Button>
                </div>
            </div>

            <div className="relative h-100 w-full max-w-350 mx-auto mt-auto z-20 translate-y-32">
                {/* Card 1 */}
                <div className="absolute left-4 md:left-[15%] bottom-24 w-70 md:w-[320px] h-100 md:h-112.5 bg-white rounded-2xl p-6 text-black transform -rotate-12 shadow-2xl hover:rotate-0 hover:z-30 transition-all duration-500 hover:scale-105 origin-bottom-right border border-zinc-100 flex flex-col">
                    <div className="flex-1 rounded-2xl overflow-hidden bg-zinc-100 relative group">
                        <Image
                            width={400}
                            height={500}
                            src="/assets/placeholder-1.png"
                            alt="Preview image"
                            className="size-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold">
                                Before
                            </span>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="absolute right-4 md:right-[15%] bottom-12 w-70 md:w-[320px] h-100 md:h-112.5 bg-white rounded-2xl p-6 text-black transform rotate-12 shadow-2xl hover:rotate-0 hover:z-30 transition-all duration-500 hover:scale-105 origin-bottom-right border border-zinc-100 flex flex-col">
                    <div className="flex-1 rounded-2xl overflow-hidden bg-zinc-100 relative group">
                        <Image
                            width={400}
                            height={500}
                            src="/assets/placeholder-2.png"
                            alt="Preview image"
                            className="size-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold">
                                After
                            </span>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="absolute left-4 md:left-[55%] bottom-24 w-70 md:w-[320px] h-100 md:h-112.5 bg-white rounded-2xl p-6 text-black transform -rotate-12 shadow-2xl hover:rotate-0 hover:z-30 transition-all duration-500 hover:scale-105 origin-bottom-right border border-zinc-100 flex flex-col">
                    <div className="flex-1 rounded-2xl overflow-hidden bg-zinc-100 relative group">
                        <Image
                            width={400}
                            height={500}
                            src="/assets/placeholder-3.png"
                            alt="Preview image"
                            className="size-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold">
                                Before
                            </span>
                        </div>
                    </div>
                </div>

                <div className="absolute left-4 md:left-[25%] bottom-7 w-70 md:w-[320px] h-100 md:h-112.5 bg-white rounded-2xl p-6 text-black transform rotate-18 shadow-2xl hover:rotate-0 hover:z-30 transition-all duration-500 hover:scale-105 origin-bottom-right border border-zinc-100 flex flex-col">
                    <div className="flex-1 rounded-2xl overflow-hidden bg-zinc-100 relative group">
                        <Image
                            width={400}
                            height={500}
                            src="/assets/placeholder-4.png"
                            alt="Preview image"
                            className="size-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold">
                                After
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
