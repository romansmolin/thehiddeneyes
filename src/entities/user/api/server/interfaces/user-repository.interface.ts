import { User, CreateUserInput, UpdateUserInput } from '../../../model/types';

/**
 * User repository interface
 * Defines operations for user data access
 */
export interface IUserRepository {
  /**
   * Find a user by ID
   */
  findById(id: string): Promise<User | null>;

  /**
   * Find a user by email
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Find a user by Google ID
   */
  findByGoogleId(googleId: string): Promise<User | null>;

  /**
   * Create a new user
   */
  create(input: CreateUserInput): Promise<User>;

  /**
   * Update a user
   */
  update(id: string, input: UpdateUserInput): Promise<User>;

  /**
   * Delete a user
   */
  delete(id: string): Promise<void>;
}
