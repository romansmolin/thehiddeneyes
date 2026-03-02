import { redirect } from 'next/navigation'
import { getSession } from '@/shared/lib/auth/get-session'

import SidebarLayout from '@/widgets/sidebar/ui/sidebar'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import { Providers } from '../providers'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'TheHiddenEyes',
    description: 'TheHiddenEyes application.',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await getSession()

    if (!session) redirect('/auth')

    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers>
                    <SidebarLayout>
                        <main className="container mx-auto p-4 h-full">{children}</main>
                    </SidebarLayout>
                </Providers>
            </body>
        </html>
    )
}
