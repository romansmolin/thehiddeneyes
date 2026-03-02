import { inject, injectable } from 'inversify';
import { DI_TOKENS } from '@/shared/lib/di/tokens';
import type { IUserRepository } from '../interfaces/user-repository.interface';
import { User } from '../../../model/types';
import { AppError } from '@/shared/errors/app-error';
import { ErrorCode } from '@/shared/errors/error-codes';

/**
 * Get current user use case
 * Retrieves the authenticated user's information
 */
@injectable()
export class GetCurrentUserUseCase {
  constructor(
    @inject(DI_TOKENS.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', ErrorCode.USER_NOT_FOUND, 404);
    }

    return user;
  }
}
