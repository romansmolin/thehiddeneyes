import { WalletPage } from '@/views/wallet-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'TheHiddenEyes — Wallet',
    description: 'Manage your credits and view recent transactions on TheHiddenEyes.',
}

export default function WalletPageRoute() {
    return <WalletPage />
}
