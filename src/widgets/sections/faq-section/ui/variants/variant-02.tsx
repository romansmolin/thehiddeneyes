import { PhoneCall } from 'lucide-react'
import { Badge } from '@/shared/ui/badge'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/shared/ui/accordion'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'
import { cn } from '@/shared/lib/css/utils'
import { FaqItem } from '../../model/types'

interface FaqVariant02Props {
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
        answer: 'Our platform prioritizes profile compatibility and real intent, then surfaces curated profiles so you spend less time browsing and more time connecting.',
    },
    {
        question: 'Do I need to pay to get started?',
        answer: 'No. You can sign up and start using core features for free. Credits are optional and can be used for extras.',
    },
    {
        question: 'What are credits used for?',
        answer: 'Credits are used for in-app actions such as premium features. You can top up credits from the Wallet page.',
    },
    {
        question: 'Can I control what appears on my profile?',
        answer: 'Yes. You can update your profile details and description at any time from your profile settings.',
    },
    {
        question: 'How is my data handled?',
        answer: 'Your data is handled with enterprise-grade security and complete privacy protection. We never sell your personal information.',
    },
    {
        question: 'How do I contact support?',
        answer: 'Reach out to our support team via the contact page and we will get back to you as soon as possible.',
    },
]

export const FaqSectionVariant02 = ({
    title = 'Frequently Asked Questions',
    subtitle = 'Everything you need to know about our platform.',
    badge = 'FAQ',
    faqs = defaultFaqs,
    cta = { label: 'Get started now', href: '/auth' },
    className,
}: FaqVariant02Props) => {
    return (
        <div className={cn('w-full', className)} id="faq">
            <div className="container mx-auto">
                <div className="grid gap-10 lg:grid-cols-2">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                            <div>
                                <Badge className="bg-transparent px-3 py-2 text-sm font-medium text-primary border border-primary border-dashed">
                                    {badge}
                                </Badge>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="max-w-xl text-left text-3xl tracking-tighter md:text-5xl">
                                    {title}
                                </h4>
                                <p className="text-muted-foreground max-w-xl text-left text-lg leading-relaxed tracking-tight lg:max-w-lg">
                                    {subtitle}
                                </p>
                            </div>
                            {cta && (
                                <div>
                                    <Button asChild className="gap-4" variant="outline">
                                        <Link href={cta.href}>
                                            {cta.label} <PhoneCall className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((item, index) => (
                            <AccordionItem key={item.question} value={'index-' + index}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent>{item.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}
