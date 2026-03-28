'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    useAnalyzeUserProfileMutation,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
} from '@/entities/user/api/client/endpoints'
import type {
    AnalyzeProfileRequest,
    AnalyzeProfileResponse,
    UpdateProfileRequest,
    UserProfile,
} from '@/entities/user/model/types'

type ProfileFormValues = {
    fullName: string
    email: string
    description: string
    height: string
    weight: string
    eyeColor: string
    hairColor: string
    situation: string
    silhouette: string
    personality: string
    schedule: string
    orientation: string
    children: string
    education: string
    profession: string
}

type MutationError = {
    data?: {
        message?: string
        fields?: Array<{ field: string; message: string }>
    }
    message?: string
    error?: string
}

const parseOptionalString = (value: string): string | undefined => {
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : undefined
}

const parseOptionalInteger = (value: string): number | undefined => {
    const trimmed = value.trim()
    if (!trimmed) return undefined

    const parsed = Number(trimmed)
    if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) {
        return undefined
    }

    return parsed
}

const toFieldValue = (value?: string | number): string => {
    if (value === undefined || value === 0) return ''
    return String(value)
}

const toDefaultValues = (profile?: UserProfile): ProfileFormValues => ({
    fullName: profile?.fullName ?? profile?.username ?? '',
    email: profile?.email ?? '',
    description: profile?.description ?? '',
    height: toFieldValue(profile?.height),
    weight: toFieldValue(profile?.weight),
    eyeColor: toFieldValue(profile?.eyeColor),
    hairColor: toFieldValue(profile?.hairColor),
    situation: toFieldValue(profile?.situation),
    silhouette: toFieldValue(profile?.silhouette),
    personality: toFieldValue(profile?.personality),
    schedule: toFieldValue(profile?.schedule),
    orientation: toFieldValue(profile?.orientation),
    children: toFieldValue(profile?.children),
    education: toFieldValue(profile?.education),
    profession: toFieldValue(profile?.profession),
})

const toUpdatePayload = (values: ProfileFormValues): UpdateProfileRequest => ({
    fullName: values.fullName.trim(),
    email: parseOptionalString(values.email),
    description: values.description,
    height: parseOptionalInteger(values.height),
    weight: parseOptionalInteger(values.weight),
    eyeColor: parseOptionalInteger(values.eyeColor),
    hairColor: parseOptionalInteger(values.hairColor),
    situation: parseOptionalInteger(values.situation),
    silhouette: parseOptionalInteger(values.silhouette),
    personality: parseOptionalInteger(values.personality),
    schedule: parseOptionalInteger(values.schedule),
    orientation: parseOptionalInteger(values.orientation),
    children: parseOptionalInteger(values.children),
    education: parseOptionalInteger(values.education),
    profession: parseOptionalInteger(values.profession),
})

const toAnalyzePayload = (values: ProfileFormValues): AnalyzeProfileRequest => ({
    fullName: parseOptionalString(values.fullName),
    email: parseOptionalString(values.email),
    description: parseOptionalString(values.description),
    height: parseOptionalInteger(values.height),
    weight: parseOptionalInteger(values.weight),
    eyeColor: parseOptionalInteger(values.eyeColor),
    hairColor: parseOptionalInteger(values.hairColor),
    situation: parseOptionalInteger(values.situation),
    silhouette: parseOptionalInteger(values.silhouette),
    personality: parseOptionalInteger(values.personality),
    schedule: parseOptionalInteger(values.schedule),
    orientation: parseOptionalInteger(values.orientation),
    children: parseOptionalInteger(values.children),
    education: parseOptionalInteger(values.education),
    profession: parseOptionalInteger(values.profession),
})

export const useProfileForm = () => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [isAnalysisDialogOpen, setIsAnalysisDialogOpen] = useState(false)
    const [analysisResult, setAnalysisResult] = useState<AnalyzeProfileResponse | null>(null)
    const [analysisError, setAnalysisError] = useState<string | null>(null)
    const profileQuery = useGetUserProfileQuery()
    const [updateProfile, updateProfileResult] = useUpdateUserProfileMutation()
    const [analyzeProfile, analyzeProfileResult] = useAnalyzeUserProfileMutation()

    const form = useForm<ProfileFormValues>({
        defaultValues: toDefaultValues(),
    })

    useEffect(() => {
        if (!profileQuery.data?.user) return
        form.reset(toDefaultValues(profileQuery.data.user))
    }, [form, profileQuery.data?.user])

    const onSubmit = form.handleSubmit(async (values) => {
        setSuccessMessage(null)
        form.clearErrors('root')

        if (values.fullName.trim().length === 0) {
            form.setError('fullName', {
                type: 'validate',
                message: 'Full name is required.',
            })
            return
        }

        try {
            await updateProfile(toUpdatePayload(values)).unwrap()
            setSuccessMessage('Profile saved successfully.')
        } catch (error) {
            const parsed = error as MutationError
            const fields = parsed.data?.fields ?? []

            fields.forEach(({ field, message }) => {
                const key = field as keyof ProfileFormValues
                if (key in values) {
                    form.setError(key, { type: 'server', message })
                }
            })

            form.setError('root', {
                type: 'server',
                message:
                    parsed.data?.message ??
                    parsed.error ??
                    parsed.message ??
                    'Unable to update profile right now.',
            })
        }
    })

    const onAnalyze = async () => {
        setAnalysisError(null)
        setAnalysisResult(null)
        setIsAnalysisDialogOpen(true)

        try {
            const response = await analyzeProfile(toAnalyzePayload(form.getValues())).unwrap()
            setAnalysisResult(response)
        } catch (error) {
            const parsed = error as MutationError

            setAnalysisResult(null)
            setAnalysisError(
                parsed.data?.message ??
                    parsed.error ??
                    parsed.message ??
                    'Unable to analyze profile right now.',
            )
        }
    }

    return {
        ...form,
        profile: profileQuery.data?.user,
        isLoadingProfile: profileQuery.isLoading,
        isLoadingProfileError: profileQuery.isError,
        profileError: profileQuery.error,
        refetchProfile: () => profileQuery.refetch(),
        isSaving: updateProfileResult.isLoading,
        successMessage,
        isAnalysisDialogOpen,
        setIsAnalysisDialogOpen,
        analysisResult,
        analysisError,
        isAnalyzing: analyzeProfileResult.isLoading,
        onSubmit,
        onAnalyze,
    }
}
