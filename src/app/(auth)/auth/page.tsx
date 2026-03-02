import { AuthTabs } from '@/widgets/auth-tabs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'TheHiddenEyes — Sign In or Sign Up',
    description: 'Access your TheHiddenEyes account or create a new one.',
}

export default function AuthPage() {
    return <AuthTabs />
}
