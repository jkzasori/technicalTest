import { UserRepository } from '@/domain/repositories/UserRepository';

/**
 * Use case for deleting a user by their unique identifier.
 *
 * This class is part of the application service layer, encapsulating the 
 * deletion logic and delegating the operation to the `UserRepository`.
 */
export class DeleteUser {
  /**
   * The repository instance for managing user-related operations.
   */
  private userRepository: UserRepository;

  /**
   * Creates an instance of the `DeleteUser` use case.
   *
   * @param {UserRepository} userRepository - An instance of `UserRepository` 
   * to perform user deletion.
   */
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Executes the user deletion operation.
   *
   * @param {number} userId - The unique identifier of the user to delete.
   * @returns {Promise<any>} A promise that resolves to the server's response 
   * for the deletion operation.
   * @throws An error if the deletion operation fails.
   *
   * @example
   * ```typescript
   * const deleteUser = new DeleteUser(userRepository);
   * 
   * try {
   *   const result = await deleteUser.execute(123);
   *   console.log("User deleted successfully:", result);
   * } catch (error) {
   *   console.error("Failed to delete user:", error);
   * }
   * ```
   */
  async execute(userId: number): Promise<any> {
    const userData = await this.userRepository.deleteUser(userId);
    return userData;
  }
}
