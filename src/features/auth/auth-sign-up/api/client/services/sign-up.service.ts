import { apiClient } from '@/shared/api/client/axios.config'
import type { SignUpDto } from '@/features/auth/auth-sign-up/contracts/sign-up.dto'

export interface SignUpResponse {
    accepted: 1
    sessionId: string
    userId: string
    lang?: string
}

export async function signUp(data: SignUpDto): Promise<SignUpResponse> {
    const { consent: _consent, ...payload } = data
    const response = await apiClient.post<SignUpResponse>('/api/auth/sign-up', {
        username: payload.username.trim(),
        email: payload.email,
        password: payload.password,
        gender: payload.gender,
        lookingFor: payload.lookingFor,
        dateOfBirth: payload.dateOfBirth,
        city: payload.city?.trim() || undefined,
    })
    return response.data
}
