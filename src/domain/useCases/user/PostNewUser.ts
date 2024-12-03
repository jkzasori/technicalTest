import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';

/**
 * Use case for creating a new user.
 *
 * This class encapsulates the logic for adding a new user to the system,
 * delegating the operation to the provided `UserRepository`.
 */
export class PostNewUser {
  /**
   * The repository instance responsible for user-related operations.
   */
  private userRepository: UserRepository;

  /**
   * Creates an instance of the `PostNewUser` use case.
   *
   * @param {UserRepository} userRepository - An instance of `UserRepository`
   * to handle the user creation operation.
   */
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Executes the operation to create a new user.
   *
   * @param {User} user - The user object containing the details of the user to create.
   * @returns {Promise<any>} A promise that resolves to the response data from the repository,
   * typically including the newly created user's details.
   * @throws An error if the user creation operation fails.
   *
   * @example
   * ```typescript
   * const postNewUser = new PostNewUser(userRepository);
   *
   * const newUser = {
   *   name: "John Doe",
   *   job: "Software Engineer",
   * };
   *
   * try {
   *   const createdUser = await postNewUser.execute(newUser);
   *   console.log("New user created:", createdUser);
   * } catch (error) {
   *   console.error("Failed to create user:", error);
   * }
   * ```
   */
  async execute(user: User): Promise<any> {
    const userData = await this.userRepository.postNewUser(user);
    return userData;
  }
}
