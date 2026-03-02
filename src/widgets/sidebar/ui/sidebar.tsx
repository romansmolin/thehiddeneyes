'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Heart,
    MessageCircle,
    Gift,
    User,
    Wallet,
} from 'lucide-react'
import { Logo } from '@/shared/components/logo/logo'
import { cn } from '@/shared/lib/css/utils'

const navItems = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Discover', url: '/match', icon: Heart },
    { title: 'Chat', url: '/chat', icon: MessageCircle },
    { title: 'Gifts', url: '/gifts', icon: Gift },
    { title: 'Profile', url: '/profile', icon: User },
    { title: 'Wallet', url: '/wallet', icon: Wallet },
]

export default function SidebarLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()

    return (
        <div className="min-h-screen">
            <header className="sticky top-0 z-50 border-b bg-background">
                <div className="container mx-auto flex items-center gap-4 px-4 py-3">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <Logo aria-hidden="true" className="size-1" />
                        <h2 className="font-bold text-2xl">TheHiddenEyes</h2>
                    </Link>
                </div>
                <div className="container mx-auto px-4 pb-3">
                    <nav className="inline-flex items-center gap-1 rounded-2xl bg-muted p-[3px]">
                        {navItems.map((item) => {
                            const isActive =
                                pathname === item.url || pathname.startsWith(item.url + '/')

                            return (
                                <Link
                                    key={item.url}
                                    href={item.url}
                                    className={cn(
                                        'inline-flex items-center gap-2 rounded-2xl px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors',
                                        isActive && 'bg-background text-foreground shadow-sm'
                                    )}
                                >
                                    <item.icon className="size-4" />
                                    {item.title}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </header>
            {children}
        </div>
    )
}
