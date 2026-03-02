'use client'

import { useState } from 'react'
import type { MatchAction, MatchCandidate } from '@/entities/match/model/types'
import { useDiscoverMatchesQuery, useMatchActionMutation } from '@/entities/match/api/client/endpoints'

type MatchActionMutationError = {
    data?: {
        message?: string
    }
    message?: string
    error?: string
}

const getMutationErrorMessage = (error: unknown): string => {
    if (!error || typeof error !== 'object') {
        return 'Unable to send match action right now. Please try again.'
    }

    const parsed = error as MatchActionMutationError
    return (
        parsed.data?.message ??
        parsed.error ??
        parsed.message ??
        'Unable to send match action right now. Please try again.'
    )
}

const getDiscoverErrorMessage = (error: unknown): string => {
    if (!error || typeof error !== 'object') {
        return 'Unable to load match proposals.'
    }

    const parsed = error as MatchActionMutationError
    return parsed.data?.message ?? parsed.error ?? parsed.message ?? 'Unable to load match proposals.'
}

export const useMatchSwipe = () => {
    const discoverQuery = useDiscoverMatchesQuery({
        page: 1,
        perPage: 20,
    })
    const [submitMatchAction, submitMatchActionResult] = useMatchActionMutation()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
    const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(null)

    const candidates = discoverQuery.data?.items ?? []
    const currentCandidate: MatchCandidate | null = candidates[currentIndex] ?? null

    const submitSwipe = async (action: MatchAction): Promise<void> => {
        if (!currentCandidate || submitMatchActionResult.isLoading) return

        setFeedbackMessage(null)
        setActionErrorMessage(null)

        try {
            const response = await submitMatchAction({
                userId: currentCandidate.id,
                action,
            }).unwrap()

            if (response.isMatch) {
                setFeedbackMessage(`It is a match with ${currentCandidate.username}.`)
            } else if (action === 'like') {
                setFeedbackMessage(`You liked ${currentCandidate.username}.`)
            } else {
                setFeedbackMessage(`You passed on ${currentCandidate.username}.`)
            }

            setCurrentIndex((prev) => prev + 1)
        } catch (error) {
            setActionErrorMessage(getMutationErrorMessage(error))
        }
    }

    const reloadProposals = () => {
        setCurrentIndex(0)
        setFeedbackMessage(null)
        setActionErrorMessage(null)
        void discoverQuery.refetch()
    }

    return {
        currentCandidate,
        isDiscoverLoading: discoverQuery.isLoading,
        discoverErrorMessage: discoverQuery.isError
            ? getDiscoverErrorMessage(discoverQuery.error)
            : null,
        actionErrorMessage,
        feedbackMessage,
        isSubmittingSwipe: submitMatchActionResult.isLoading,
        submitSwipe,
        reloadProposals,
    }
}
