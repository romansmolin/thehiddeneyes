import { ReactNode, ComponentType } from 'react'
import { LucideProps } from 'lucide-react'

export type FeaturesVariant = 'variant-01' | 'variant-02' | 'variant-03' | 'variant-04' | 'variant-05'

export interface Feature {
    title: string
    description: string
    icon?: ComponentType<LucideProps>
    className?: string
}

export interface FeatureWithMockup extends Feature {
    number?: number
    mockupImage?: string
    mockupAlt?: string
}

export interface FeaturesSectionProps {
    variant?: FeaturesVariant
    title?: string
    subtitle?: string
    titleDecorator?: ReactNode
    titleDecoratorPosition?: 'before' | 'after'
    badge?: {
        icon?: ReactNode
        text: string
    }
    visualStats?: {
        label: string
        value: string
        caption?: string
    }[]
    features?: FeatureWithMockup[]
    className?: string
}
