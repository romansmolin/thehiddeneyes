export const DI_TOKENS = {
  // Repositories
  UserRepository: Symbol.for('UserRepository'),

  // Use cases
  GetCurrentUserUseCase: Symbol.for('GetCurrentUserUseCase'),
} as const;
