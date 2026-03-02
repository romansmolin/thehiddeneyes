import { apiClient } from '@/shared/api/client/axios.config'
import { UserResponseDto } from '../../server/contracts/user-response.dto'

export async function getCurrentUser(): Promise<UserResponseDto> {
    const response = await apiClient.get<{ data: UserResponseDto }>('/api/user/me')
    return response.data.data
}
