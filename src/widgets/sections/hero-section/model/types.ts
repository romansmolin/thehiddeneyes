export type HeroVariant =
    | 'variant-01'
    | 'variant-02'
    | 'variant-03'
    | 'variant-04'
    | 'variant-05'
    | 'variant-06'
    | 'variant-07'

export interface NavItem {
    label: string
    href: string
}

export interface FloatingChip {
    label: string
    color: 'orange' | 'blue' | 'purple'
    position: { top?: string; bottom?: string; left?: string; right?: string }
    rotation: number
}

export interface CtaButton {
    label: string
    href: string
}

export interface HeroContent {
    headlineLine1: string
    headlineLine2: string
    subtitle: string
    primaryCta: CtaButton
    secondaryCta: CtaButton
}

export interface MockupCard {
    id: string
    title: string
    subtitle: string
    value?: string
    trend?: string
}

export interface HeroDashboardCard {
    id: string
    title: string
    value: string
    subtitle?: string
    metric?: string
}

export interface HeroSectionProps {
    variant?: HeroVariant
    navItems?: NavItem[]
    floatingChips?: FloatingChip[]
    content?: HeroContent
    mockupCards?: MockupCard[]
    dashboardCards?: HeroDashboardCard[]
    className?: string
    badge?: string
    badgeIcon?: 'wallet' | 'card' | 'star'
    userAvatars?: string[]
    rating?: number
    images?: {
        cardHand?: string
        notification?: string
        amount?: string
        phoneHand?: string
    }
}

export type HeroVariantProps = Omit<HeroSectionProps, 'variant' | 'content'> & {
    content: HeroContent
}
