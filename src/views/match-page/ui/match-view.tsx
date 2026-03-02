'use client'

import { Heart, RotateCcw, X } from 'lucide-react'
import { useMatchSwipe } from '@/features/match/swipe'
import { SwipeMatchCard } from '@/features/match/swipe'
import { CompatibilityScore } from '@/features/match/compatibility'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

export function MatchView() {
    const {
        currentCandidate,
        isDiscoverLoading,
        discoverErrorMessage,
        actionErrorMessage,
        feedbackMessage,
        isSubmittingSwipe,
        submitSwipe,
        reloadProposals,
    } = useMatchSwipe()

    return (
        <div className="mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Discover People</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                    {isDiscoverLoading ? (
                        <div className=" w-full max-w-sm animate-pulse rounded-2xl bg-muted" />
                    ) : discoverErrorMessage ? (
                        <div className="w-full rounded-2xl p-6 text-center">
                            <p className="text-sm text-destructive">{discoverErrorMessage}</p>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-4"
                                onClick={reloadProposals}
                            >
                                Retry
                            </Button>
                        </div>
                    ) : currentCandidate ? (
                        <>
                            <div className="flex items-center gap-4 sm:gap-8">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    disabled={isSubmittingSwipe}
                                    onClick={() => void submitSwipe('dislike')}
                                    className="size-14 shrink-0 rounded-full border-2 border-rose-400 text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950"
                                >
                                    <X className="size-6" />
                                    <span className="sr-only">Pass</span>
                                </Button>

                                <SwipeMatchCard
                                    candidate={currentCandidate}
                                    disabled={isSubmittingSwipe}
                                    onSwipe={submitSwipe}
                                />

                                <Button
                                    type="button"
                                    size="icon"
                                    disabled={isSubmittingSwipe}
                                    onClick={() => void submitSwipe('like')}
                                    className="size-14 shrink-0 rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
                                >
                                    <Heart className="size-6" />
                                    <span className="sr-only">Like</span>
                                </Button>
                            </div>

                            <CompatibilityScore candidate={currentCandidate} />
                        </>
                    ) : (
                        <div className="w-full rounded-2xl border border-border p-8 text-center">
                            <p className="text-sm text-muted-foreground">
                                No more profiles to show.
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-4"
                                onClick={reloadProposals}
                            >
                                <RotateCcw className="mr-2 size-4" />
                                Refresh
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {feedbackMessage ? (
                <p className="rounded-lg bg-emerald-500/10 px-4 py-2 text-center text-sm text-emerald-600 dark:text-emerald-400">
                    {feedbackMessage}
                </p>
            ) : null}

            {actionErrorMessage ? (
                <p className="rounded-lg bg-rose-500/10 px-4 py-2 text-center text-sm text-rose-600 dark:text-rose-400">
                    {actionErrorMessage}
                </p>
            ) : null}
        </div>
    )
}
