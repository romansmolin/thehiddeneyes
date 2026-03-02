import { NextRequest } from 'next/server'
import { asyncHandler } from '@/shared/http/async-handler'
import { container } from '@/shared/lib/di/container.server'
import { SecureProcessorWebhookController } from '@/entities/payment/api/server/controller/secure-processor-webhook.controller'

export const runtime = 'nodejs'

/**
 * POST /api/payments/secure-processor/webhook - Payment webhook callback
 */
export const POST = asyncHandler(async (req: NextRequest) => {
    const controller = container.get(SecureProcessorWebhookController)
    return await controller.handle(req)
})
