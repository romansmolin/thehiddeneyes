import type { CtaButton } from '../model/types'

export const defaultBadge = 'Ready to meet someone?'

export const defaultTitle = 'Your next great connection is waiting'

export const defaultDescription =
    'Join thousands of people who are tired of shallow swiping and ready for something real. TheHiddenEyes helps you find meaningful relationships based on who you truly are.'

export const defaultPrimaryButton: CtaButton = {
    label: 'Create Your Profile',
    href: '/auth',
    variant: 'default',
}

export const defaultSecondaryButton: CtaButton = {
    label: 'Learn More',
    href: '#features',
    variant: 'outline',
}
