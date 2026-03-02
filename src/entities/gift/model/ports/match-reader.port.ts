export type GiftMatchCandidate = {
    id: number
}

export type GiftMatchListResponse = {
    items: GiftMatchCandidate[]
}

export interface MatchReaderPort {
    listMatches(sessionId: string): Promise<GiftMatchListResponse>
}

export const GIFT_PORT_TOKENS = {
    MatchReaderPort: Symbol.for('gift.match-reader.port'),
} as const
