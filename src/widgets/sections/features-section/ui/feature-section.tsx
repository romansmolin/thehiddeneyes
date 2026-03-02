'use client'

import { FeatureSectionVariant01 } from './variants/variant-01'
import { FeatureSectionVariant02 } from './variants/variant-02'
import { FeatureSectionVariant03 } from './variants/variant-03'
import { FeatureSectionVariant04 } from './variants/variant-04'
import { FeatureSectionVariant05 } from './variants/variant-05'
import { FeaturesSectionProps } from '../model/types'

export const FeatureSection = ({
    variant = 'variant-01',
    title,
    subtitle,
    titleDecorator,
    titleDecoratorPosition,
    badge,
    visualStats,
    features,
    className,
}: FeaturesSectionProps) => {
    const variantProps = {
        title,
        subtitle,
        titleDecorator,
        titleDecoratorPosition,
        badge,
        visualStats,
        features,
        className,
    }

    switch (variant) {
        case 'variant-01':
            return <FeatureSectionVariant01 {...variantProps} />
        case 'variant-02':
            return <FeatureSectionVariant02 {...variantProps} />
        case 'variant-03':
            return <FeatureSectionVariant03 {...variantProps} />
        case 'variant-04':
            return <FeatureSectionVariant04 {...variantProps} />
        case 'variant-05':
            return <FeatureSectionVariant05 {...variantProps} />
        default:
            return <FeatureSectionVariant01 {...variantProps} />
    }
}
