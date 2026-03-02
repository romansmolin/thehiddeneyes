import { ReactNode } from 'react'

export type SocialProofVariant = 'variant-01' | 'variant-02'

export interface SocialProofStat {
    value: string
    label: string
    suffix?: string
}

export interface SocialProofLogo {
    src: string
    alt: string
    href?: string
}

export interface SocialProofSectionProps {
    variant?: SocialProofVariant
    title?: string
    stats?: SocialProofStat[]
    logos?: SocialProofLogo[]
    className?: string
    children?: ReactNode
}

export interface SocialProofVariantProps extends SocialProofSectionProps {
    stats: SocialProofStat[]
    logos: SocialProofLogo[]
}
