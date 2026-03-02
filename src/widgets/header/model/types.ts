export type HeaderVariant = 'variant-01'

export interface NavigationLink {
    title: string
    href: string
    description?: string
}

export interface NavigationSection {
    primary: NavigationLink[]
    secondary: NavigationLink[]
}

export interface LogoConfig {
    text: string
    href: string
}

export interface CtaConfig {
    label: string
    href: string
}

export interface NavigationData {
    logo: LogoConfig
    features: NavigationLink[]
    company: NavigationSection
    cta: {
        login: CtaConfig
        primary: CtaConfig
    }
}

export interface HeaderProps {
    variant?: HeaderVariant
    className?: string
    navigationData?: NavigationData
}
