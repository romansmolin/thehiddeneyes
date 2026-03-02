import { NextRequest } from 'next/server'
import { asyncHandler } from '@/shared/http/async-handler'
import { container } from '@/shared/lib/di/container.server'
import { resolveAppUserId } from '@/shared/lib/auth/resolve-app-user-id'
import { GetWalletController } from '@/entities/credit/api/server/controller/get-wallet.controller'

/**
 * GET /api/credits/wallet - Get user's wallet balance and transactions
 */
export const GET = asyncHandler(async (request: NextRequest) => {
    const userId = await resolveAppUserId(request)

    const controller = container.get(GetWalletController)
    return await controller.handle(userId)
})
