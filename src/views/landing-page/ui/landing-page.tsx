'use client'

import { HeroSection } from '@/widgets/sections/hero-section'
import { FeatureSection } from '@/widgets/sections/features-section'
import { ContentSection } from '@/widgets/sections/content-section'
import { SocialProofSection } from '@/widgets/sections/social-proof-section'
import { PricingSection } from '@/widgets/sections/pricing-section'
import { HowItWorksSection } from '@/widgets/sections/how-it-works-section'
import { TestimonialsSection } from '@/widgets/sections/testimonials-section'
import { CtaSection } from '@/widgets/sections/cta-section'

import { navItems, floatingChips } from '@/widgets/sections/hero-section/lib/hero-section.mock'
import {
    featuresVariant01,
    featuresVariant02,
    defaultVisualStats,
} from '@/widgets/sections/features-section/lib/features-section.mock'
import {
    defaultImage,
    defaultFeatures,
    defaultCta,
} from '@/widgets/sections/content-section/lib/content-section.mock'
import {
    defaultStats,
    defaultLogos,
} from '@/widgets/sections/social-proof-section/lib/social-proof-section.mock'
import { defaultPlans } from '@/widgets/sections/pricing-section/lib/pricing-section.mock'
import { FaqSection } from '@/widgets/sections'
import { AboutSection } from '@/widgets/sections/about-section'

const heroContentVariant07 = {
    headlineLine1: 'Find Someone Who Actually',
    headlineLine2: 'Gets You',
    subtitle:
        'TheHiddenEyes is a dating platform built around values, compatibility, and real conversation — so meaningful connections happen naturally.',
    primaryCta: {
        label: 'Start Meeting People',
        href: '#how-it-works',
    },
    secondaryCta: {
        label: 'Create Your Profile',
        href: '/auth',
    },
}

export function LandingPage() {
    return (
        <div className="space-y-16 md:space-y-24">
            <HeroSection
                variant="variant-07"
                navItems={navItems}
                floatingChips={floatingChips}
                content={heroContentVariant07}
                badge="TheHiddenEyes"
                badgeIcon="wallet"
                rating={4.9}
                userAvatars={[
                    'https://api.dicebear.com/7.x/avataaars/png?seed=User1',
                    'https://api.dicebear.com/7.x/avataaars/png?seed=User2',
                    'https://api.dicebear.com/7.x/avataaars/png?seed=User3',
                ]}
                dashboardCards={[
                    {
                        id: 'metric-1',
                        title: 'Active Members',
                        value: '24,500',
                        subtitle: 'Looking for love',
                        metric: '+18%',
                    },
                    {
                        id: 'metric-2',
                        title: 'Matches Made',
                        value: '8,320',
                        subtitle: 'Last 30 days',
                    },
                    {
                        id: 'metric-3',
                        title: 'Compatibility',
                        value: '94.2%',
                        subtitle: 'Match accuracy',
                    },
                    {
                        id: 'metric-4',
                        title: 'Conversations',
                        value: '12,840',
                        subtitle: 'This month',
                        metric: '+22%',
                    },
                ]}
            />

            <SocialProofSection variant="variant-01" stats={defaultStats} logos={defaultLogos} />

            <AboutSection variant="variant-01" />

            <AboutSection
                variant="variant-02"
                title="Made for People Who Want More"
                subtitle="A dating platform for people who are done with shallow swiping and ready for something real."
            />

            <FeatureSection variant="variant-05" />

            <TestimonialsSection variant="variant-03" />

            <FaqSection variant="variant-03" />

            <CtaSection variant="variant-03" />
        </div>
    )
}
