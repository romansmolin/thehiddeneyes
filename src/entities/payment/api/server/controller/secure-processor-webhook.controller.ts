import { inject, injectable } from 'inversify'
import { NextRequest, NextResponse } from 'next/server'
import { HandlePaymentWebhookUseCase } from '../use-cases/handle-payment-webhook.usecase'

@injectable()
export class SecureProcessorWebhookController {
    constructor(
        @inject(HandlePaymentWebhookUseCase)
        private useCase: HandlePaymentWebhookUseCase,
    ) {}

    async handle(req: NextRequest): Promise<NextResponse> {
        const signature = req.headers.get('Content-Signature')
        const rawBody = await req.text()

        await this.useCase.execute({
            rawBody,
            signature,
        })

        return NextResponse.json({ ok: true })
    }
}
