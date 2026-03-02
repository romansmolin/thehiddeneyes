import { api } from '@/shared/api/client/api'
import { getCurrentUser } from './services/get-current-user.service'
import { analyzeUserProfile, getUserProfile, updateUserProfile } from './services/profile.service'
import { UserResponseDto } from '../server/contracts/user-response.dto'
import { normalizeError } from '@/shared/api/client/error-normalizer'
import type {
    AnalyzeProfileRequest,
    AnalyzeProfileResponse,
    UpdateProfileRequest,
    UpdateProfileResponse,
    UserProfileResponse,
} from '@/entities/user/model/types'

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<UserResponseDto, void>({
            queryFn: async () => {
                try {
                    const data = await getCurrentUser()
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: normalized,
                            error: normalized.message,
                        },
                    }
                }
            },
            providesTags: ['User'],
        }),
        getUserProfile: builder.query<UserProfileResponse, void>({
            queryFn: async () => {
                try {
                    const data = await getUserProfile()
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: normalized,
                            error: normalized.message,
                        },
                    }
                }
            },
            providesTags: ['User'],
        }),
        updateUserProfile: builder.mutation<UpdateProfileResponse, UpdateProfileRequest>({
            queryFn: async (payload) => {
                try {
                    const data = await updateUserProfile(payload)
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: normalized,
                            error: normalized.message,
                        },
                    }
                }
            },
            invalidatesTags: ['User'],
        }),
        analyzeUserProfile: builder.mutation<AnalyzeProfileResponse, AnalyzeProfileRequest>({
            queryFn: async (payload) => {
                try {
                    const data = await analyzeUserProfile(payload)
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: normalized,
                            error: normalized.message,
                        },
                    }
                }
            },
        }),
    }),
})

export const {
    useGetCurrentUserQuery,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useAnalyzeUserProfileMutation,
} = userApi
