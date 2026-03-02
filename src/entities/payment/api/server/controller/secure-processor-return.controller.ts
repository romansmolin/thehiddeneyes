import { inject, injectable } from 'inversify'
import { NextRequest, NextResponse } from 'next/server'
import { UpdatePaymentFromReturnUseCase } from '../use-cases/update-payment-from-return.usecase'
import { AppError } from '@/shared/errors/app-error'

@injectable()
export class SecureProcessorReturnController {
    constructor(
        @inject(UpdatePaymentFromReturnUseCase)
        private useCase: UpdatePaymentFromReturnUseCase,
    ) {}

    async handle(req: NextRequest): Promise<NextResponse> {
        const { searchParams } = new URL(req.url)
        const token = searchParams.get('token')
        const status = searchParams.get('status')
        const uid = searchParams.get('uid')

        if (!token) {
            throw AppError.validationError('Missing payment token')
        }

        await this.useCase.execute({
            paymentTokenId: token,
            status,
            gatewayUid: uid,
            rawPayload: Object.fromEntries(searchParams.entries()),
        })

        const frontendUrl = process.env.FRONTEND_URL || process.env.NEXT_PUBLIC_APP_URL
        if (frontendUrl) {
            const redirectUrl = new URL('/wallet', frontendUrl)
            if (status) redirectUrl.searchParams.set('status', status)
            if (token) redirectUrl.searchParams.set('token', token)
            if (uid) redirectUrl.searchParams.set('uid', uid)
            return NextResponse.redirect(redirectUrl)
        }

        return NextResponse.json({ status: status ?? 'pending' })
    }
}
