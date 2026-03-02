'use client'

import { useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import type { MatchAction, MatchCandidate } from '@/entities/match/model/types'
import { getUserInitials } from '@/entities/user/utils/user-display'
import { cn } from '@/shared/lib/css/utils'

const SWIPE_THRESHOLD = 100

type SwipeMatchCardProps = {
    candidate: MatchCandidate
    disabled?: boolean
    onSwipe: (action: MatchAction) => Promise<void>
}

export const SwipeMatchCard = ({ candidate, disabled = false, onSwipe }: SwipeMatchCardProps) => {
    const [dragX, setDragX] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const pointerIdRef = useRef<number | null>(null)
    const startXRef = useRef(0)

    const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (disabled) return
        pointerIdRef.current = event.pointerId
        startXRef.current = event.clientX
        setIsDragging(true)
        event.currentTarget.setPointerCapture(event.pointerId)
    }

    const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (pointerIdRef.current !== event.pointerId) return
        setDragX(event.clientX - startXRef.current)
    }

    const releaseSwipe = async (deltaX: number) => {
        setIsDragging(false)
        setDragX(0)
        pointerIdRef.current = null
        if (Math.abs(deltaX) < SWIPE_THRESHOLD) return
        await onSwipe(deltaX > 0 ? 'like' : 'dislike')
    }

    const onPointerUp = async (event: ReactPointerEvent<HTMLDivElement>) => {
        if (pointerIdRef.current !== event.pointerId) return
        await releaseSwipe(dragX)
    }

    const onPointerCancel = () => {
        setIsDragging(false)
        setDragX(0)
        pointerIdRef.current = null
    }

    const showLike = dragX > 30
    const showNope = dragX < -30

    return (
        <div
            className={cn(
                'relative mx-auto w-full max-w-sm select-none overflow-hidden rounded-3xl shadow-2xl',
                {
                    'cursor-grab': !disabled,
                    'cursor-grabbing': isDragging && !disabled,
                    'opacity-60': disabled,
                },
            )}
            style={{
                transform: `translateX(${dragX}px) rotate(${dragX * 0.03}deg)`,
                transition: isDragging ? 'none' : 'transform 180ms ease-out',
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={(event) => void onPointerUp(event)}
            onPointerCancel={onPointerCancel}
        >
            {/* Photo */}
            {candidate.photoUrl ? (
                <img
                    src={candidate.photoUrl}
                    alt={`${candidate.username} profile photo`}
                    className="h-[540px] w-full object-cover"
                    draggable={false}
                />
            ) : (
                <div className="grid h-[540px] w-full place-items-center bg-muted">
                    <div className="grid size-24 place-items-center rounded-full bg-background text-3xl font-semibold ring-1 ring-border">
                        {getUserInitials(candidate.username)}
                    </div>
                </div>
            )}

            {/* Like tint */}
            <div
                className={cn(
                    'pointer-events-none absolute inset-0 bg-emerald-400/25 transition-opacity duration-100',
                    showLike ? 'opacity-100' : 'opacity-0',
                )}
            />

            {/* Nope tint */}
            <div
                className={cn(
                    'pointer-events-none absolute inset-0 bg-rose-400/25 transition-opacity duration-100',
                    showNope ? 'opacity-100' : 'opacity-0',
                )}
            />

            {/* LIKE stamp */}
            {showLike && (
                <span className="absolute left-5 top-8 -rotate-12 rounded-xl border-4 border-emerald-400 px-3 py-1 text-2xl font-black uppercase tracking-widest text-emerald-400">
                    LIKE
                </span>
            )}

            {/* NOPE stamp */}
            {showNope && (
                <span className="absolute right-5 top-8 rotate-12 rounded-xl border-4 border-rose-400 px-3 py-1 text-2xl font-black uppercase tracking-widest text-rose-400">
                    NOPE
                </span>
            )}

            {/* Gradient info overlay */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-6 pb-7 pt-24">
                <h2 className="text-3xl font-bold leading-tight text-white">
                    {candidate.username}
                    {candidate.age ? (
                        <span className="font-normal text-white/90">, {candidate.age}</span>
                    ) : null}
                </h2>
                {candidate.location ? (
                    <p className="mt-1 text-sm text-white/75">{candidate.location}</p>
                ) : null}
            </div>
        </div>
    )
}
