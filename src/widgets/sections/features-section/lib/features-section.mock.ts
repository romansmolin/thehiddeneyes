import { Zap, Shield, Wand2, Layers, Printer, Coins, Palette, Download, Image as ImageIcon } from 'lucide-react'
import type { Feature, FeatureWithMockup } from '../model/types'

export const featuresVariant01: Feature[] = [
    {
        title: 'Powerful Processing',
        description: 'Advanced algorithms deliver exceptional results quickly and reliably.',
        icon: Wand2,
        className: 'md:col-span-3',
    },
    {
        title: 'Secure & Private',
        description:
            'Your data is handled with enterprise-grade security and complete privacy protection.',
        icon: Shield,
        className: 'md:col-span-3',
    },
    {
        title: 'Lightning Fast',
        description: 'Get results in seconds with our optimized infrastructure.',
        icon: Zap,
        className: 'md:col-span-2',
    },
    {
        title: 'Multiple Options',
        description: 'Choose from various modes and configurations to fit your needs.',
        icon: Layers,
        className: 'md:col-span-2',
    },
    {
        title: 'Export Ready',
        description: 'Download your results in multiple formats for immediate use.',
        icon: Printer,
        className: 'md:col-span-2',
    },
    {
        title: 'Flexible Pricing',
        description:
            'Pay as you go with flexible credit packs. No subscriptions, just transparent pricing.',
        icon: Coins,
        className: 'md:col-span-6',
    },
]

export const featuresVariant02: Feature[] = [
    {
        icon: Zap,
        title: 'Lightning Fast',
        description:
            'Get high-quality results in under 60 seconds. Powered by optimized processing.',
    },
    {
        icon: Palette,
        title: 'Multiple Options',
        description:
            'Choose from various modes and configurations to match your specific needs perfectly.',
    },
    {
        icon: Shield,
        title: 'Privacy First',
        description:
            'Your data is yours. We auto-delete files after 7 days or you can remove them anytime.',
    },
    {
        icon: Download,
        title: 'High-Quality Export',
        description: 'Download results in multiple formats ready for professional use.',
    },
    {
        icon: Layers,
        title: 'No Subscriptions',
        description:
            'Pay only for what you use with flexible credit packs. No monthly commitments.',
    },
    {
        icon: ImageIcon,
        title: 'Premium Quality',
        description: 'Enterprise-grade processing with attention to detail and quality.',
    },
]

export const featuresVariant03: FeatureWithMockup[] = [
    {
        number: 1,
        title: 'Smart Dashboard',
        description:
            'View all your key metrics in one place. Monitor performance, track progress, and make data-driven decisions.',
        mockupImage: '/assets/dashboard-mockup.png',
        mockupAlt: 'Dashboard showing key metrics',
    },
    {
        number: 2,
        title: 'Team Collaboration',
        description:
            'Work together seamlessly. Share updates, assign tasks, and keep everyone aligned in real time.',
        mockupImage: '/assets/collaboration-mockup.png',
        mockupAlt: 'Team collaboration interface',
    },
    {
        number: 3,
        title: 'Analytics & Reports',
        description:
            'Generate comprehensive reports with actionable insights. Always stay informed and in control.',
        mockupImage: '/assets/analytics-mockup.png',
        mockupAlt: 'Analytics dashboard',
    },
]

export const defaultVisualStats = [
    { label: 'Avg time saved', value: '3.2 hrs', caption: 'Per task' },
    { label: 'Key insights', value: '18', caption: 'Per report' },
    { label: 'Action items', value: '6', caption: 'Auto-tagged' },
]
