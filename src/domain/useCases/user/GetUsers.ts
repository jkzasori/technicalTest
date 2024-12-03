import { UserList } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';

/**
 * Use case for retrieving a paginated list of users.
 *
 * This class encapsulates the logic for fetching users from a data source,
 * delegating the operation to the provided `UserRepository`.
 */
export class GetUsers {
  /**
   * The repository instance responsible for user-related operations.
   */
  private userRepository: UserRepository;

  /**
   * Creates an instance of the `GetUsers` use case.
   *
   * @param {UserRepository} userRepository - An instance of `UserRepository`
   * to handle the user data fetching operations.
   */
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Executes the operation to retrieve a paginated list of users.
   *
   * @param {number} [page=1] - The page number to retrieve (default is 1).
   * @returns {Promise<UserList>} A promise that resolves to a `UserList`
   * object containing user data, pagination details, and metadata.
   * @throws An error if the retrieval operation fails.
   *
   * @example
   * ```typescript
   * const getUsers = new GetUsers(userRepository);
   * 
   * try {
   *   const userList = await getUsers.execute(2);
   *   console.log("Retrieved users:", userList);
   * } catch (error) {
   *   console.error("Failed to fetch users:", error);
   * }
   * ```
   */
  async execute(page: number = 1): Promise<UserList> {
    const usersData = await this.userRepository.getUsers(page);
    return usersData;
  }
}
