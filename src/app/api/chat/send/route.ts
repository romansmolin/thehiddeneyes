import { NextRequest } from 'next/server'
import { container } from '@/shared/lib/di/container.server'
import { ChatController } from '@/entities/chat'
import { asyncHandler } from '@/shared/http/async-handler'

export const POST = asyncHandler(async (request: NextRequest) => {
    const controller = container.get(ChatController)
    return controller.postSend(request)
})
