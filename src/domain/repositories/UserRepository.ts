import { User, UserList } from "../entities/User";

/**
 * Interface for user repository operations.
 *
 * Provides methods for managing user data, including retrieving, creating, updating, and deleting users.
 */
export interface UserRepository {
  /**
   * Retrieves a paginated list of users.
   *
   * @param {number} page - The page number to fetch (1-indexed).
   * @returns {Promise<UserList>} A promise resolving to a paginated list of users.
   *
   * @example
   * ```typescript
   * const userList = await userRepository.getUsers(1);
   * console.log(userList.data); // Array of users
   * ```
   */
  getUsers(page: number): Promise<UserList>;

  /**
   * Retrieves a user by their unique identifier.
   *
   * @param {number} userId - The unique ID of the user to retrieve.
   * @returns {Promise<User | null>} A promise resolving to the user object, or `null` if not found.
   *
   * @example
   * ```typescript
   * const user = await userRepository.getUserById(123);
   * if (user) {
   *   console.log(user.name); // User name
   * }
   * ```
   */
  getUserById(userId: number): Promise<User | null>;

  /**
   * Creates a new user in the repository.
   *
   * @param {User} user - The user object to create.
   * @returns {Promise<User>} A promise resolving to the created user object.
   *
   * @example
   * ```typescript
   * const newUser = { name: "Jane Doe", email: "jane@example.com" };
   * const createdUser = await userRepository.postNewUser(newUser);
   * console.log(createdUser.id); // Newly created user ID
   * ```
   */
  postNewUser(user: User): Promise<User>;

  /**
   * Updates an existing user's data.
   *
   * @param {number} userId - The unique ID of the user to update.
   * @param {User} user - The updated user object.
   * @returns {Promise<User>} A promise resolving to the updated user object.
   *
   * @example
   * ```typescript
   * const updatedUser = { name: "John Smith", email: "johnsmith@example.com" };
   * const result = await userRepository.putUser(123, updatedUser);
   * console.log(result.name); // Updated name
   * ```
   */
  putUser(userId: number, user: User): Promise<User>;

  /**
   * Deletes a user by their unique identifier.
   *
   * @param {number} userId - The unique ID of the user to delete.
   * @returns {Promise<boolean>} A promise resolving to `true` if the user was successfully deleted, or `false` otherwise.
   *
   * @example
   * ```typescript
   * const isDeleted = await userRepository.deleteUser(123);
   * console.log(isDeleted); // true if deletion succeeded
   * ```
   */
  deleteUser(userId: number): Promise<boolean>;
}
