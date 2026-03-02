export type AboutVariant = 'variant-01' | 'variant-02'

export type AboutCardVariant = 'outline' | 'filled'

export interface AboutSectionCard {
    title: string
    description: string
    variant?: AboutCardVariant
}

export interface AboutSectionImage {
    src: string
    alt: string
}

export interface AboutSectionDefaults {
    badge: string
    title: string
    subtitle: string
    image: AboutSectionImage
    cards: AboutSectionCard[]
}

export interface AboutSectionProps {
    variant?: AboutVariant
    title?: string
    subtitle?: string
    className?: string
}

export interface AboutVariantProps extends Omit<AboutSectionProps, 'variant'> {
    title: string
    subtitle: string
    badge: string
    image: AboutSectionImage
    cards: AboutSectionCard[]
}
