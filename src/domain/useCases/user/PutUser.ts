import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';

/**
 * Use case for updating an existing user.
 *
 * This class encapsulates the logic for updating user information,
 * delegating the operation to the provided `UserRepository`.
 */
export class PutUser {
  /**
   * The repository instance responsible for user-related operations.
   */
  private userRepository: UserRepository;

  /**
   * Creates an instance of the `PutUser` use case.
   *
   * @param {UserRepository} userRepository - An instance of `UserRepository`
   * to handle the user update operation.
   */
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Executes the operation to update an existing user's data.
   *
   * @param {number} userId - The unique identifier of the user to be updated.
   * @param {User} user - The user object containing the updated details.
   * @returns {Promise<any>} A promise that resolves to the response data from the repository,
   * typically containing the updated user's details.
   * @throws An error if the user update operation fails.
   *
   * @example
   * ```typescript
   * const putUser = new PutUser(userRepository);
   *
   * const updatedUser = {
   *   name: "Jane Doe",
   *   job: "Senior Software Engineer",
   * };
   *
   * try {
   *   const user = await putUser.execute(1, updatedUser);
   *   console.log("User updated:", user);
   * } catch (error) {
   *   console.error("Failed to update user:", error);
   * }
   * ```
   */
  async execute(userId: number, user: User): Promise<any> {
    const userData = await this.userRepository.putUser(userId, user);
    return userData;
  }
}
