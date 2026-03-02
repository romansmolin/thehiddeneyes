import type { SocialProofStat, SocialProofLogo } from '../model/types'

export const defaultStats: SocialProofStat[] = [
    { value: '24', label: 'Active Members', suffix: 'K+' },
    { value: '94', label: 'Match Accuracy', suffix: '%' },
    { value: '50', label: 'Countries', suffix: '+' },
    { value: '4.9', label: 'User Rating', suffix: '/5' },
]

export const defaultLogos: SocialProofLogo[] = [
    { src: '/assets/logo-placeholder-1.svg', alt: 'Company 1' },
    { src: '/assets/logo-placeholder-2.svg', alt: 'Company 2' },
    { src: '/assets/logo-placeholder-3.svg', alt: 'Company 3' },
    { src: '/assets/logo-placeholder-4.svg', alt: 'Company 4' },
    { src: '/assets/logo-placeholder-5.svg', alt: 'Company 5' },
]
