import { UserRepositoryImpl } from "@/data/repositories/UserRepository";
import { User } from "@/domain/entities/User";
import { PostNewUser } from "@/domain/useCases/user/PostNewUser";
import { useState } from "react";
import { toast } from 'react-toastify';

/**
 * Custom hook for managing the creation of a new user.
 *
 * This hook provides functionality to create a new user, manage the loading
 * state, handle any errors, and trigger the `onAction` callback after user creation.
 *
 * @param {Function} onAction - A callback function that is called after the user has been created.
 * @returns {Object} The hook returns an object with:
 *  - `user`: The current state of the new user (name and job).
 *  - `userCreate`: The current state of the user creation process (loading status, error message).
 *  - `onChangeUser`: A function to update the user fields (name and job).
 *  - `createNewUser`: A function to create a new user.
 */
export const useUserCreate = (onAction: () => void) => {
  // Instantiate the PostNewUser use case to handle user creation
  const postUsersUseCase = new PostNewUser(new UserRepositoryImpl());

  // State to track the user creation process (loading state and error message)
  const [userCreate, setUserCreate] = useState<{
    loading: boolean | undefined;
    message: string;
  }>({
    loading: undefined,    // Tracks the loading state of the creation request
    message: "",           // Holds any error messages related to the creation process
  });

  // State to hold the new user data (name and job)
  const [user, setUser] = useState<User>({
    name: "",
    job: "",
  });

  /**
   * Updates the user fields (name or job) in the state.
   *
   * @param {string} property - The property of the user object to update (e.g., "name" or "job").
   * @param {any} value - The new value to assign to the specified property.
   */
  const onChangeUser = (property: string, value: any) => {
    setUser((prevState) => ({ ...prevState, [property]: value }));
  };

  /**
   * Validates that the user has filled out the necessary fields (name and job).
   *
   * @returns {boolean} True if both the name and job fields are non-empty, otherwise false.
   */
  const validateUser = (): boolean => {
    return user.name && user.job ? true : false;
  };

  /**
   * Creates a new user by executing the PostNewUser use case.
   *
   * This function validates the user input, triggers the creation process, manages the
   * loading state, and handles errors. After successful creation, it calls the `onAction` callback.
   * It also displays toast messages to inform the user of the success or failure of the operation.
   */
  const createNewUser = async () => {
    if (validateUser()) {
      // Set loading state to true while the creation request is being processed
      setUserCreate((prevState) => ({ ...prevState, loading: true }));

      try {
        // Execute the creation request via the PostNewUser use case
        const newUserData = await postUsersUseCase.execute(user);

        // Check if the creation was successful (status 201)
        if (newUserData.status === 201) {
          toast.success("New user created!");
        } else {
          toast.error(`Error: The user cannot be created`);
        }
      } catch (err: any) {
        // Handle any errors that occur during the request
        setUserCreate((prevState) => ({ ...prevState, message: err.message }));
        toast.error(`Error: ${err.message || "The user cannot be created. Try again"}`);
      } finally {
        // Set loading to false once the request is completed
        setUserCreate((prevState) => ({ ...prevState, loading: false }));
        // Trigger the onAction callback (useful for refreshing UI or taking other actions after creation)
        onAction();
      }
    } else {
      toast.error(`Error: Please ensure that all fields are filled out`);
    }
  };

  // Return the current user state, creation state, and functions to handle the user creation process
  return {
    user,
    userCreate,
    onChangeUser,
    createNewUser,
  };
};
