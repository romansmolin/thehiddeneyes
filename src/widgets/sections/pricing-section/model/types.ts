export type PricingVariant = 'variant-01' | 'variant-02' | 'variant-03'

export interface PricingPlanFeature {
    title: string
    tooltip?: string
}

export interface PricingPlan {
    id: string
    name: string
    price: number
    currency: string
    description: string
    features: PricingPlanFeature[]
    credits?: number
    isPopular?: boolean
    label?: string
    ctaLabel?: string
}

export interface BillingToggle {
    monthly: string
    yearly: string
    yearlyDiscount?: number
}

export interface PricingSectionProps {
    variant?: PricingVariant
    title?: string
    subtitle?: string
    plans?: PricingPlan[]
    billingToggle?: BillingToggle
    onSelectPlan?: (plan: PricingPlan) => void
    className?: string
}

export interface PricingVariantProps extends PricingSectionProps {
    plans: PricingPlan[]
}
