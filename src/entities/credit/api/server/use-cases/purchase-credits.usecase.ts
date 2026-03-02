import { inject, injectable } from 'inversify'
import type { ICreditRepository } from '../interfaces/credit-repository.interface'
import { AppError } from '@/shared/errors/app-error'
import { CreatePaymentCheckoutUseCase } from '@/entities/payment/api/server/use-cases/create-payment-checkout.usecase'

const CENTS_PER_CREDIT = 2
const DEFAULT_CURRENCY = 'EUR'

@injectable()
export class PurchaseCreditsUseCase {
    constructor(
        @inject('ICreditRepository') private creditRepo: ICreditRepository,
        @inject(CreatePaymentCheckoutUseCase)
        private paymentCheckoutUseCase: CreatePaymentCheckoutUseCase,
    ) {}

    async execute(userId: string, credits: number) {
        if (!Number.isInteger(credits) || credits <= 0) {
            throw AppError.validationError('Credits must be a positive integer')
        }

        const amountCents = credits * CENTS_PER_CREDIT

        const backendUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.FRONTEND_URL
        if (!backendUrl) {
            throw AppError.internalError('NEXT_PUBLIC_APP_URL is not configured')
        }

        await this.creditRepo.getOrCreateBalance(userId)

        const description = `Credit purchase: ${credits} credits`

        const checkout = await this.paymentCheckoutUseCase.execute({
            userId,
            amountCents,
            currency: DEFAULT_CURRENCY,
            description,
            returnUrl: `${backendUrl}/api/payments/secure-processor/return`,
            metadata: {
                reference_id: `credits:${credits}`,
            },
        })

        const paymentTokenId = checkout.paymentToken.id

        await this.creditRepo.createTransaction({
            userId,
            type: 'grant',
            amount: credits,
            status: 'PENDING',
            reason: description,
            paymentTokenId,
        })

        return {
            checkoutToken: checkout.checkoutToken,
            redirectUrl: checkout.redirectUrl,
        }
    }
}
