import type { PricingPlan, BillingToggle } from '../model/types'

export const defaultPlans: PricingPlan[] = [
    {
        id: 'starter',
        name: 'Starter Pack',
        price: 10,
        currency: 'EUR',
        description: 'Perfect for trying out the platform.',
        credits: 5,
        features: [
            { title: '5 credits included' },
            { title: 'Basic support' },
            { title: 'Core features' },
        ],
        ctaLabel: 'Get Started',
    },
    {
        id: 'pro',
        name: 'Pro Pack',
        price: 25,
        currency: 'EUR',
        description: 'Best for regular users who need more capacity.',
        credits: 25,
        isPopular: true,
        label: 'Popular',
        features: [
            { title: '25 credits included' },
            { title: 'Priority support' },
            { title: 'All features', tooltip: 'Access to every feature on the platform' },
            { title: 'API access' },
        ],
        ctaLabel: 'Buy Credits',
    },
    {
        id: 'enterprise',
        name: 'Enterprise Pack',
        price: 50,
        currency: 'EUR',
        description: 'For power users and teams with high-volume needs.',
        credits: 50,
        label: 'Best Value',
        features: [
            { title: '50 credits included' },
            { title: 'Dedicated support' },
            { title: 'All features' },
            { title: 'API access' },
            { title: 'Custom integrations', tooltip: 'We help you integrate with your stack' },
        ],
        ctaLabel: 'Buy Credits',
    },
]

export const defaultBillingToggle: BillingToggle = {
    monthly: 'Monthly',
    yearly: 'Yearly',
    yearlyDiscount: 20,
}
