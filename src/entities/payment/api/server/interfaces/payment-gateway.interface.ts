export interface CreateCheckoutInput {
    amountCents: number
    currency: string
    description: string
    returnUrl: string
    customerId: string
    testMode: boolean
    metadata: Record<string, string>
}

export interface CreateCheckoutResult {
    checkoutToken: string
    redirectUrl?: string
    rawPayload: unknown
}

export interface PaymentGatewayAdapter {
    createCheckout(input: CreateCheckoutInput): Promise<CreateCheckoutResult>
}
