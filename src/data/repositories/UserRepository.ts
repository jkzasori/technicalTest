import { AxiosError } from "axios";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { User, UserData, UserList, UserSupport } from "@/domain/entities/User";
import { deleteRequest, getRequest, postRequest, putRequest } from "../adaper/httpRequests";

/**
 * Implementation of `UserRepository` for managing user-related HTTP requests.
 *
 * This class uses Axios-based HTTP request methods (`getRequest`, `postRequest`, `putRequest`, `deleteRequest`) 
 * to interact with a REST API for retrieving, creating, updating, and deleting user data.
 */
export class UserRepositoryImpl implements UserRepository {
  /**
   * Fetches a paginated list of users from the server.
   *
   * @param {number} page - The page number to fetch (1-indexed).
   * @returns {Promise<UserList>} A promise resolving to the paginated list of users.
   * @throws An error object if the request fails.
   *
   * @example
   * ```typescript
   * const userList = await userRepository.getUsers(1);
   * console.log(userList.data); // Array of users
   * ```
   */
  async getUsers(page: number): Promise<any> {
    try {
            const response = await getRequest<any>(`/users?page=${page}`);
            return response;
    } catch (error) {
            const apiError = this.handleApiError(error);
            return Promise.reject(apiError);
    }
  }

  /**
   * Fetches a single user by their unique identifier.
   *
   * @param {number} userId - The unique ID of the user to fetch.
   * @returns {Promise<UserData>} A promise resolving to the user data.
   * @throws An error object if the request fails.
   *
   * @example
   * ```typescript
   * const user = await userRepository.getUserById(123);
   * console.log(user.first_name); // User's first name
   * ```
   */
  async getUserById(userId: number): Promise<any> {
    try {
            const response = await getRequest<any>(`/users/${userId}`);
            return response;
    } catch (error) {
            const apiError = this.handleApiError(error);
            return Promise.reject(apiError);
    }
  }

  /**
   * Creates a new user in the database.
   *
   * @param {User} user - The user object containing the new user's data.
   * @returns {Promise<User>} A promise resolving to the created user's data.
   * @throws An error object if the request fails.
   *
   * @example
   * ```typescript
   * const newUser = { name: "Jane Doe", job: "Developer" };
   * const createdUser = await userRepository.postNewUser(newUser);
   * console.log(createdUser.name); // "Jane Doe"
   * ```
   */
  async postNewUser(user: User): Promise<any> {
    try {
            const response = await postRequest<any>(`/api/users/`, user);
            return response;
    } catch (error) {
            const apiError = this.handleApiError(error);
            return Promise.reject(apiError);
    }
  }

  /**
   * Updates an existing user's data.
   *
   * @param {number} userId - The unique ID of the user to update.
   * @param {User} user - The updated user object.
   * @returns {Promise<User>} A promise resolving to the updated user's data.
   * @throws An error object if the request fails.
   *
   * @example
   * ```typescript
   * const updatedUser = { name: "John Smith", job: "Manager" };
   * const result = await userRepository.putUser(123, updatedUser);
   * console.log(result.job); // "Manager"
   * ```
   */
  async putUser(userId: number, user: User): Promise<any> {
    try {
        const response = await putRequest<any>(`/api/users/${userId}`, user);
        return response;
    } catch (error) {
      const apiError = this.handleApiError(error);
      return Promise.reject(apiError);
    }
  }

  /**
   * Deletes a user by their unique identifier.
   *
   * @param {number} userId - The unique ID of the user to delete.
   * @returns {Promise<void>} A promise resolving when the user is successfully deleted.
   * @throws An error object if the request fails.
   *
   * @example
   * ```typescript
   * await userRepository.deleteUser(123);
   * console.log("User deleted successfully");
   * ```
   */
  async deleteUser(userId: number): Promise<any> {
    try {
        const response = await deleteRequest<any>(`/api/users/${userId}`);
        
        return response;
    } catch (error) {
        const apiError = this.handleApiError(error);
        
        return Promise.reject(apiError);
    }
  }

  /**
   * Handles API errors by parsing the Axios error object and returning the relevant data.
   *
   * @param {unknown} error - The error object caught during a failed HTTP request.
   * @returns {any} The parsed error object.
   *
   * @private
   */
  private handleApiError(error: unknown): any {
    const axiosError = error as AxiosError;
    return JSON.parse(JSON.stringify(axiosError.response?.data || {}));
  }
}
