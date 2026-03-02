export const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
]

export const floatingChips = [
    {
        label: 'Find Your Match',
        color: 'orange' as const,
        position: { top: '15%', left: '8%' },
        rotation: -12,
    },
    {
        label: 'Real Connections',
        color: 'blue' as const,
        position: { top: '5%', right: '25%' },
        rotation: 8,
    },
    {
        label: 'Start Dating',
        color: 'purple' as const,
        position: { top: '45%', right: '5%' },
        rotation: 15,
    },
]

export const heroContent = {
    headlineLine1: 'Find Someone Who',
    headlineLine2: 'Gets You',
    subtitle: 'A dating platform built around compatibility, values, and real conversation.',
    primaryCta: {
        label: 'Create Your Profile',
        href: '/auth',
    },
    secondaryCta: {
        label: 'Learn More',
        href: '#features',
    },
}

export const mockupCards = [
    {
        id: 'overview',
        title: 'New Matches',
        subtitle: 'Today',
        value: '12',
        trend: '3 mutual interests',
    },
    {
        id: 'explore',
        title: 'Discover people',
        subtitle: 'who share your values.',
    },
    {
        id: 'insights',
        title: 'Compatibility score',
        subtitle: '94% match',
    },
]
