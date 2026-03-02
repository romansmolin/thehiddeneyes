// User UI
export { UserMenu } from './ui/user-menu'

// User Types
export type {
    User,
    UserGender,
    UserProfile,
    UserProfilePhoto,
    UserProfileResponse,
    UpdateProfileRequest,
    UpdateProfileResponse,
    AnalyzeProfileRequest,
    AnalyzeProfileResponse,
    ProfileAdviceItem,
    ProfileAdvicePriority,
    ProfileAdviceCategory,
} from './model/types'

// User utils
export { getUserInitials } from './utils/user-display'

// Client-side hooks
export {
    useGetCurrentUserQuery,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useAnalyzeUserProfileMutation,
} from './api/client/endpoints'

// Server-side exports (use with caution - only in server contexts)
export { GetCurrentUserController } from './api/server/controller/get-current-user.controller'
export { UserProfileController } from './api/server/controllers/user-profile.controller'
export { GetCurrentUserUseCase } from './api/server/use-cases/get-current-user.usecase'
export { PrismaUserRepository } from './api/server/repositories/prisma-user.repository'
export { UserProfileRepository } from './api/server/repositories/user-profile.repo'
export { UserProfileService } from './api/server/services/user-profile.service'
export { UserProfileAnalyzerService } from './api/server/services/user-profile-analyzer.service'
export type { IUserRepository } from './api/server/interfaces/user-repository.interface'
