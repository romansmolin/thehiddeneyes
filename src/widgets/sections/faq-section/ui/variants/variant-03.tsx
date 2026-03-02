import { cn } from '@/shared/lib/css/utils'
import { FaqItem } from '../../model/types'

interface FaqSectionVariant03Props {
    title?: string
    subtitle?: string
    badge?: string
    faqs?: FaqItem[]
    cta?: { label: string; href: string }
    className?: string
}

const defaultFaqs: FaqItem[] = [
    {
        question: 'How does matching work?',
        answer: 'Our algorithm analyzes your personality, values, and preferences to suggest compatible matches. The more you use the platform, the smarter your recommendations become.',
    },
    {
        question: 'Is TheHiddenEyes free to use?',
        answer: 'Yes. You can create a profile, browse matches, and start conversations for free. Premium features like advanced filters and unlimited messaging are available with a subscription.',
    },
    {
        question: 'How do you verify profiles?',
        answer: 'We use a combination of photo verification, email confirmation, and community reporting to ensure profiles are authentic and trustworthy.',
    },
    {
        question: 'Can I control who sees my profile?',
        answer: 'Absolutely. You have full control over your visibility settings. You can choose to be seen by everyone, only your matches, or browse in private mode.',
    },
    {
        question: 'What makes TheHiddenEyes different from other dating platforms?',
        answer: 'We focus on emotional compatibility and shared values rather than just appearance. Our matching system is designed to create deeper, more meaningful connections.',
    },
    {
        question: 'How is my data handled?',
        answer: 'Your privacy is our priority. Personal data is encrypted, never sold to third parties, and you can delete your account and all associated data at any time.',
    },
]

export const FaqSectionVariant03 = ({
    title = 'Frequently Asked Questions',
    subtitle = 'Everything you need to know about TheHiddenEyes.',
    faqs = defaultFaqs,
    className,
}: FaqSectionVariant03Props) => {
    return (
        <section className={cn(className)} id="faq">
            <div className="container mx-auto px-4 max-w-3xl">
                {(title || subtitle) && (
                    <div className="text-center mb-12">
                        {title && (
                            <h2 className="mt-4 text-center font-serif text-3xl leading-tight sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl lg:leading-16">
                                {title}
                            </h2>
                        )}
                    </div>
                )}

                <div className="space-y-3">
                    {faqs.map((item, index) => (
                        <details
                            key={item.question}
                            name="faq-accordion"
                            open={index === 0}
                            className="faq-accordion-item rounded-2xl border border-border bg-card px-6 py-5 shadow-sm"
                        >
                            <summary className="faq-accordion-summary flex cursor-pointer list-none items-center justify-between gap-4">
                                <span className="text-base font-semibold md:text-lg">
                                    {item.question}
                                </span>
                                <span
                                    className="faq-accordion-toggle grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-background text-base"
                                    aria-hidden="true"
                                >
                                    <span className="faq-accordion-toggle-open">−</span>
                                    <span className="faq-accordion-toggle-closed">+</span>
                                </span>
                            </summary>
                            <div className="faq-accordion-content">
                                <div>
                                    <p className="pt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    )
}
