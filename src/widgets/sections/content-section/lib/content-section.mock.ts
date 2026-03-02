import type { ContentImage, ContentFeature, ContentCta } from '../model/types'

export const defaultImage: ContentImage = {
    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
    alt: 'Product screenshot',
}

export const defaultFeatures: ContentFeature[] = [
    {
        title: 'Lightning Fast',
        description: 'Built for speed with optimized performance at every level.',
    },
    {
        title: 'Secure by Default',
        description: 'Enterprise-grade security with end-to-end encryption.',
    },
    {
        title: 'Easy to Use',
        description: 'Intuitive interface designed for productivity, not complexity.',
    },
]

export const defaultCta: ContentCta = {
    label: 'Learn More',
    href: '#features',
}
