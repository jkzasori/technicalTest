import { UserRepositoryImpl } from "@/data/repositories/UserRepository";
import { UserList } from "@/domain/entities/User";
import { GetUsers } from "@/domain/useCases/user/GetUsers";
import { useState } from "react";
import { toast } from 'react-toastify';

/**
 * Custom hook for managing the state and logic related to user data fetching and pagination.
 *
 * This hook interacts with the `GetUsers` use case to fetch users and manage pagination,
 * as well as managing loading and error states.
 *
 * @returns {Object} The hook returns an object with functions and state for loading users, handling pagination, and managing user data.
 */
export const useUserViewModel = () => {
  // Create an instance of `GetUsers` use case with a user repository
  const getUsersUseCase = new GetUsers(new UserRepositoryImpl());

  // State for managing the current page, user data, and loading status
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<{
    loading: boolean | undefined;
    data: UserList;
    message: string;
  }>({
    data: {} as UserList,
    loading: undefined,
    message: "",
  });

  /**
   * Updates the user state with the given property and value.
   *
   * @param {string} property - The property of the `users` state to update.
   * @param {any} value - The value to set for the given property.
   */
  const onChangeUser = (property: string, value: any) => {
    return setUsers((prevState) => ({ ...prevState, [property]: value }));
  };

  /**
   * Handles the page click event for pagination.
   *
   * @param {number} pageSelected - The page number that the user has selected.
   */
  const handlePageClick = async (pageSelected: any) => {
    setCurrentPage(pageSelected);
  };

  /**
   * Loads user data for a specific page.
   *
   * @param {number} page - The page number to load user data for.
   * @returns {Promise<void>} A promise that resolves when the users are loaded.
   */
  const loadUsers = async (page: number) => {
    onChangeUser("loading", true);

    try {
      const usersData: UserList = await getUsersUseCase.execute(page);

      onChangeUser("data", usersData.data);
    } catch (err: any) {
      onChangeUser("message", err.message);
      toast.error(`Error loading users: ${err.message || "Please try again."}`);
    } finally {
      onChangeUser("loading", false);
    }
  };

  // Return the state and functions to the component using this hook
  return {
    loadUsers,
    users,
    handlePageClick,
    currentPage,
  };
};