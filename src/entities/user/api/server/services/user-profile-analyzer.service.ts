import 'server-only'

import { inject, injectable } from 'inversify'
import { z } from 'zod'
import { AppError } from '@/shared/errors/app-error'
import type { IOpenAiService } from '@/shared/lib/ai/openai/open-ai.interface'
import type {
    AnalyzeProfileRequest,
    AnalyzeProfileResponse,
    ProfileAdviceItem,
    ProfileAdvicePriority,
} from '@/entities/user/model/types'
import {
    UserProfileRepository,
    type ProfileBlock,
    type ProfilePhotoLegacy,
    type ProfilePhotoV2,
} from '../repositories/user-profile.repo'

const PROFILE_ANALYZER_MAX_ITEMS = 10
const PROFILE_ANALYZER_MODEL = 'gpt-4o-mini'

const PROFILE_ANALYZER_SYSTEM_PROMPT = `You are a dating profile optimization expert.
Analyze the provided dating profile data and return a prioritized list of improvements.
Focus on: profile photo quality signals, bio quality, completeness of details, and engagement potential.
Return valid JSON only. No markdown, no explanations outside JSON.`

const adviceItemSchema = z.object({
    id: z.string().trim().min(1),
    title: z.string().trim().min(1),
    priority: z.enum(['high', 'medium', 'low']),
    category: z.enum(['photo', 'bio', 'details', 'engagement']),
    reason: z.string().trim().min(1),
    action: z.string().trim().min(1),
    example: z.string().trim().min(1).nullable(),
})

const adviceResponseSchema = z.object({
    summary: z.string().trim().min(1),
    checklist: z.array(adviceItemSchema).min(1),
})

const adviceResponseJsonSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        summary: { type: 'string', minLength: 1 },
        checklist: {
            type: 'array',
            minItems: 1,
            items: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    id: { type: 'string', minLength: 1 },
                    title: { type: 'string', minLength: 1 },
                    priority: { type: 'string', enum: ['high', 'medium', 'low'] },
                    category: { type: 'string', enum: ['photo', 'bio', 'details', 'engagement'] },
                    reason: { type: 'string', minLength: 1 },
                    action: { type: 'string', minLength: 1 },
                    example: { type: ['string', 'null'], minLength: 1 },
                },
                required: ['id', 'title', 'priority', 'category', 'reason', 'action', 'example'],
            },
        },
    },
    required: ['summary', 'checklist'],
} as const

type MergedProfileData = AnalyzeProfileRequest & { avatarUrl?: string }

const priorityOrder: Record<ProfileAdvicePriority, number> = {
    high: 0,
    medium: 1,
    low: 2,
}

const normalizeText = (value?: string | null): string | undefined => {
    if (!value) return undefined
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : undefined
}

const toNumber = (value?: number | string): number | undefined => {
    if (typeof value === 'number') return Number.isFinite(value) ? value : undefined
    if (typeof value === 'string') {
        const trimmed = value.trim()
        if (!trimmed) return undefined
        const parsed = Number(trimmed)
        return Number.isFinite(parsed) ? parsed : undefined
    }
    return undefined
}

const toInteger = (value?: number | string): number | undefined => {
    const parsed = toNumber(value)
    if (parsed === undefined || !Number.isInteger(parsed)) return undefined
    return parsed
}

const isConnectedZero = (value?: number | string): boolean => {
    return toInteger(value) === 0
}

const resolveAvatarFromPhotoV2 = (photo?: ProfilePhotoV2): string | undefined =>
    normalizeText(photo?.sq_430) ?? normalizeText(photo?.normal) ?? normalizeText(photo?.sq_middle)

const resolveAvatarFromLegacyPhoto = (photo?: ProfilePhotoLegacy): string | undefined =>
    normalizeText(photo?.url_big) ?? normalizeText(photo?.url_middle) ?? normalizeText(photo?.url_small)

const resolveAvatarUrl = (profile: ProfileBlock): string | undefined => {
    const v2Avatar = resolveAvatarFromPhotoV2(profile.photos_v2?.[0])
    if (v2Avatar) return v2Avatar
    return resolveAvatarFromLegacyPhoto(profile.photos?.[0])
}

const toBaseProfileData = (profile: ProfileBlock): MergedProfileData => ({
    fullName: normalizeText(profile.nom_complet) ?? normalizeText(profile.prenom),
    email: normalizeText(profile.email),
    description: normalizeText(profile.description),
    height: toInteger(profile.taille),
    weight: toInteger(profile.poids),
    eyeColor: toInteger(profile.yeux),
    hairColor: toInteger(profile.cheveux),
    situation: toInteger(profile.situation),
    silhouette: toInteger(profile.silhouette),
    personality: toInteger(profile.personnalite),
    schedule: toInteger(profile.horaires),
    orientation: toInteger(profile.sexe2),
    children: toInteger(profile.child),
    education: toInteger(profile.etudes),
    profession: toInteger(profile.travail),
    avatarUrl: resolveAvatarUrl(profile),
})

const mergeProfileData = (
    base: MergedProfileData,
    draft: AnalyzeProfileRequest,
): MergedProfileData => ({
    ...base,
    ...Object.fromEntries(Object.entries(draft).filter(([, value]) => value !== undefined)),
})

const toPromptPayload = (data: MergedProfileData): string => {
    const payload = {
        fullName: data.fullName,
        email: data.email,
        description: data.description,
        height: data.height,
        weight: data.weight,
        eyeColor: data.eyeColor,
        hairColor: data.hairColor,
        situation: data.situation,
        silhouette: data.silhouette,
        personality: data.personality,
        schedule: data.schedule,
        orientation: data.orientation,
        children: data.children,
        education: data.education,
        profession: data.profession,
        hasAvatar: Boolean(data.avatarUrl),
    }

    return `Analyze this dating profile draft and return prioritized improvements.\n\nProfile JSON:\n${JSON.stringify(payload, null, 2)}`
}

const toSortedChecklist = (
    input: z.infer<typeof adviceResponseSchema>['checklist'],
): AnalyzeProfileResponse['checklist'] => {
    const toAdviceItem = (
        item: z.infer<typeof adviceResponseSchema>['checklist'][number],
    ): ProfileAdviceItem => {
        if (item.example === null) {
            return {
                id: item.id,
                title: item.title,
                priority: item.priority,
                category: item.category,
                reason: item.reason,
                action: item.action,
            }
        }

        return {
            id: item.id,
            title: item.title,
            priority: item.priority,
            category: item.category,
            reason: item.reason,
            action: item.action,
            example: item.example,
        }
    }

    return [...input]
        .sort((left, right) => priorityOrder[left.priority] - priorityOrder[right.priority])
        .slice(0, PROFILE_ANALYZER_MAX_ITEMS)
        .map(toAdviceItem)
}

@injectable()
export class UserProfileAnalyzerService {
    constructor(
        @inject(UserProfileRepository) private repository: UserProfileRepository,
        @inject('IOpenAiService') private openAiService: IOpenAiService,
    ) {}

    async analyzeProfile(
        sessionId: string,
        userId: number,
        draft: AnalyzeProfileRequest,
    ): Promise<AnalyzeProfileResponse> {
        const profilePayload = await this.repository.getProfile({
            sessionId,
            userId,
            withPhotos: true,
        })

        if (isConnectedZero(profilePayload.connected)) {
            throw AppError.authenticationError('Session expired')
        }

        if (!profilePayload.result) {
            throw AppError.notFoundError('Profile not found')
        }

        const mergedData = mergeProfileData(toBaseProfileData(profilePayload.result), draft)
        const userPrompt = toPromptPayload(mergedData)

        try {
            const result = await this.openAiService.chatJson<z.infer<typeof adviceResponseSchema>>({
                model: PROFILE_ANALYZER_MODEL,
                messages: [
                    { role: 'system', content: PROFILE_ANALYZER_SYSTEM_PROMPT },
                    { role: 'user', content: userPrompt },
                ],
                schema: adviceResponseJsonSchema,
            })

            if (!result.ok || !result.data) {
                throw AppError.internalError('AI analyzer returned invalid response')
            }

            const parsedAdvice = adviceResponseSchema.safeParse(result.data)

            if (!parsedAdvice.success) {
                throw AppError.internalError('AI analyzer returned invalid response')
            }

            return {
                summary: parsedAdvice.data.summary,
                checklist: toSortedChecklist(parsedAdvice.data.checklist),
            }
        } catch (error) {
            if (error instanceof AppError) {
                throw error
            }

            console.error('[UserProfileAnalyzerService] OpenAI request failed', error)
            throw AppError.internalError('AI analyzer is temporarily unavailable')
        }
    }
}
