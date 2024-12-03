import { UserRepository } from '@/domain/repositories/UserRepository';

/**
 * Use case for fetching a user's details by their unique identifier.
 *
 * This class encapsulates the logic for retrieving a specific user's data
 * and delegates the operation to the provided `UserRepository`.
 */
export class GetUserById {
  /**
   * The repository instance responsible for user-related operations.
   */
  private userRepository: UserRepository;

  /**
   * Creates an instance of the `GetUserById` use case.
   *
   * @param {UserRepository} userRepository - An instance of `UserRepository`
   * to handle the user data fetching operation.
   */
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Executes the operation to retrieve a user's details by their ID.
   *
   * @param {number} userId - The unique identifier of the user to fetch.
   * @returns {Promise<any>} A promise that resolves to the user's data,
   * as returned by the repository.
   * @throws An error if the retrieval operation fails.
   *
   * @example
   * ```typescript
   * const getUserById = new GetUserById(userRepository);
   * 
   * try {
   *   const user = await getUserById.execute(123);
   *   console.log("User details:", user);
   * } catch (error) {
   *   console.error("Failed to fetch user:", error);
   * }
   * ```
   */
  async execute(userId: number): Promise<any> {
    const userData = await this.userRepository.getUserById(userId);
    return userData;
  }
}
