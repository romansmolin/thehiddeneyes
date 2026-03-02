import { DashboardPage } from '@/views/dashboard-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'TheHiddenEyes — Dashboard',
    description: 'View your dashboard and key metrics.',
}

export default function DashboardPageRoute() {
    return <DashboardPage />
}
