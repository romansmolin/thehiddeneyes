import { NextRequest } from 'next/server'
import { container } from '@/shared/lib/di/container.server'
import { UserProfileController } from '@/entities/user'
import { asyncHandler } from '@/shared/http/async-handler'

export const POST = asyncHandler(async (request: NextRequest) => {
    const controller = container.get(UserProfileController)
    return controller.postAnalyze(request)
})
