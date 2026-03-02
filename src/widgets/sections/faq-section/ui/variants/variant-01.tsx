'use client'

import { FaqItem } from '../../model/types'
import { cn } from '@/shared/lib/css/utils'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqSectionVariant01Props {
    title?: string
    subtitle?: string
    badge?: string
    faqs?: FaqItem[]
    cta?: { label: string; href: string }
    className?: string
}

const defaultFaqs: FaqItem[] = [
    {
        question: 'How do credits work?',
        answer: 'Each action costs a specific number of credits based on the operation. Your balance updates after every successful transaction.',
    },
    {
        question: 'What file types are supported?',
        answer: 'We support most common file formats. For best results, use standard formats with good quality.',
    },
    {
        question: 'How long does processing take?',
        answer: 'Most operations complete in under a minute. Larger or more complex requests may take slightly longer during peak times.',
    },
    {
        question: 'What output formats are available?',
        answer: 'You can download your results in various high-quality formats ready for use.',
    },
    {
        question: 'What is your refund policy?',
        answer: 'We only deduct credits after successful operations. Failed requests do not reduce your balance.',
    },
    {
        question: 'How do you handle my data?',
        answer: 'We store uploads and results temporarily so you can access them. You can delete your data anytime from your account.',
    },
]

export const FaqSectionVariant01 = ({
    title = 'Frequently Asked Questions',
    subtitle = 'Everything you need to know about our platform.',
    faqs = defaultFaqs,
    className,
}: FaqSectionVariant01Props) => {
    return (
        <section className={cn('py-16 md:py-24 lg:py-32 bg-white', className)} id="faq">
            <div className="container mx-auto px-4 max-w-3xl">
                {(title || subtitle) && (
                    <div className="text-center mb-16">
                        {title && (
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900">
                                {title}
                            </h2>
                        )}
                        {subtitle && <p className="text-slate-600">{subtitle}</p>}
                    </div>
                )}

                <div className="space-y-4">
                    <SimpleAccordion items={faqs} />
                </div>
            </div>
        </section>
    )
}

const SimpleAccordion = ({ items }: { items: FaqItem[] }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <div className="flex flex-col gap-4">
            {items.map((item, index) => {
                const isOpen = openIndex === index
                return (
                    <div
                        key={index}
                        className={`border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 ${
                            isOpen ? 'shadow-md bg-slate-50' : 'bg-white'
                        }`}
                    >
                        <button
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className="flex items-center justify-between w-full p-6 text-left"
                        >
                            <span className="font-bold text-lg text-slate-900">
                                {item.question}
                            </span>
                            <ChevronDown
                                className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                                    isOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                                {item.answer}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
