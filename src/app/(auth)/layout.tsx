import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import { Providers } from '../providers'
import { ReactNode } from 'react'

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
    description: 'TheHiddenEyes — find meaningful connections built on compatibility and shared values.',
}

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers>
                    <div className="flex min-h-screen items-center justify-center p-4">
                        <div className="w-full max-w-xl">{children}</div>
                    </div>
                </Providers>
            </body>
        </html>
    )
}
