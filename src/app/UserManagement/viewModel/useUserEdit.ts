import { UserRepositoryImpl } from "@/data/repositories/UserRepository";
import { User } from "@/domain/entities/User";
import { PutUser } from "@/domain/useCases/user/PutUser";
import { useState } from "react";
import { toast } from 'react-toastify';

/**
 * Custom hook for managing the editing of user data.
 *
 * This hook provides the necessary logic to edit an existing user's information. It handles
 * the state of the form, validation, and interaction with the backend service to update user data.
 *
 * @param {Function} onAction - A callback function to be executed after the action is completed.
 * @param {User} initialUser - The initial data of the user to be edited.
 *
 * @returns {Object} An object containing functions and state for managing user editing, 
 * including user data, loading status, and the `onChangeUser` handler.
 */
export const useUserEdit = (onAction: () => void, initialUser: User) => {
  // Create an instance of the PutUser use case to handle user data update
  const putUsersUseCase = new PutUser(new UserRepositoryImpl());

  // State for managing loading and error message during the edit process
  const [userEdit, setUserEdit] = useState<{ loading: boolean | undefined; message: string }>({
    loading: undefined,
    message: "",
  });

  // State for managing the user data to be edited
  const [userData, setUserData] = useState<User>({
    name: initialUser.name || "",
    job: initialUser.job || "",
  });

  /**
   * Updates the user data state when a form field changes.
   *
   * @param {string} property - The property of the user data to update.
   * @param {any} value - The new value to set for the specified property.
   */
  const onChangeUser = (property: string, value: any) => {
    return setUserData((prevState) => ({ ...prevState, [property]: value }));
  };

  /**
   * Validates the user data to ensure that the necessary fields are filled.
   *
   * @returns {boolean} Returns `true` if both the name and job fields are filled; otherwise, returns `false`.
   */
  const validateUser = () => {
    if (userData.name && userData.job) {
      return true;
    }
    return false;
  };

  /**
   * Executes the user edit action.
   *
   * This function sends the updated user data to the backend via the `PutUser` use case.
   * It handles validation, error messages, loading state, and triggering the callback after completion.
   *
   * @param {number} userId - The ID of the user to be edited.
   */
  const editNewUser = async (userId: number) => {
    // Check if the user data is valid before proceeding
    if (validateUser()) {
      setUserEdit((prevState) => ({ ...prevState, loading: true }));

      try {
        const newUserData = await putUsersUseCase.execute(userId, userData);

        if (newUserData.status === 200) {
          toast.success(`User ${userData.name} was edited successfully!`);
        } else {
          toast.error(`Error: The user cannot be edited.`);
        }
      } catch (err: any) {
        // Handle errors during the API request
        setUserEdit((prevState) => ({ ...prevState, message: err.message }));
        toast.error(`Error: ${err.message || "The user cannot be edited. Please try again."}`);
      } finally {
        // Reset loading state and call the action callback
        setUserEdit((prevState) => ({ ...prevState, loading: false }));
        onAction();
      }
    } else {
      // Display error if fields are missing
      toast.error(`Error: Please ensure all fields are filled out.`);
    }
  };

  // Return the necessary state and functions for user editing
  return {
    userData,
    userEdit,
    onChangeUser,
    editNewUser,
  };
};
