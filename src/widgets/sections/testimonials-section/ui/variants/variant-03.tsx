'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Badge } from '@/shared/ui/badge'
import { Testimonial } from '../../model/types'
import { cn } from '@/shared/lib/css/utils'
import Image from 'next/image'

interface TestimonialsVariant03Props {
    title?: string
    subtitle?: string
    badge?: string
    testimonials?: Testimonial[]
    className?: string
}

const defaultTestimonials: Testimonial[] = [
    {
        content:
            'I was tired of endless browsing. This platform helped me find someone who shared my values, and our first conversation felt effortless.',
        author: 'Briana Patton',
        handle: 'Member',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        platform: 'twitter',
    },
    {
        content:
            'The profile prompts are actually useful. They made it easy to talk about real priorities instead of just small talk.',
        author: 'Bilal Ahmed',
        handle: 'Member',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        platform: 'twitter',
    },
    {
        content:
            'I appreciate the safety tools and verified profiles. I feel more comfortable here than on other platforms.',
        author: 'Saman Malik',
        handle: 'Verified User',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        platform: 'twitter',
    },
    {
        content:
            'Fewer but better results, which saves time and makes every interaction feel more intentional.',
        author: 'Omar Raza',
        handle: 'Busy Professional',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        platform: 'twitter',
    },
    {
        content:
            'I matched with someone who wanted the same kind of relationship I do. That clarity changed everything for me.',
        author: 'Zainab Hussain',
        handle: 'Long-term Seeker',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
        platform: 'twitter',
    },
    {
        content:
            'The app feels calm and thoughtful. I spend less time scrolling and more time having meaningful conversations.',
        author: 'Aliza Khan',
        handle: 'Member',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
        platform: 'twitter',
    },
    {
        content:
            'Made things feel less random. The compatibility insights helped me understand who I should actually invest time in.',
        author: 'Farhan Siddiqui',
        handle: 'Thoughtful User',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
        platform: 'twitter',
    },
    {
        content:
            'After one week, I had two great conversations and one amazing first meeting. The quality difference is real.',
        author: 'Sana Sheikh',
        handle: 'Member',
        avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop',
        platform: 'twitter',
    },
    {
        content:
            'I like that people show their intentions upfront. It helped me avoid mismatches and focus on genuine connections.',
        author: 'Hassan Ali',
        handle: 'Intentional User',
        avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop',
        platform: 'twitter',
    },
]

export const TestimonialsVariant03 = ({
    title = 'What our users say',
    subtitle = 'Real stories from people building meaningful connections.',
    badge = 'Testimonials',
    testimonials = defaultTestimonials,
    className,
}: TestimonialsVariant03Props) => {
    const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2))
    const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2))

    return (
        <section
            className={cn('w-full overflow-hidden', className)}
            id="testimonials"
        >
            <div className="z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="mx-auto flex max-w-135 flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
                >
                    {badge && <Badge className="px-3 py-2 text-sm font-medium">{badge}</Badge>}

                    <h2 className="mt-5 text-center font-serif text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl lg:leading-16">
                        {title}
                    </h2>
                    <p className="mt-5 text-center text-muted-foreground">{subtitle}</p>
                </motion.div>

                <div className="mt-10 flex flex-col gap-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <MarqueeRow testimonials={firstRow} direction="left" duration={30} />
                    <MarqueeRow testimonials={secondRow} direction="right" duration={35} />
                </div>
            </div>
        </section>
    )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <div className="w-80 shrink-0 rounded-2xl border bg-card p-6 shadow-lg shadow-primary/10">
            <div className="text-sm leading-relaxed text-muted-foreground">
                {testimonial.content}
            </div>
            <div className="mt-5 flex items-center gap-2">
                <Image
                    width={40}
                    height={40}
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="size-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                    <div className="text-sm font-medium leading-5 tracking-tight">
                        {testimonial.author}
                    </div>
                    <div className="text-sm leading-5 tracking-tight text-muted-foreground">
                        {testimonial.handle}
                    </div>
                </div>
            </div>
        </div>
    )
}

function MarqueeRow({
    testimonials,
    direction = 'left',
    duration = 30,
}: {
    testimonials: Testimonial[]
    direction?: 'left' | 'right'
    duration?: number
}) {
    return (
        <div className="flex overflow-hidden">
            <motion.div
                animate={{ x: direction === 'left' ? '-50%' : '0%' }}
                initial={{ x: direction === 'left' ? '0%' : '-50%' }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatType: 'loop',
                }}
                className="flex shrink-0 gap-6"
            >
                {[...testimonials, ...testimonials].map((testimonial, i) => (
                    <TestimonialCard key={`${testimonial.author}-${i}`} testimonial={testimonial} />
                ))}
            </motion.div>
        </div>
    )
}
