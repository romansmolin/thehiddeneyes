import { LandingPage } from '@/views/landing-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'TheHiddenEyes',
    description: 'TheHiddenEyes — a dating platform built around values, compatibility, and real conversation.',
}

export default function Home() {
    return <LandingPage />
}
