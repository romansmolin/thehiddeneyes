import type { AboutSectionDefaults } from '../model/types'

const OFFICE_HERO_IMAGE =
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'

export const defaultAboutContent: AboutSectionDefaults = {
    badge: 'What is TheHiddenEyes?',
    title: 'Not Your Typical Dating Platform.',
    subtitle:
        'TheHiddenEyes is a dating platform that prioritizes emotional compatibility, shared values, and genuine conversation over endless swiping.',
    image: {
        src: OFFICE_HERO_IMAGE,
        alt: 'Couple enjoying a meaningful conversation',
    },
    cards: [
        {
            title: 'Dating Done Differently',
            description:
                'TheHiddenEyes uses deep compatibility matching to connect you with people who share your values, lifestyle, and relationship goals.',
            variant: 'outline',
        },
        {
            title: 'Compatibility-First Matching',
            description:
                'Our algorithm goes beyond looks — you are matched based on personality, interests, and what truly matters to you.',
            variant: 'filled',
        },
        {
            title: 'Meaningful Conversations',
            description:
                'Thoughtful prompts and icebreakers help you skip the small talk and connect on a deeper level from the start.',
            variant: 'filled',
        },
        {
            title: 'Verified & Safe',
            description:
                'Profile verification, moderation, and privacy controls ensure a safe space to be yourself and meet real people.',
            variant: 'filled',
        },
    ],
}
