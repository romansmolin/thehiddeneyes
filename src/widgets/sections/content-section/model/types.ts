import { ReactNode } from 'react'

export type ContentVariant = 'variant-01' | 'variant-02' | 'variant-03'

export interface ContentFeature {
    title: string
    description: string
    icon?: ReactNode
}

export interface ContentImage {
    src: string
    alt: string
}

export interface ContentCta {
    label: string
    href: string
}

export interface ContentSectionProps {
    variant?: ContentVariant
    title?: string
    subtitle?: string
    body?: string | ReactNode
    image?: ContentImage
    imagePosition?: 'left' | 'right'
    features?: ContentFeature[]
    cta?: ContentCta
    className?: string
}

export interface ContentVariantProps extends ContentSectionProps {
    image: ContentImage
}
