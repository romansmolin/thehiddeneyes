import { ReactNode } from 'react'

export type TestimonialsVariant = 'variant-01' | 'variant-02' | 'variant-03'

export type TestimonialPlatform = 'twitter' | 'producthunt'

export interface Testimonial {
    content: ReactNode
    author: string
    handle: string
    avatar: string
    platform: TestimonialPlatform
    image?: string
}

export interface TestimonialsSectionProps {
    variant?: TestimonialsVariant
    title?: string
    subtitle?: string
    badge?: string
    testimonials?: Testimonial[]
    className?: string
}
