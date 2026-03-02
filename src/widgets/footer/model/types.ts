export type FooterVariant = 'variant-01'

export interface FooterLink {
    text: string
    url: string
}

export interface FooterMenuItem {
    title: string
    links: FooterLink[]
}

export interface FooterLogo {
    url: string
    src: string
    alt: string
    title: string
}

export interface FooterCompanyInfo {
    name: string
    address: string[]
    registrationNumber: string
}

export interface FooterProps {
    variant?: FooterVariant
    logo?: FooterLogo
    className?: string
    tagline?: string
    menuItems?: FooterMenuItem[]
    copyright?: string
    bottomLinks?: FooterLink[]
    companyInfo?: FooterCompanyInfo
}
