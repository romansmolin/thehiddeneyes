import { NextRequest } from 'next/server'
import { asyncHandler } from '@/shared/http/async-handler'
import { container } from '@/shared/lib/di/container.server'
import { resolveAppUserId } from '@/shared/lib/auth/resolve-app-user-id'
import { PurchaseCreditsController } from '@/entities/credit/api/server/controller/purchase-credits.controller'

/**
 * POST /api/credits/purchase - Create a credit purchase and return checkout token
 */
export const POST = asyncHandler(async (req: NextRequest) => {
    const userId = await resolveAppUserId(req)

    const controller = container.get(PurchaseCreditsController)
    return await controller.handle(req, userId)
})
