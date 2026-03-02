import { useCallback, useEffect, useState } from 'react'
import { getCreditBalance } from '../api/client/services/credit.service'

export function useCreditBalance() {
    const [balance, setBalance] = useState(0)

    const refreshBalance = useCallback(async () => {
        try {
            const { balance: nextBalance } = await getCreditBalance()
            setBalance(nextBalance)
        } catch (error) {
            console.error('Failed to load credit balance:', error)
        }
    }, [])

    useEffect(() => {
        void refreshBalance()
    }, [refreshBalance])

    return {
        balance,
        refreshBalance,
    }
}
