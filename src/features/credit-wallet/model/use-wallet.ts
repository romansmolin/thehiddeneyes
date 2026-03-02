import { useCallback, useEffect, useState } from 'react'
import { getWallet, type WalletResponse } from '../api/client/services/wallet.service'

export function useWallet() {
    const [wallet, setWallet] = useState<WalletResponse | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const refreshWallet = useCallback(async () => {
        setIsLoading(true)
        try {
            const response = await getWallet()
            setWallet(response)
        } catch (error) {
            console.error('Failed to load wallet:', error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        void refreshWallet()
    }, [refreshWallet])

    return {
        wallet,
        isLoading,
        refreshWallet,
    }
}
