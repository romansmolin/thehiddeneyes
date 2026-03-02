import { NextRequest } from 'next/server'
import { container } from '@/shared/lib/di/container.server'
import { GiftController } from '@/entities/gift'
import { resolveAppUserId } from '@/shared/lib/auth/resolve-app-user-id'
import { asyncHandler } from '@/shared/http/async-handler'

export const GET = asyncHandler(async (request: NextRequest) => {
    const userId = await resolveAppUserId(request)
    const controller = container.get(GiftController)
    return controller.getHistory(request, userId)
})
