import { inject, injectable } from 'inversify'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { AppError } from '@/shared/errors/app-error'
import { CompatibilityService } from '../services/compatibility.service'

const compatibilityBodySchema = z.object({
    candidateId: z.number().int().positive(),
    candidateUsername: z.string().trim().min(1),
    candidateAge: z.number().int().positive().optional(),
    candidateGender: z.enum(['man', 'woman', 'couple']).optional(),
    candidateLocation: z.string().trim().min(1).optional(),
})

@injectable()
export class CompatibilityController {
    constructor(
        @inject(CompatibilityService) private compatibilityService: CompatibilityService,
    ) {}

    private getSessionId(request: NextRequest): string {
        const sessionId = request.cookies.get('dating_session_id')?.value
        if (!sessionId) throw AppError.authenticationError('Authentication required')
        return sessionId
    }

    private getUserId(request: NextRequest): number {
        const raw = request.cookies.get('dating_user_id')?.value
        if (!raw) throw AppError.authenticationError('Authentication required')
        const parsed = Number.parseInt(raw, 10)
        if (!Number.isFinite(parsed) || parsed < 1)
            throw AppError.authenticationError('Authentication required')
        return parsed
    }

    async score(request: NextRequest): Promise<NextResponse> {
        const sessionId = this.getSessionId(request)
        const userId = this.getUserId(request)

        let body: unknown

        try {
            body = await request.json()
        } catch {
            throw AppError.validationError('Invalid JSON payload')
        }

        const parsed = compatibilityBodySchema.safeParse(body)

        if (!parsed.success) {
            throw AppError.validationError(
                'Invalid compatibility request',
                parsed.error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                })),
            )
        }

        const result = await this.compatibilityService.getCompatibilityScore(
            sessionId,
            userId,
            parsed.data,
        )

        return NextResponse.json(result)
    }
}
