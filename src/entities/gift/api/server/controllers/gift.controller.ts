import { inject, injectable } from 'inversify'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { AppError } from '@/shared/errors/app-error'
import { GiftService } from '../services/gift.service'

const giftIdBodySchema = z.object({
    giftId: z.string().trim().min(1, 'giftId is required'),
})

const sendGiftBodySchema = z.object({
    recipientUserId: z.number().int().positive('recipientUserId must be a positive integer'),
    giftId: z.string().trim().min(1, 'giftId is required'),
})

const parseLimit = (value: string | null): number => {
    if (!value) return 20

    const parsed = Number.parseInt(value, 10)

    if (!Number.isFinite(parsed) || parsed < 1 || parsed > 100) {
        throw AppError.validationError('Invalid history limit', [
            { field: 'limit', message: 'limit must be an integer between 1 and 100' },
        ])
    }

    return parsed
}

@injectable()
export class GiftController {
    constructor(@inject(GiftService) private giftService: GiftService) {}

    private getSessionId(request: NextRequest): string {
        const sessionId = request.cookies.get('dating_session_id')?.value

        if (!sessionId) {
            throw AppError.authenticationError('Authentication required')
        }

        return sessionId
    }

    async getCatalog(_request: NextRequest, _userId: string): Promise<NextResponse> {
        void _request
        void _userId
        const response = await this.giftService.listCatalog()

        return NextResponse.json(response)
    }

    async getInventory(_request: NextRequest, userId: string): Promise<NextResponse> {
        void _request
        const response = await this.giftService.listInventory(userId)

        return NextResponse.json(response)
    }

    async getHistory(request: NextRequest, userId: string): Promise<NextResponse> {
        const { searchParams } = new URL(request.url)
        const limit = parseLimit(searchParams.get('limit'))

        const response = await this.giftService.listHistory(userId, limit)

        return NextResponse.json(response)
    }

    async buyGift(request: NextRequest, userId: string): Promise<NextResponse> {
        let body: unknown

        try {
            body = await request.json()
        } catch {
            throw AppError.validationError('Invalid JSON payload')
        }

        const parsed = giftIdBodySchema.safeParse(body)

        if (!parsed.success) {
            throw AppError.validationError(
                'Invalid gift buy payload',
                parsed.error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                })),
            )
        }

        const response = await this.giftService.buyGift({
            userId,
            giftId: parsed.data.giftId,
        })

        return NextResponse.json(response)
    }

    async sendGift(request: NextRequest, userId: string): Promise<NextResponse> {
        let body: unknown

        try {
            body = await request.json()
        } catch {
            throw AppError.validationError('Invalid JSON payload')
        }

        const parsed = sendGiftBodySchema.safeParse(body)

        if (!parsed.success) {
            throw AppError.validationError(
                'Invalid gift send payload',
                parsed.error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                })),
            )
        }

        const sessionId = this.getSessionId(request)
        const response = await this.giftService.sendGift({
            senderUserId: userId,
            recipientUserId: parsed.data.recipientUserId,
            giftId: parsed.data.giftId,
            sessionId,
        })

        return NextResponse.json(response)
    }
}
