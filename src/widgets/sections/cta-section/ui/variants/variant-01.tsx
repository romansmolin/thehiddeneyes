import { MoveRight, PhoneCall } from 'lucide-react'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { CtaButton } from '../../model/types'
import { cn } from '@/shared/lib/css/utils'
import Link from 'next/link'

interface CtaVariant01Props {
    badge?: string
    title?: string
    description?: string
    primaryButton?: CtaButton
    secondaryButton?: CtaButton
    className?: string
}

const defaultPrimaryButton: CtaButton = {
    label: 'Sign up here',
    href: '/signup',
    icon: <MoveRight className="w-4 h-4" />,
    variant: 'default',
}

export const CtaVariant01 = ({
    badge = 'Get started',
    title = 'Try our platform today!',
    description = 'Managing a growing business today is already tough. Avoid further complications by ditching outdated, tedious methods. Our goal is to streamline your workflow, making it easier and faster than ever.',
    primaryButton = defaultPrimaryButton,
    secondaryButton,
    className,
}: CtaVariant01Props) => {
    return (
        <section className={cn('w-full py-16 md:py-24 lg:py-32', className)}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col text-center bg-muted rounded-2xl p-4 lg:p-14 gap-8 items-center">
                    {badge && (
                        <div>
                            <Badge>{badge}</Badge>
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        {title && (
                            <h3 className="text-3xl md:text-5xl font-bold tracking-tight max-w-xl font-regular">
                                {title}
                            </h3>
                        )}
                        {description && (
                            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl">
                                {description}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        {secondaryButton && (
                            <Button asChild className="gap-4" variant={secondaryButton.variant}>
                                <Link href={secondaryButton.href}>
                                    {secondaryButton.label}{' '}
                                    {secondaryButton.icon || <PhoneCall className="w-4 h-4" />}
                                </Link>
                            </Button>
                        )}
                        {primaryButton && (
                            <Button asChild className="gap-4" variant={primaryButton.variant}>
                                <Link href={primaryButton.href}>
                                    {primaryButton.label}{' '}
                                    {primaryButton.icon || <MoveRight className="w-4 h-4" />}
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
