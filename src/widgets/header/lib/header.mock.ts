export const navigationData = {
    logo: {
        text: 'TheHiddenEyes',
        href: '/',
    },
    features: [
        {
            title: 'Introduction',
            href: '/docs',
            description: 'Re-usable components built using Radix UI and Tailwind CSS.',
        },
        {
            title: 'Installation',
            href: '/docs/installation',
            description: 'How to install dependencies and structure your app.',
        },
        {
            title: 'Typography',
            href: '/docs/primitives/typography',
            description: 'Styles for headings, paragraphs, lists...etc',
        },
    ],
    company: {
        primary: [
            {
                title: 'About Us',
                href: '/about',
                description: 'Learn about our company',
            },
            {
                title: 'Customer Stories',
                href: '/customers',
                description: "See how we've helped",
            },
            {
                title: 'Partnerships',
                href: '/partnerships',
                description: 'Collaborate with us',
            },
        ],
        secondary: [
            {
                title: 'Changelog',
                href: '/changelog',
            },
            {
                title: 'Blog',
                href: '/blog',
            },
            {
                title: 'Help Center',
                href: '/help',
            },
        ],
    },
    cta: {
        login: {
            label: 'Login',
            href: '/auth',
        },
        primary: {
            label: 'Get Started',
            href: '/auth',
        },
    },
}
