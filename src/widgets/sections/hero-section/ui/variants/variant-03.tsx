'use client'

import { Button } from '@/shared/ui/button'
import { CreditCard, Star, Wallet2 } from 'lucide-react'
import Image from 'next/image'
import type { HeroVariantProps } from '../../model/types'
import { cn } from '@/shared/lib/css/utils'
import Link from 'next/link'
import { Badge } from '@/shared/ui/badge'

export const HeroVariant03 = ({
    content,
    className,
    badge,
    badgeIcon,
    userAvatars = [],
    rating,
    dashboardCards = [],
}: HeroVariantProps) => {
    const Icon = badgeIcon === 'card' ? CreditCard : badgeIcon === 'star' ? Star : Wallet2
    const resolvedRating = rating ?? 0
    const cards = dashboardCards.slice(0, 4)
    return (
        <section
            className={cn('relative bg-white overflow-hidden py-16 md:py-24 lg:py-32', className)}
        >
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column - Content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="inline-block">
                            <Badge className="bg-primary/20">
                                <Icon />
                                {badge}
                            </Badge>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                            {content.headlineLine1}
                            <br />
                            <span className="italic font-serif text-primary">
                                {content.headlineLine2}
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-base md:text-lg text-slate-600 max-w-lg leading-relaxed">
                            {content.subtitle}
                        </p>

                        {/* CTA and Social Proof */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            {/* CTA Button */}
                            <Button
                                asChild
                                size="lg"
                                className="bg-primary hover:bg-slate-800 text-white rounded-full px-8 h-14 text-base font-semibold"
                            >
                                <Link href={content.primaryCta.href}>
                                    {content.primaryCta.label}
                                </Link>
                            </Button>

                            {/* User Avatars and Rating */}
                            <div className="flex items-center gap-3">
                                {/* Avatars */}
                                <div className="flex -space-x-3">
                                    {userAvatars.map((avatar, idx) => (
                                        <div
                                            key={idx}
                                            className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden"
                                        >
                                            <Image
                                                width={200}
                                                height={200}
                                                src={avatar}
                                                alt={`User ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                                unoptimized={avatar.endsWith('.svg')}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Rating */}
                                <div className="flex flex-col">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={cn(
                                                    'w-4 h-4',
                                                    i < Math.floor(resolvedRating)
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'fill-slate-200 text-slate-200',
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-slate-900">
                                        {resolvedRating}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Mini Dashboard Cards */}
                    <div className="relative h-125 md:h-150">
                        <div className="absolute top-0 left-0 w-[48%] h-[42%] rounded-2xl bg-white shadow-xl border border-slate-100 p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between text-xs text-slate-500">
                                <span>{cards[0]?.title}</span>
                                <span className="font-semibold text-emerald-600">
                                    {cards[0]?.metric}
                                </span>
                            </div>
                            <div>
                                <p className="text-2xl md:text-3xl font-bold text-slate-900">
                                    {cards[0]?.value}
                                </p>
                                <p className="text-xs text-slate-500 mt-2">{cards[0]?.subtitle}</p>
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 w-[48%] h-[35%] rounded-2xl bg-slate-900 text-white shadow-lg p-6 flex flex-col justify-between">
                            <div className="text-xs text-slate-300">{cards[1]?.title}</div>
                            <div>
                                <p className="text-xl font-semibold">{cards[1]?.value}</p>
                                <p className="text-xs text-slate-300 mt-2">{cards[1]?.subtitle}</p>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-[42%] h-[50%] rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-primary/80 shadow-xl p-6 text-white flex flex-col justify-between">
                            <div className="text-xs text-white/80">{cards[2]?.title}</div>
                            <div>
                                <p className="text-2xl md:text-3xl font-bold">{cards[2]?.value}</p>
                                <p className="text-xs text-white/80 mt-2">{cards[2]?.subtitle}</p>
                            </div>
                        </div>

                        <div className="absolute bottom-0 right-0 w-[52%] h-[58%] rounded-2xl bg-white shadow-xl border border-slate-100 p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between text-xs text-slate-500">
                                <span>{cards[3]?.title}</span>
                                <span className="font-semibold text-indigo-600">
                                    {cards[3]?.metric}
                                </span>
                            </div>
                            <div>
                                <p className="text-2xl md:text-3xl font-bold text-slate-900">
                                    {cards[3]?.value}
                                </p>
                                <p className="text-xs text-slate-500 mt-2">{cards[3]?.subtitle}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
