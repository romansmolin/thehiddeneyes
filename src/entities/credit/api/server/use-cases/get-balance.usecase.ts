import { injectable, inject } from 'inversify'
import type { ICreditRepository } from '../interfaces/credit-repository.interface'
import type { UserCredits } from '../../../model/types'

@injectable()
export class GetBalanceUseCase {
    constructor(@inject('ICreditRepository') private repo: ICreditRepository) {}

    async execute(userId: string): Promise<UserCredits> {
        return await this.repo.getOrCreateBalance(userId)
    }
}
