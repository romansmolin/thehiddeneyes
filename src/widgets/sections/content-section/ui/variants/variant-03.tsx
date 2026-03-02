'use client'

import * as React from 'react'
import { motion, useInView, type Variants } from 'motion/react'
import { Zap } from 'lucide-react'
import { cn } from '@/shared/lib/css/utils'

interface ContentVariant03Props {
    title?: string
    titleHighlights?: { word: string; color: string }[]
    subtitle?: string
    calloutLabel?: string
    calloutValue?: string
    ctaLabel?: string
    className?: string
}

type TimelineTag = 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'button'

type TimelineContentProps<T extends TimelineTag = 'div'> = {
    as?: T
    animationNum?: number
    timelineRef: React.RefObject<Element | null>
    customVariants?: Variants
    className?: string
    children: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, 'children' | 'className'>

const motionComponents = {
    div: motion.div,
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
    p: motion.p,
    span: motion.span,
    button: motion.button,
} as const

function TimelineContent<T extends TimelineTag = 'div'>({
    as = 'div' as T,
    animationNum = 0,
    timelineRef,
    customVariants,
    className,
    children,
    ...props
}: TimelineContentProps<T>) {
    const isInView = useInView(timelineRef, { once: true, amount: 0.25 })
    const MotionComponent = motionComponents[as] as React.ElementType

    return (
        <MotionComponent
            variants={customVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={animationNum}
            className={className}
            {...(props as Record<string, unknown>)}
        >
            {children}
        </MotionComponent>
    )
}

const defaultHighlights = [
    { word: 'rethinking', color: 'blue' },
    { word: 'trust', color: 'orange' },
    { word: 'results', color: 'green' },
]

const colorClasses: Record<string, string> = {
    blue: 'border-blue-500 text-blue-600',
    orange: 'border-orange-500 text-orange-600',
    green: 'border-green-500 text-green-600',
    purple: 'border-purple-500 text-purple-600',
    pink: 'border-pink-500 text-pink-600',
}

export function ContentVariant03({
    title = 'We are rethinking how products should work to build trust and deliver results.',
    titleHighlights = defaultHighlights,
    subtitle = 'Our goal is to build meaningful experiences at every step.',
    calloutLabel = 'We help people',
    calloutValue = 'achieve their goals',
    ctaLabel = 'Learn more',
    className,
}: ContentVariant03Props) {
    const heroRef = React.useRef<HTMLDivElement>(null)

    const revealVariants: Variants = {
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            transition: { delay: i * 1.5, duration: 0.7 },
        }),
        hidden: { filter: 'blur(10px)', y: 40, opacity: 0 },
    }

    const textVariants: Variants = {
        visible: (i: number) => ({
            filter: 'blur(0px)',
            opacity: 1,
            transition: { delay: i * 0.3, duration: 0.7 },
        }),
        hidden: { filter: 'blur(10px)', opacity: 0 },
    }

    const highlightMap = Object.fromEntries(titleHighlights.map((h) => [h.word, h.color]))
    const words = title.split(' ')

    const renderedTitle: React.ReactNode[] = []
    let animIndex = 0
    let buffer = ''
    let bufferStart = 0

    for (let i = 0; i <= words.length; i++) {
        const word = words[i] ?? ''
        const cleanWord = word.replace(/[.,!?]$/g, '')

        if (highlightMap[cleanWord] && i < words.length) {
            if (buffer) {
                renderedTitle.push(
                    <TimelineContent
                        key={`text-${bufferStart}`}
                        as="h1"
                        animationNum={animIndex++}
                        timelineRef={heroRef as React.RefObject<Element | null>}
                        customVariants={revealVariants}
                        className="mb-8 text-2xl font-semibold text-gray-900 !leading-[110%] sm:text-4xl md:text-5xl"
                    >
                        {buffer.trim()}{' '}
                    </TimelineContent>,
                )
                buffer = ''
            }
            const color = highlightMap[cleanWord]!
            renderedTitle.push(
                <TimelineContent
                    key={`highlight-${i}`}
                    as="span"
                    animationNum={animIndex++}
                    timelineRef={heroRef as React.RefObject<Element | null>}
                    customVariants={textVariants}
                    className={cn(
                        'inline-block rounded-2xl border-2 border-dotted px-2 xl:h-16',
                        colorClasses[color],
                    )}
                >
                    {cleanWord}
                </TimelineContent>,
            )
            buffer = word.includes('.') || word.includes(',') ? word.slice(cleanWord.length) : ' '
            bufferStart = i + 1
        } else {
            buffer += (buffer && !buffer.endsWith(' ') ? ' ' : '') + word
        }
    }

    return (
        <section className={cn('w-full bg-gray-50 px-4 py-28', className)}>
            <div className="mx-auto max-w-6xl" ref={heroRef}>
                <div className="flex flex-col items-start gap-8 lg:flex-row">
                    <div className="flex-1">
                        <div className="mb-8 text-2xl font-semibold text-gray-900 !leading-[110%] sm:text-4xl md:text-5xl">
                            {words.map((word, i) => {
                                const cleanWord = word.replace(/[.,!?]$/g, '')
                                const suffix = word.slice(cleanWord.length)
                                if (highlightMap[cleanWord]) {
                                    const color = highlightMap[cleanWord]!
                                    return (
                                        <React.Fragment key={i}>
                                            <TimelineContent
                                                as="span"
                                                animationNum={i}
                                                timelineRef={heroRef as React.RefObject<Element | null>}
                                                customVariants={textVariants}
                                                className={cn(
                                                    'inline-block rounded-2xl border-2 border-dotted px-2 xl:h-16',
                                                    colorClasses[color],
                                                )}
                                            >
                                                {cleanWord}
                                            </TimelineContent>
                                            {suffix}{' '}
                                        </React.Fragment>
                                    )
                                }
                                return <React.Fragment key={i}>{word} </React.Fragment>
                            })}
                        </div>

                        <div className="mt-12 flex justify-between gap-2">
                            <TimelineContent
                                as="div"
                                animationNum={titleHighlights.length + 1}
                                timelineRef={heroRef as React.RefObject<Element | null>}
                                customVariants={textVariants}
                                className="mb-4 text-xs sm:text-xl"
                            >
                                <div className="mb-1 capitalize font-medium text-gray-900">
                                    {calloutLabel}
                                </div>
                                <div className="font-semibold text-gray-600 uppercase">
                                    {calloutValue}
                                </div>
                            </TimelineContent>

                            <TimelineContent
                                as="button"
                                animationNum={titleHighlights.length + 2}
                                timelineRef={heroRef as React.RefObject<Element | null>}
                                customVariants={textVariants}
                                className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-blue-600 px-4 text-sm font-medium text-white shadow-lg shadow-blue-600"
                            >
                                <Zap fill="white" size={16} />
                                {ctaLabel}
                            </TimelineContent>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
