import { User } from '../../../model/types'

export interface UserResponseDto {
    id: string
    email: string
    name: string
    emailVerified: boolean
    createdAt: string
}

export function toUserResponseDto(user: User): UserResponseDto {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt.toISOString(),
    }
}
