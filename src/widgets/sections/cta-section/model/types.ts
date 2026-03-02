import { ReactNode } from 'react'

export type CtaVariant = 'variant-01' | 'variant-02' | 'variant-03'

export interface CtaButton {
    label: string
    href: string
    icon?: ReactNode
    variant?: 'default' | 'outline' | 'ghost'
}

export interface CtaSectionProps {
    variant?: CtaVariant
    badge?: string
    title?: string
    description?: string
    primaryButton?: CtaButton
    secondaryButton?: CtaButton
    className?: string
}
