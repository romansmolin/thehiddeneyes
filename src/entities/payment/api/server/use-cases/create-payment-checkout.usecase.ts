import { inject, injectable } from 'inversify'
import type { IPaymentTokenRepository } from '../interfaces/payment-token-repository.interface'
import type { PaymentGatewayAdapter } from '../interfaces/payment-gateway.interface'
import type { PaymentToken } from '../../../model/types'
import { isSecureProcessorTestMode } from '../adapters/secure-processor.adapter'

export type CreatePaymentCheckoutInput = {
    userId: string
    amountCents: number
    currency: string
    description: string
    returnUrl: string
    metadata: Record<string, string>
}

export type CreatePaymentCheckoutResult = {
    checkoutToken: string
    redirectUrl?: string
    paymentToken: PaymentToken
}

@injectable()
export class CreatePaymentCheckoutUseCase {
    constructor(
        @inject('IPaymentTokenRepository') private paymentTokenRepo: IPaymentTokenRepository,
        @inject('PaymentGatewayAdapter') private paymentGateway: PaymentGatewayAdapter,
    ) {}

    async execute(input: CreatePaymentCheckoutInput): Promise<CreatePaymentCheckoutResult> {
        const paymentToken = await this.paymentTokenRepo.create({
            userId: input.userId,
            status: 'CREATED',
            amountCents: input.amountCents,
            currency: input.currency,
        })

        const metadata = {
            ...input.metadata,
            payment_token_id: paymentToken.id,
            user_id: input.userId,
        }

        const returnUrl = new URL(input.returnUrl)
        returnUrl.searchParams.set('token', paymentToken.id)

        const checkout = await this.paymentGateway.createCheckout({
            amountCents: input.amountCents,
            currency: input.currency,
            description: input.description,
            returnUrl: returnUrl.toString(),
            customerId: input.userId,
            testMode: isSecureProcessorTestMode(),
            metadata,
        })

        const updated = await this.paymentTokenRepo.update(paymentToken.id, {
            status: 'PENDING',
            gatewayToken: checkout.checkoutToken,
            rawPayload: checkout.rawPayload,
        })

        return {
            checkoutToken: checkout.checkoutToken,
            redirectUrl: checkout.redirectUrl,
            paymentToken: updated,
        }
    }
}
