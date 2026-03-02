import { inject, injectable } from 'inversify'
import { NextResponse } from 'next/server'
import { GetWalletUseCase } from '../use-cases/get-wallet.usecase'

@injectable()
export class GetWalletController {
    constructor(
        @inject(GetWalletUseCase)
        private useCase: GetWalletUseCase,
    ) {}

    async handle(userId: string): Promise<NextResponse> {
        const wallet = await this.useCase.execute(userId)
        return NextResponse.json(wallet)
    }
}
