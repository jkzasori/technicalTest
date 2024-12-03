import { UserRepositoryImpl } from "@/data/repositories/UserRepository";
import { UserData } from "@/domain/entities/User";
import { GetUserById } from "@/domain/useCases/user/GetUserById";
import { useState } from "react";
import { toast } from 'react-toastify';

/**
 * Custom hook for managing the fetching and display of a specific user's details.
 *
 * This hook encapsulates the logic for fetching user details by their ID, managing
 * the loading state, error handling, and updating the state with the fetched data.
 * It also provides a function to trigger the user detail fetch request.
 *
 * @returns {Object} The hook returns an object with:
 *  - `userDetail`: The current state of the user details (loading status, error message, and user data).
 *  - `detailUser`: A function to fetch user details by the user ID.
 */
export const useUserDetail = () => {
  // Instantiate the GetUserById use case to fetch user details from the repository
  const detailUsersUseCase = new GetUserById(new UserRepositoryImpl());

  // State to hold the user details, loading status, and error messages
  const [userDetail, setUserDetail] = useState<{
    loading: boolean | undefined;
    message: string;
    data: UserData;
  }>({
    loading: undefined,    // Tracks the loading state of the request
    message: "",           // Holds any error messages
    data: {
      id: NaN,             // The user's ID
      email: "",           // The user's email address
      first_name: "",      // The user's first name
      last_name: "",       // The user's last name
      avatar: "",          // The URL of the user's avatar image
    },
  });

  /**
   * Fetches the details of a specific user by their ID.
   *
   * This function triggers the `GetUserById` use case to request the user's details
   * and updates the state with the fetched data. It handles loading and error states
   * and displays appropriate error messages if the request fails.
   *
   * @param {number} userId - The unique ID of the user to retrieve details for.
   *
   * @returns {Promise<void>} This function doesn't return a value. It updates the `userDetail` state.
   */
  const detailUser = async (userId: number): Promise<void> => {
    // Set the loading state to true while the request is being processed
    setUserDetail((prevState) => ({ ...prevState, loading: true }));

    try {
      // Fetch the user details from the repository
      const detailUserData = await detailUsersUseCase.execute(userId);

      console.log("DetailUserData: ", detailUserData);

      // If the request is successful (status 200), update the user detail state
      if (detailUserData.status === 200) {
        setUserDetail((prevState) => ({
          ...prevState,
          data: detailUserData.data.data,
        }));
      } else {
        // If the status code is not 200, show an error toast message
        toast.error(`Error getting user details: Try again`);
      }
    } catch (err: any) {
      // If an error occurs, update the state with the error message
      setUserDetail((prevState) => ({ ...prevState, message: err.message }));
      // Optionally, display a toast message with the error
      toast.error(`Error fetching user details: ${err.message || "Try again."}`);
    } finally {
      // Once the request is completed, set loading to false
      setUserDetail((prevState) => ({ ...prevState, loading: false }));
    }
  };

  // Return the current state (user details, loading status, error messages) and the fetch function
  return {
    userDetail,
    detailUser,
  };
};
