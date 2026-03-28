import { FooterBankingInfo } from '@/shared/components'
import { cn } from '@/shared/lib/css/utils'
import React from 'react'
import {
    FooterProps as FooterVariantProps,
    FooterMenuItem,
    FooterCompanyInfo,
} from '../../model/types'

const defaultMenuItems: FooterMenuItem[] = [
    {
        title: 'Product',
        links: [
            { text: 'Overview', url: '/' },
            { text: 'Dashboard', url: '/dashboard' },
            { text: 'Wallet', url: '/wallet' },
        ],
    },
    {
        title: 'Account',
        links: [
            { text: 'Sign In', url: '/auth' },
            { text: 'Verify Email', url: '/verify-email' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { text: 'Terms Of Service', url: '/terms-of-service' },
            { text: 'Privacy Policy', url: '/privacy-policy' },
            { text: 'Return Policy', url: '/return-policy' },
            { text: 'Cookies Policy', url: '/cookies-policy' },
        ],
    },
]

const defaultCompanyInfo: FooterCompanyInfo = {
    name: 'Your Company Name',
    address: ['123 Main Street', 'City, 00000, Country'],
    registrationNumber: 'REG: 0000000000',
}

export const FooterVariant01 = ({
    className,
    tagline = 'TheHiddenEye',
    menuItems = defaultMenuItems,
    companyInfo = defaultCompanyInfo,
}: Omit<FooterVariantProps, 'variant'>) => {
    return (
        <section className={cn('py-32 w-full', className)}>
            <div className="container mx-auto">
                <footer>
                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-6 px-4">
                        <div className="col-span-2 mb-8 lg:mb-0 mr-3 flex flex-col gap-5">
                            <p className="font-bold">{tagline}</p>
                            <FooterBankingInfo />
                        </div>
                        {menuItems.map((section, sectionIdx) => (
                            <div key={sectionIdx}>
                                <h3 className="mb-4 font-bold">{section.title}</h3>
                                <ul className="space-y-4 text-muted-foreground">
                                    {section.links.map((link, linkIdx) => (
                                        <li
                                            key={linkIdx}
                                            className="font-medium hover:text-primary"
                                        >
                                            <a href={link.url}>{link.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <div data-testid="footer-company-info">
                            <h3 className="mb-4 font-bold">Company</h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>{companyInfo.name}</li>
                                {companyInfo.address.map((line, idx) => (
                                    <li key={idx}>{line}</li>
                                ))}
                                <li>{companyInfo.registrationNumber}</li>
                            </ul>
                        </div>
                    </div>
                    {/* <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
                        <p>{copyright}</p>
                        <ul className="flex gap-4">
                            {bottomLinks.map((link, linkIdx) => (
                                <li key={linkIdx} className="underline hover:text-primary">
                                    <a href={link.url}>{link.text}</a>
                                </li>
                            ))}
                        </ul>
                    </div> */}
                </footer>
            </div>
        </section>
    )
}
