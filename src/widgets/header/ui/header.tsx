import { HeaderProps } from '../model/types'
import { HeaderVariant01 } from './variants/variant-01'

export function Header({ variant = 'variant-01', className, navigationData }: HeaderProps) {
    switch (variant) {
        case 'variant-01':
        default:
            return <HeaderVariant01 className={className} navigationData={navigationData} />
    }
}
