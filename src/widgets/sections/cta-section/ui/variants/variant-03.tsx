import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/css/utils'
import { CtaButton } from '../../model/types'
import Link from 'next/link'

interface CtaVariant03Props {
    badge?: string
    title?: string
    description?: string
    primaryButton?: CtaButton
    secondaryButton?: CtaButton
    className?: string
}

export const CtaVariant03 = ({
    badge = 'Ready to meet someone?',
    title = 'Your next great connection is waiting',
    description = 'Join thousands of people who are finding meaningful relationships on TheHiddenEyes.',
    primaryButton = { label: 'Create Your Profile', href: '/auth' },
    className,
}: CtaVariant03Props) => {
    return (
        <section className={cn('overflow-hidden pt-0 md:pt-0', className)} id="contact">
            <div className="relative mx-auto flex max-w-container flex-col items-center gap-6 px-8 py-12 text-center sm:gap-8 md:py-24">
                {badge && (
                    <Badge
                        variant="outline"
                        className="opacity-0 animate-fade-in-up delay-100"
                    >
                        <span className="text-muted-foreground">{badge}</span>
                    </Badge>
                )}

                <h2 className="text-3xl font-semibold sm:text-5xl opacity-0 animate-fade-in-up delay-200">
                    {title}
                </h2>

                {description && (
                    <p className="text-muted-foreground opacity-0 animate-fade-in-up delay-300">
                        {description}
                    </p>
                )}

                {primaryButton && (
                    <Button
                        size="lg"
                        className="opacity-0 animate-fade-in-up delay-500"
                        asChild
                    >
                        <Link href={primaryButton.href}>{primaryButton.label}</Link>
                    </Button>
                )}

                <div className="fade-top-lg pointer-events-none absolute inset-0 rounded-2xl shadow-glow opacity-0 animate-scale-in delay-700" />
            </div>
        </section>
    )
}
