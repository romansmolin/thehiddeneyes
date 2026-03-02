import { useCallback, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { purchaseCredits } from '../api/client/services/credit-purchase.service'

const PRESET_CREDITS = [100, 200, 500] as const
const CENTS_PER_CREDIT = 0.5 // 100 credits = 0.50 EUR

type UseCreditPurchaseOptions = {
    onCheckoutReady?: () => void
}

export function useCreditPurchase(options: UseCreditPurchaseOptions = {}) {
    const [selectedPreset, setSelectedPreset] = useState<number | null>(PRESET_CREDITS[0])
    const [customAmount, setCustomAmount] = useState<string>('')
    const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const parsedCustomAmount = useMemo(() => {
        if (!customAmount.trim()) return null
        const parsed = Number(customAmount)
        if (!Number.isFinite(parsed)) return null
        return parsed
    }, [customAmount])

    const customAmountCents = useMemo(() => {
        if (parsedCustomAmount === null) return null
        return Math.round(parsedCustomAmount * 100)
    }, [parsedCustomAmount])

    const customCredits = useMemo(() => {
        if (customAmountCents === null) return null
        if (customAmountCents <= 0) return null
        if (customAmountCents % CENTS_PER_CREDIT !== 0) return null
        return customAmountCents / CENTS_PER_CREDIT
    }, [customAmountCents])

    const customError = useMemo(() => {
        if (!customAmount.trim()) return null
        if (parsedCustomAmount === null) return 'Enter a valid amount'
        if (customAmountCents === null || customAmountCents <= 0) return 'Amount must be above €0'
        if (customAmountCents % CENTS_PER_CREDIT !== 0)
            return 'Amount must be in €0.005 increments (half cent)'
        return null
    }, [customAmount, parsedCustomAmount, customAmountCents])

    const selectedCredits = useMemo(() => {
        if (selectedPreset) return selectedPreset
        if (customCredits) return customCredits
        return null
    }, [selectedPreset, customCredits])

    const selectPreset = useCallback((credits: number) => {
        setSelectedPreset(credits)
        setCustomAmount('')
    }, [])

    const updateCustomAmount = useCallback((value: string) => {
        setSelectedPreset(null)
        setCustomAmount(value)
    }, [])

    const startPurchase = useCallback(async () => {
        if (!selectedCredits) {
            toast.error('Select a credits pack or enter a valid amount')
            return
        }

        if (customError) {
            toast.error(customError)
            return
        }

        setIsSubmitting(true)
        try {
            const response = await purchaseCredits(selectedCredits)
            if (!response.redirectUrl) {
                toast.error('Checkout URL is missing. Please try again.')
                return
            }

            setCheckoutUrl(response.redirectUrl)
            options.onCheckoutReady?.()
        } catch (error: any) {
            const message =
                error?.response?.data?.error?.message || 'Failed to start checkout'
            toast.error(message)
        } finally {
            setIsSubmitting(false)
        }
    }, [selectedCredits, customError, options])

    const closeCheckout = useCallback(() => {
        setCheckoutUrl(null)
    }, [])

    return {
        presets: PRESET_CREDITS,
        selectedPreset,
        customAmount,
        customCredits,
        customError,
        selectedCredits,
        checkoutUrl,
        isSubmitting,
        selectPreset,
        updateCustomAmount,
        startPurchase,
        closeCheckout,
    }
}
