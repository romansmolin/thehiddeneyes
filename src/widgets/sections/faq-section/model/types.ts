export type FaqVariant = 'variant-01' | 'variant-02' | 'variant-03'

export interface FaqItem {
    question: string
    answer: string
}

export interface FaqSectionProps {
    variant?: FaqVariant
    title?: string
    subtitle?: string
    badge?: string
    faqs?: FaqItem[]
    cta?: { label: string; href: string }
    className?: string
}
