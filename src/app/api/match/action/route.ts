import { NextRequest } from 'next/server'
import { container } from '@/shared/lib/di/container.server'
import { MatchController } from '@/entities/match'
import { asyncHandler } from '@/shared/http/async-handler'

export const POST = asyncHandler(async (request: NextRequest) => {
    const controller = container.get(MatchController)
    return controller.submitAction(request)
})
