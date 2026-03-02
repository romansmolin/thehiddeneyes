import { NextRequest } from 'next/server'
import { asyncHandler } from '@/shared/http/async-handler'
import { container } from '@/shared/lib/di/container.server'
import { SecureProcessorReturnController } from '@/entities/payment/api/server/controller/secure-processor-return.controller'

export const runtime = 'nodejs'

/**
 * GET /api/payments/secure-processor/return - Payment return callback
 */
export const GET = asyncHandler(async (req: NextRequest) => {
    const controller = container.get(SecureProcessorReturnController)
    return await controller.handle(req)
})
