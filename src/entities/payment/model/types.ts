export type PaymentTokenStatus =
    | 'CREATED'
    | 'PENDING'
    | 'SUCCESSFUL'
    | 'FAILED'
    | 'DECLINED'
    | 'EXPIRED'
    | 'ERROR'

export interface PaymentToken {
    id: string
    userId: string
    status: PaymentTokenStatus
    gatewayUid: string | null
    gatewayToken: string | null
    rawPayload: unknown | null
    amountCents: number
    currency: string
    createdAt: Date
    updatedAt: Date
}

export interface CreatePaymentTokenInput {
    userId: string
    status: PaymentTokenStatus
    amountCents: number
    currency: string
    gatewayUid?: string | null
    gatewayToken?: string | null
    rawPayload?: unknown | null
}

export interface UpdatePaymentTokenInput {
    status?: PaymentTokenStatus
    gatewayUid?: string | null
    gatewayToken?: string | null
    rawPayload?: unknown | null
}
