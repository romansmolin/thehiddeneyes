'use client'

import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import { Phone } from 'lucide-react'
import type { HeroVariantProps } from '../../model/types'
import { cn } from '@/shared/lib/css/utils'

const FlameIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M16 2C16 2 12 8 12 14C12 16.5 13 19 16 21C19 19 20 16.5 20 14C20 8 16 2 16 2Z"
            fill="url(#flame-gradient)"
        />
        <path
            d="M16 12C16 12 14 15 14 18C14 19.5 14.5 21 16 22C17.5 21 18 19.5 18 18C18 15 16 12 16 12Z"
            fill="url(#flame-inner)"
        />
        <defs>
            <linearGradient
                id="flame-gradient"
                x1="16"
                y1="2"
                x2="16"
                y2="22"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#F472B6" />
                <stop offset="1" stopColor="#EC4899" />
            </linearGradient>
            <linearGradient
                id="flame-inner"
                x1="16"
                y1="12"
                x2="16"
                y2="22"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#FBBF24" />
                <stop offset="1" stopColor="#F472B6" />
            </linearGradient>
        </defs>
    </svg>
)

const BrushStrokeBlue = () => (
    <svg
        className="absolute -bottom-1 left-0 w-full h-3 md:h-4"
        viewBox="0 0 200 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
    >
        <path
            d="M4 10C40 6 80 14 120 8C160 2 190 12 196 9"
            stroke="url(#blue-stroke)"
            strokeWidth="10"
            strokeLinecap="round"
        />
        <defs>
            <linearGradient
                id="blue-stroke"
                x1="0"
                y1="8"
                x2="200"
                y2="8"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#3B82F6" />
                <stop offset="1" stopColor="#60A5FA" />
            </linearGradient>
        </defs>
    </svg>
)

const BrushStrokeOrange = () => (
    <svg
        className="absolute -bottom-1 left-0 w-full h-3 md:h-4"
        viewBox="0 0 400 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
    >
        <path
            d="M4 9C80 5 160 14 240 7C320 1 380 11 396 8"
            stroke="url(#orange-stroke)"
            strokeWidth="10"
            strokeLinecap="round"
        />
        <defs>
            <linearGradient
                id="orange-stroke"
                x1="0"
                y1="8"
                x2="400"
                y2="8"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#F97316" />
                <stop offset="1" stopColor="#FB923C" />
            </linearGradient>
        </defs>
    </svg>
)

const PerspectiveGrid = () => (
    <div className="absolute inset-x-0 bottom-0 h-[60%] overflow-hidden pointer-events-none">
        <div
            className="absolute inset-0"
            style={{
                background: `
                    linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.8) 60%, rgb(15, 23, 42) 100%),
                    linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.03) 1px, transparent 1px),
                    linear-gradient(0deg, transparent 0%, rgba(148, 163, 184, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: '100% 100%, 60px 60px, 60px 60px',
                transform: 'perspective(500px) rotateX(60deg)',
                transformOrigin: 'center top',
            }}
        />
    </div>
)

const FloatingChip = ({
    label,
    color,
    position,
    rotation,
}: {
    label: string
    color: 'orange' | 'blue' | 'purple'
    position: { top?: string; bottom?: string; left?: string; right?: string }
    rotation: number
}) => {
    const colorClasses = {
        orange: 'bg-gradient-to-r from-orange-500 to-orange-400 shadow-orange-500/30',
        blue: 'bg-gradient-to-r from-blue-500 to-blue-400 shadow-blue-500/30',
        purple: 'bg-gradient-to-r from-purple-500 to-purple-400 shadow-purple-500/30',
    }

    return (
        <div
            className={`
                absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full
                text-white text-xs font-medium shadow-lg
                ${colorClasses[color]}
            `}
            style={{
                ...position,
                transform: `rotate(${rotation}deg)`,
            }}
        >
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            {label}
        </div>
    )
}

const MockupCard = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div
        className={`
            absolute bg-white rounded-2xl shadow-2xl overflow-hidden
            ${className}
        `}
    >
        {children}
    </div>
)

export const HeroVariant01 = ({
    navItems = [],
    floatingChips = [],
    content,
    className,
}: HeroVariantProps) => {
    return (
        <section className={cn('relative min-h-screen bg-slate-950 overflow-hidden', className)}>
            {/* Background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_50%,rgba(120,119,198,0.08),transparent)]" />

            {/* Perspective Grid Floor */}
            <PerspectiveGrid />

            <div className="relative z-10">
                {/* Header */}
                <header className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center" aria-label="Home">
                            <FlameIcon />
                        </Link>

                        {/* Center Navigation */}
                        <nav
                            className="hidden md:flex items-center gap-1 bg-slate-900/80 backdrop-blur-sm rounded-full px-2 py-2 border border-slate-800"
                            aria-label="Main navigation"
                        >
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA Button */}
                        <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-5 py-2 h-auto font-medium shadow-lg shadow-purple-500/25">
                            <span className="hidden sm:inline">Get in touch</span>
                            <Phone className="w-4 h-4 sm:ml-2" />
                        </Button>
                    </div>
                </header>

                {/* Hero Content */}
                <div className="container mx-auto px-4 pt-16 md:pt-24 pb-32 md:pb-48">
                    {/* Floating Chips */}
                    {floatingChips.map((chip) => (
                        <FloatingChip
                            key={chip.label}
                            label={chip.label}
                            color={chip.color}
                            position={chip.position}
                            rotation={chip.rotation}
                        />
                    ))}

                    {/* Main Content */}
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                            <span className="block sm:inline">
                                {content.headlineLine1.split(' ')[0]}{' '}
                                <span className="relative inline-block">
                                    {content.headlineLine1.split(' ')[1]}
                                    <BrushStrokeBlue />
                                </span>{' '}
                                {content.headlineLine1.split(' ')[2]}
                            </span>
                            <br className="hidden sm:block" />
                            <span className="relative inline-block mt-2 sm:mt-0">
                                {content.headlineLine2}
                                <BrushStrokeOrange />
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-6 md:mt-8 text-base md:text-lg text-slate-400 max-w-xl mx-auto">
                            {content.subtitle}
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                asChild
                                size="lg"
                                className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8 py-3 h-auto font-semibold shadow-lg shadow-white/10"
                            >
                                <Link href={content.primaryCta.href}>
                                    <Phone className="w-4 h-4 mr-2" />
                                    {content.primaryCta.label}
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="w-full sm:w-auto border-slate-700 text-white hover:bg-slate-800 rounded-full px-8 py-3 h-auto font-semibold"
                            >
                                <Link href={content.secondaryCta.href}>
                                    {content.secondaryCta.label}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Mockups */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 md:h-96">
                    {/* Card - Left */}
                    <MockupCard className="left-4 md:left-8 bottom-8 w-48 md:w-56 p-4 z-30 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-violet-600" />
                            <div>
                                <p className="text-[10px] text-slate-500">Good Morning</p>
                                <p className="text-xs font-semibold text-slate-800">User</p>
                            </div>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-slate-900">$12,530.00</p>
                        <div className="mt-3 flex items-center gap-2">
                            <span className="text-[10px] text-slate-500">Progress</span>
                            <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full w-3/4 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" />
                            </div>
                        </div>
                    </MockupCard>

                    {/* Card - Center */}
                    <MockupCard className="left-1/2 -translate-x-1/2 bottom-0 w-64 md:w-80 z-20 transform hover:scale-105 transition-transform duration-300">
                        <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 p-6 md:p-8">
                            <p className="text-lg md:text-xl font-semibold text-white leading-tight">
                                Discover new
                                <br />
                                possibilities today.
                            </p>
                            <div className="mt-6 flex gap-2">
                                <div className="w-8 h-1.5 bg-white/40 rounded-full" />
                                <div className="w-8 h-1.5 bg-white rounded-full" />
                                <div className="w-8 h-1.5 bg-white/40 rounded-full" />
                            </div>
                        </div>
                        <div className="h-20 md:h-24 bg-gradient-to-b from-slate-800 to-slate-900 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-8 bg-slate-700 rounded-2xl" />
                            </div>
                        </div>
                    </MockupCard>

                    {/* Card - Right */}
                    <MockupCard className="right-4 md:right-8 bottom-12 w-44 md:w-52 z-10 transform rotate-6 hover:rotate-0 transition-transform duration-300">
                        <div className="bg-slate-100 p-3 md:p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                                    <div className="w-3 h-3 border-2 border-white rounded-2xl" />
                                </div>
                                <span className="text-[10px] font-medium text-slate-600">APP</span>
                            </div>
                            <p className="text-xs text-slate-800 font-medium mb-1">
                                Stay ahead with
                            </p>
                            <div className="space-y-1">
                                <div className="h-1.5 bg-slate-200 rounded-full w-full" />
                                <div className="h-1.5 bg-slate-200 rounded-full w-3/4" />
                            </div>
                        </div>
                        <div className="h-24 md:h-32 bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500" />
                            </div>
                        </div>
                    </MockupCard>
                </div>
            </div>

            {/* Mobile menu button (hidden for now, structure only) */}
            <button
                className="md:hidden fixed top-6 right-16 z-50 p-2 text-white"
                aria-label="Open menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
        </section>
    )
}
