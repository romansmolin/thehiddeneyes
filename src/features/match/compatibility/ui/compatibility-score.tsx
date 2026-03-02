'use client'

import { Sparkles, Loader2 } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { useCompatibilityScoreMutation } from '@/entities/match/api/client/endpoints'
import type { MatchCandidate } from '@/entities/match/model/types'

const getScoreColor = (score: number): string => {
    if (score >= 75) return 'text-emerald-600'
    if (score >= 50) return 'text-amber-600'
    return 'text-rose-600'
}

const getScoreBg = (score: number): string => {
    if (score >= 75) return 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800'
    if (score >= 50) return 'bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800'
    return 'bg-rose-50 border-rose-200 dark:bg-rose-950/30 dark:border-rose-800'
}

export function CompatibilityScore({ candidate }: { candidate: MatchCandidate }) {
    const [checkCompatibility, { data, isLoading, error, reset }] =
        useCompatibilityScoreMutation()

    const handleCheck = () => {
        checkCompatibility({
            candidateId: candidate.id,
            candidateUsername: candidate.username,
            candidateAge: candidate.age,
            candidateGender: candidate.gender,
            candidateLocation: candidate.location,
        })
    }

    if (isLoading) {
        return (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Analyzing compatibility…
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center gap-3">
                <p className="text-xs text-destructive">Could not load score.</p>
                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={reset}>
                    Retry
                </Button>
            </div>
        )
    }

    if (data) {
        return (
            <div className={`w-full max-w-sm rounded-2xl border p-4 ${getScoreBg(data.score)}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Sparkles className={`size-4 ${getScoreColor(data.score)}`} />
                        <span className="text-sm font-semibold">AI Compatibility</span>
                    </div>
                    <span className={`text-2xl font-bold tabular-nums ${getScoreColor(data.score)}`}>
                        {data.score}%
                    </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{data.summary}</p>
                <ul className="mt-3 space-y-1">
                    {data.reasons.map((reason, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="mt-0.5 shrink-0 text-[10px]">•</span>
                            {reason}
                        </li>
                    ))}
                </ul>
                <Button variant="ghost" size="sm" className="mt-3 h-7 w-full text-xs" onClick={reset}>
                    Hide
                </Button>
            </div>
        )
    }

    return (
        <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-full"
            onClick={handleCheck}
        >
            <Sparkles className="size-4" />
            Check AI Compatibility
        </Button>
    )
}
