import { ArrowRightIcon, PlusIcon } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'
import { cn } from '@/shared/lib/css/utils'
import { CtaButton } from '../../model/types'

interface CtaVariant02Props {
    badge?: string
    title?: string
    description?: string
    primaryButton?: CtaButton
    secondaryButton?: CtaButton
    className?: string
}

export const CtaVariant02 = ({
    title = 'Ready to get started?',
    description = 'Create your account, discover what matters, and connect with people who share your goals.',
    primaryButton = { label: 'Create free account', href: '/auth' },
    className,
}: CtaVariant02Props) => {
    return (
        <section className={cn('container mx-auto', className)} id="cta">
            <div className="relative mx-auto flex w-full max-w-5xl flex-col justify-between gap-y-6 border-y bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)] px-4 py-12">
                <PlusIcon
                    className="absolute top-[-12.5px] left-[-11.5px] z-1 size-6"
                    strokeWidth={1}
                />
                <PlusIcon
                    className="absolute top-[-12.5px] right-[-11.5px] z-1 size-6"
                    strokeWidth={1}
                />
                <PlusIcon
                    className="absolute bottom-[-12.5px] left-[-11.5px] z-1 size-6"
                    strokeWidth={1}
                />
                <PlusIcon
                    className="absolute right-[-11.5px] bottom-[-12.5px] z-1 size-6"
                    strokeWidth={1}
                />

                <div className="-inset-y-6 pointer-events-none absolute left-0 w-px border-l" />
                <div className="-inset-y-6 pointer-events-none absolute right-0 w-px border-r" />

                <div className="-z-10 absolute top-0 left-1/2 h-full border-l border-dashed" />

                <div className="space-y-1">
                    <h2 className="text-center text-2xl font-bold">{title}</h2>
                    <p className="text-muted-foreground text-center">{description}</p>
                </div>

                {primaryButton && (
                    <div className="flex items-center justify-center gap-2">
                        <Button asChild>
                            <Link href={primaryButton.href}>
                                {primaryButton.label} <ArrowRightIcon className="ml-1 size-4" />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}
