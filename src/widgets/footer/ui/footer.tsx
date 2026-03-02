import React from 'react'
import { FooterVariant01 } from './variants/variant-01'
import { FooterProps } from '../model/types'

export const Footer = ({
    variant = 'variant-01',
    logo,
    className,
    tagline,
    menuItems,
    copyright,
    bottomLinks,
    companyInfo,
}: FooterProps) => {
    const variantProps = { logo, className, tagline, menuItems, copyright, bottomLinks, companyInfo }

    switch (variant) {
        case 'variant-01':
            return <FooterVariant01 {...variantProps} />
        default:
            return <FooterVariant01 {...variantProps} />
    }
}
