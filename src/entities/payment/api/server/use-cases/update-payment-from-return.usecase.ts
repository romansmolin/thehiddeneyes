import { inject, injectable } from 'inversify'
import type { IPaymentTokenRepository } from '../interfaces/payment-token-repository.interface'
import type { PaymentTokenStatus } from '../../../model/types'

export type UpdatePaymentFromReturnInput = {
    paymentTokenId: string
    status?: string | null
    gatewayUid?: string | null
    rawPayload?: unknown
}

const mapGatewayStatus = (status?: string | null): PaymentTokenStatus => {
    if (!status) return 'PENDING'

    switch (status.toLowerCase()) {
        case 'successful':
            return 'SUCCESSFUL'
        case 'failed':
            return 'FAILED'
        case 'declined':
            return 'DECLINED'
        case 'expired':
            return 'EXPIRED'
        case 'error':
            return 'ERROR'
        case 'pending':
        default:
            return 'PENDING'
    }
}

@injectable()
export class UpdatePaymentFromReturnUseCase {
    constructor(
        @inject('IPaymentTokenRepository') private paymentTokenRepo: IPaymentTokenRepository,
    ) {}

    async execute(input: UpdatePaymentFromReturnInput) {
        const status = mapGatewayStatus(input.status)

        return await this.paymentTokenRepo.update(input.paymentTokenId, {
            status,
            gatewayUid: input.gatewayUid ?? null,
            rawPayload: input.rawPayload ?? null,
        })
    }
}

export { mapGatewayStatus }
