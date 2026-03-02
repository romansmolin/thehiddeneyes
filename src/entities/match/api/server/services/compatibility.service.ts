import 'server-only'

import { inject, injectable } from 'inversify'
import { z } from 'zod'
import { AppError } from '@/shared/errors/app-error'
import type { IOpenAiService } from '@/shared/lib/ai/openai/open-ai.interface'
import type { CompatibilityRequest, CompatibilityResponse } from '@/entities/match/model/types'
import { UserProfileRepository } from '@/entities/user'

const COMPATIBILITY_MODEL = 'gpt-4o-mini'

const COMPATIBILITY_SYSTEM_PROMPT = `You are a dating compatibility expert.
Given two dating profiles, rate their compatibility from 0 to 100 and explain why.
Focus on: age compatibility, lifestyle, location proximity, personality traits, and shared interests inferred from available data.
Be warm and encouraging. Keep the summary to 1–2 sentences. Give 3 concise reasons.
Return valid JSON only. No markdown, no explanations outside JSON.`

const compatibilityResponseSchema = z.object({
    score: z.number().int().min(0).max(100),
    summary: z.string().trim().min(1),
    reasons: z.array(z.string().trim().min(1)).min(1).max(5),
})

const compatibilityResponseJsonSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        score: { type: 'integer', minimum: 0, maximum: 100 },
        summary: { type: 'string', minLength: 1 },
        reasons: {
            type: 'array',
            minItems: 1,
            maxItems: 5,
            items: { type: 'string', minLength: 1 },
        },
    },
    required: ['score', 'summary', 'reasons'],
} as const

const toNumber = (value?: number | string): number | undefined => {
    if (typeof value === 'number') return Number.isFinite(value) ? value : undefined
    if (typeof value === 'string') {
        const parsed = Number(value.trim())
        return Number.isFinite(parsed) ? parsed : undefined
    }
    return undefined
}

const toInteger = (value?: number | string): number | undefined => {
    const parsed = toNumber(value)
    if (parsed === undefined || !Number.isInteger(parsed)) return undefined
    return parsed
}

const normalizeText = (value?: string | null): string | undefined => {
    if (!value) return undefined
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : undefined
}

const mapGender = (value?: number | string): string | undefined => {
    const g = toInteger(value)
    if (g === 1) return 'man'
    if (g === 2) return 'woman'
    if (g === 3) return 'couple'
    return undefined
}

const isConnectedZero = (value?: number | string): boolean => toInteger(value) === 0

type RawProfile = Record<string, unknown>

const asNumberOrString = (value: unknown): number | string | undefined => {
    if (typeof value === 'number' || typeof value === 'string') return value
    return undefined
}

const asString = (value: unknown): string | null | undefined => {
    if (typeof value === 'string') return value
    return undefined
}

const buildCurrentUserSummary = (profile: RawProfile): string => {
    const parts: string[] = []

    const age = toInteger(asNumberOrString(profile.age))
    if (age) parts.push(`Age: ${age}`)

    const gender = mapGender(asNumberOrString(profile.sexe1))
    if (gender) parts.push(`Gender: ${gender}`)

    const location = normalizeText(asString(profile.zone_name))
    if (location) parts.push(`Location: ${location}`)

    const description = normalizeText(asString(profile.description))
    if (description) parts.push(`About: ${description}`)

    const height = toInteger(asNumberOrString(profile.taille))
    if (height) parts.push(`Height: ${height} cm`)

    const weight = toInteger(asNumberOrString(profile.poids))
    if (weight) parts.push(`Weight: ${weight} kg`)

    const situation = toInteger(asNumberOrString(profile.situation))
    if (situation) parts.push(`Relationship status code: ${situation}`)

    const personality = toInteger(asNumberOrString(profile.personnalite))
    if (personality) parts.push(`Personality code: ${personality}`)

    const children = toInteger(asNumberOrString(profile.child))
    if (children !== undefined) parts.push(`Children code: ${children}`)

    return parts.length > 0 ? parts.join('\n') : 'No profile data available'
}

const buildCandidateSummary = (candidate: CompatibilityRequest): string => {
    const parts: string[] = [`Username: ${candidate.candidateUsername}`]

    if (candidate.candidateAge) parts.push(`Age: ${candidate.candidateAge}`)
    if (candidate.candidateGender) parts.push(`Gender: ${candidate.candidateGender}`)
    if (candidate.candidateLocation) parts.push(`Location: ${candidate.candidateLocation}`)

    return parts.join('\n')
}

const buildUserPrompt = (
    currentUserSummary: string,
    candidateSummary: string,
): string => `Rate the compatibility between these two people.

Person A (current user):
${currentUserSummary}

Person B (candidate):
${candidateSummary}`

@injectable()
export class CompatibilityService {
    constructor(
        @inject(UserProfileRepository) private profileRepository: UserProfileRepository,
        @inject('IOpenAiService') private openAiService: IOpenAiService,
    ) {}

    async getCompatibilityScore(
        sessionId: string,
        userId: number,
        candidate: CompatibilityRequest,
    ): Promise<CompatibilityResponse> {
        const profilePayload = await this.profileRepository.getProfile({
            sessionId,
            userId,
        })

        if (isConnectedZero(profilePayload.connected)) {
            throw AppError.authenticationError('Session expired')
        }

        const currentUserSummary = profilePayload.result
            ? buildCurrentUserSummary(profilePayload.result)
            : 'No profile data available'

        const candidateSummary = buildCandidateSummary(candidate)
        const userPrompt = buildUserPrompt(currentUserSummary, candidateSummary)

        try {
            const result = await this.openAiService.chatJson<
                z.infer<typeof compatibilityResponseSchema>
            >({
                model: COMPATIBILITY_MODEL,
                messages: [
                    { role: 'system', content: COMPATIBILITY_SYSTEM_PROMPT },
                    { role: 'user', content: userPrompt },
                ],
                schema: compatibilityResponseJsonSchema,
            })

            if (!result.ok || !result.data) {
                throw AppError.internalError('AI compatibility service returned invalid response')
            }

            const parsed = compatibilityResponseSchema.safeParse(result.data)

            if (!parsed.success) {
                throw AppError.internalError('AI compatibility service returned invalid response')
            }

            return {
                score: parsed.data.score,
                summary: parsed.data.summary,
                reasons: parsed.data.reasons,
            }
        } catch (error) {
            if (error instanceof AppError) throw error

            console.error('[CompatibilityService] OpenAI request failed', error)
            throw AppError.internalError('AI compatibility service is temporarily unavailable')
        }
    }
}
