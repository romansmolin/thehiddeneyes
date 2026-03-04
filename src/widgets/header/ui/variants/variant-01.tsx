'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/shared/lib/css/utils'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/shared/ui/navigation-menu'
import { Button } from '@/shared/ui/button'
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from '@/shared/ui/sheet'
import { ArrowUpRight, Menu } from 'lucide-react'
import { navigationData as defaultNavigationData } from '../../lib/header.mock'
import { Logo } from '@/shared/components/logo/logo'
import { NavigationData } from '../../model/types'

interface HeaderVariant01Props {
    className?: string
    navigationData?: NavigationData
}

export function HeaderVariant01({
    className,
    navigationData = defaultNavigationData,
}: HeaderVariant01Props) {
    return (
        <header
            className={cn(
                'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60',
                className,
            )}
        >
            <div className="relative flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
                <div className="flex items-center gap-6">
                    <Link
                        href={navigationData.logo.href}
                        className="flex items-center gap-2 font-bold text-xl"
                    >
                        <Logo className="" aria-hidden="true" />
                        <span>{navigationData.logo.text}</span>
                    </Link>

                    <NavigationMenu className="hidden md:flex" delayDuration={0}>
                        <NavigationMenuList>
                            {/* Features Dropdown */}
                            <NavigationMenuItem>
                                {/* <NavigationMenuTrigger className="rounded-full bg-transparent">
                                    Features
                                </NavigationMenuTrigger> */}

                                {/* <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 w-[600px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <div className="flex h-full w-full select-none flex-col justify-end rounded-2xl bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:shadow-lg transition-shadow">
                                                    <LayoutGrid className="h-6 w-6" />
                                                    <div className="mb-2 mt-4 text-lg font-medium">
                                                        TheHiddenEyes Design
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        Beautifully designed components built with
                                                        Radix UI and Tailwind CSS.
                                                    </p>
                                                </div>
                                            </NavigationMenuLink>
                                        </li>
                                        {navigationData.features.map((item) => (
                                            <ListItem
                                                key={item.href}
                                                href={item.href}
                                                title={item.title}
                                            >
                                                {item.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent> */}

                                <NavigationMenuLink
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        'rounded-full bg-transparent hover:bg-transparent hover:text-foreground/80',
                                    )}
                                    asChild
                                >
                                    <Link href="#features">Features</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            {/* Company Dropdown */}
                            <NavigationMenuItem>
                                {/* <NavigationMenuTrigger className="rounded-full bg-transparent data-[state=open]:bg-muted/50">
                                    Company
                                </NavigationMenuTrigger> */}

                                {/* <NavigationMenuContent>
                                    <div className="grid w-[600px] grid-cols-2 gap-4 p-4">
                                        <div className="flex flex-col gap-2">
                                            {navigationData.company.primary.map((item, index) => {
                                                const icons = [
                                                    <Users key="users" className="h-5 w-5" />,
                                                    <Star key="star" className="h-5 w-5" />,
                                                    <Handshake
                                                        key="handshake"
                                                        className="h-5 w-5"
                                                    />,
                                                ]
                                                return (
                                                    <ListItemWithIcon
                                                        key={item.href}
                                                        href={item.href}
                                                        title={item.title}
                                                        icon={icons[index]}
                                                        description={item.description}
                                                    />
                                                )
                                            })}
                                        </div>
                                        <div className="flex flex-col gap-2 justify-center border-l pl-4">
                                            {navigationData.company.secondary.map((item, index) => {
                                                const icons = [
                                                    <FileText key="file" className="h-4 w-4" />,
                                                    <Leaf key="leaf" className="h-4 w-4" />,
                                                    <HelpCircle key="help" className="h-4 w-4" />,
                                                ]
                                                return (
                                                    <SimpleListItem
                                                        key={item.href}
                                                        href={item.href}
                                                        icon={icons[index]}
                                                    >
                                                        {item.title}
                                                    </SimpleListItem>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </NavigationMenuContent> */}

                                <NavigationMenuLink
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        'rounded-full bg-transparent hover:bg-transparent hover:text-foreground/80',
                                    )}
                                    asChild
                                >
                                    <Link href="#how-it-works">How it Works</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            {/* Pricing Link */}
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="#testimonials"
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        'rounded-full bg-transparent hover:bg-transparent hover:text-foreground/80',
                                    )}
                                >
                                    Testimonials
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex items-center gap-4">
                    <Button asChild variant="outline" className="hidden md:inline-flex px-6">
                        <Link href={navigationData.cta.login.href}>
                            {navigationData.cta.login.label}
                        </Link>
                    </Button>
                    <Button
                        asChild
                        className="hidden md:inline-flex rounded-full px-6 bg-foreground text-background hover:bg-foreground/90 items-center gap-2"
                    >
                        <Link href={navigationData.cta.primary.href}>
                            {navigationData.cta.primary.label}
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </Button>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                aria-label="Open menu"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle>{navigationData.logo.text}</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-4 px-4">
                                <SheetClose asChild>
                                    <Link
                                        href="#features"
                                        className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
                                    >
                                        Features
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link
                                        href="#how-it-works"
                                        className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
                                    >
                                        How it Works
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link
                                        href="#testimonials"
                                        className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
                                    >
                                        Testimonials
                                    </Link>
                                </SheetClose>
                            </nav>
                            <div className="flex flex-col gap-3 mt-auto p-4">
                                <SheetClose asChild>
                                    <Button asChild variant="outline" className="w-full">
                                        <Link href={navigationData.cta.login.href}>
                                            {navigationData.cta.login.label}
                                        </Link>
                                    </Button>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Button
                                        asChild
                                        className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
                                    >
                                        <Link href={navigationData.cta.primary.href}>
                                            {navigationData.cta.primary.label}
                                            <ArrowUpRight className="h-4 w-4 ml-2" />
                                        </Link>
                                    </Button>
                                </SheetClose>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<typeof Link>,
    React.ComponentPropsWithoutRef<typeof Link> & { title?: string }
>(({ className, title, children, href, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    href={href}
                    className={cn(
                        'block select-none space-y-1 rounded-2xl p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className,
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = 'ListItem'

const ListItemWithIcon = React.forwardRef<
    React.ElementRef<typeof Link>,
    React.ComponentPropsWithoutRef<typeof Link> & { icon?: React.ReactNode; description?: string }
>(({ className, title, children, icon, description, href, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    href={href}
                    className={cn(
                        'block select-none space-y-1 rounded-2xl p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className,
                    )}
                    {...props}
                >
                    <div className="flex items-start gap-3">
                        {icon && (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border bg-background text-muted-foreground shadow-sm">
                                {icon}
                            </div>
                        )}
                        <div className="flex flex-col gap-1">
                            <div className="text-sm font-medium leading-none text-foreground">
                                {title}
                            </div>
                            {description && (
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {description}
                                </p>
                            )}
                            {!description && children && (
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {children}
                                </p>
                            )}
                        </div>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItemWithIcon.displayName = 'ListItemWithIcon'

const SimpleListItem = React.forwardRef<
    React.ElementRef<typeof Link>,
    React.ComponentPropsWithoutRef<typeof Link> & { icon?: React.ReactNode }
>(({ className, children, icon, href, ...props }, ref) => {
    return (
        <NavigationMenuLink asChild>
            <Link
                ref={ref}
                href={href}
                className={cn(
                    'group flex items-center gap-2 rounded-2xl py-2 px-3 text-sm font-medium transition-colors hover:text-primary',
                    className,
                )}
                {...props}
            >
                {icon && (
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">
                        {icon}
                    </span>
                )}
                {children}
            </Link>
        </NavigationMenuLink>
    )
})
SimpleListItem.displayName = 'SimpleListItem'
