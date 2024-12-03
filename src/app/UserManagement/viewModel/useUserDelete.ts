import { UserRepositoryImpl } from "@/data/repositories/UserRepository";
import { DeleteUser } from "@/domain/useCases/user/DeleteUser";
import { useState } from "react";
import { toast } from 'react-toastify';

/**
 * Custom hook for managing the deletion of a user.
 *
 * This hook provides functionality to delete a user by their ID, manage the loading
 * state, handle any errors, and trigger the `onAction` callback after deletion.
 *
 * @param {Function} onAction - A callback function that is called after the user has been deleted.
 * @returns {Object} The hook returns an object with:
 *  - `userDelete`: The current state of the deletion process (loading status, error message).
 *  - `deleteNewUser`: A function to delete the user by ID.
 */
export const useUserDelete = (onAction: () => void) => {
  // Instantiate the DeleteUser use case to handle user deletion
  const deleteUsersUseCase = new DeleteUser(new UserRepositoryImpl());

  // State to track the deletion process (loading state and error message)
  const [userDelete, setUserDelete] = useState<{
    loading: boolean | undefined;
    message: string;
  }>({
    loading: undefined,    // Tracks the loading state of the deletion request
    message: "",           // Holds any error messages related to the deletion process
  });

  /**
   * Deletes a user by their ID.
   *
   * This function triggers the `DeleteUser` use case to delete a user from the repository.
   * It manages the loading state and error handling, and displays appropriate toast messages.
   *
   * @param {number} userId - The ID of the user to be deleted.
   *
   * @returns {Promise<void>} This function doesn't return a value. It updates the `userDelete` state.
   */
  const deleteNewUser = async (userId: number): Promise<void> => {
    // Set loading state to true while the deletion request is being processed
    setUserDelete((prevState) => ({ ...prevState, loading: true }));

    try {
      // Execute the deletion request via the DeleteUser use case
      await deleteUsersUseCase.execute(userId);

      // Show a success message upon successful deletion
      toast.success("User deleted successfully");
    } catch (err: any) {
      // If an error occurs, update the state with the error message
      setUserDelete((prevState) => ({ ...prevState, message: err.message }));
      
      // Display a toast error message with the error
      toast.error(`Error: ${err.message || "The user cannot be deleted. Try again."}`);
    } finally {
      // Set loading to false once the request is completed
      setUserDelete((prevState) => ({ ...prevState, loading: false }));

      // Trigger the onAction callback (useful for refreshing UI or taking other actions after deletion)
      onAction();
    }
  };

  // Return the current state and the function for deleting a user
  return {
    userDelete,
    deleteNewUser,
  };
};