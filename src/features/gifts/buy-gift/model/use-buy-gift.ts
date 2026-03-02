'use client'

import { useState } from 'react'
import { useBuyGiftMutation } from '@/entities/gift/api/client/endpoints'

type BuyGiftMutationError = {
    data?: {
        message?: string
    }
    error?: string
    message?: string
}

type BuyGiftInput = {
    giftId: string
    giftName: string
}

const getErrorMessage = (error: unknown): string => {
    if (!error) return 'Unable to buy gift right now. Please try again.'

    const parsed = error as BuyGiftMutationError
    return (
        parsed.data?.message ??
        parsed.error ??
        parsed.message ??
        'Unable to buy gift right now. Please try again.'
    )
}

export const useBuyGift = () => {
    const [buyGiftMutation] = useBuyGiftMutation()
    const [isBuyingGiftId, setIsBuyingGiftId] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const clearMessages = () => {
        setSuccessMessage(null)
        setErrorMessage(null)
    }

    const buyGift = async ({ giftId, giftName }: BuyGiftInput): Promise<void> => {
        clearMessages()
        setIsBuyingGiftId(giftId)

        try {
            const response = await buyGiftMutation({ giftId }).unwrap()
            setSuccessMessage(
                `${giftName} added to your current gifts. ${response.remainingBalance} Lovity Coins left.`,
            )
        } catch (error) {
            setErrorMessage(getErrorMessage(error))
        } finally {
            setIsBuyingGiftId(null)
        }
    }

    return {
        buyGift,
        clearMessages,
        isBuyingGiftId,
        successMessage,
        errorMessage,
    }
}
