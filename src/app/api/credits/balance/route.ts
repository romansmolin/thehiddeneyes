import { NextRequest, NextResponse } from 'next/server'
import { resolveAppUserId } from '@/shared/lib/auth/resolve-app-user-id'
import { container } from '@/shared/lib/di/container.server'
import { GetBalanceUseCase } from '@/entities/credit/api/server/use-cases/get-balance.usecase'

/**
 * GET /api/credits/balance - Get user's credit balance
 */
export async function GET(request: NextRequest) {
    try {
        const userId = await resolveAppUserId(request)

        const useCase = container.get(GetBalanceUseCase)
        const credits = await useCase.execute(userId)

        return NextResponse.json({
            balance: credits.balance,
            userId: credits.userId,
        })
    } catch (error: any) {
        console.error('Get balance error:', error)
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 },
        )
    }
}
