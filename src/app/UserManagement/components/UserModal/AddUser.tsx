"use client";
import Modal from "@/ui/components/Modal";
import { useEffect, useState } from "react";
import { useUserCreate } from "../../viewModel/useUserCreate";
import Image from "next/image";

/**
 * `AddUserModal` component provides a modal for creating a new user.
 *
 * This component handles the opening and closing of a modal, and it manages the user input fields for creating a new user. The modal contains input fields for the user's name and job, and a button to submit the form and create the user.
 * It uses the `useUserCreate` custom hook for managing user creation logic.
 *
 * @returns {JSX.Element} The rendered modal component for adding a new user.
 */
const AddUserModal: React.FC = () => {
  // Modal state to track if the modal is open or closed
  const [isOpen, setIsOpenModal] = useState<boolean>(false);

  /**
   * Toggles the modal open/close state.
   * This function is called when the user clicks the "New user" button or closes the modal.
   */
  const onHandleOpenModal = () => {
    setIsOpenModal(prevState => !prevState);
  };

  // Get the user creation functionality and user state from the useUserCreate hook
  const {
    createNewUser,
    user,
    userCreate,
    onChangeUser,
  } = useUserCreate(onHandleOpenModal);

  // Reset user input fields when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      onChangeUser("name", "");
      onChangeUser("job", "");
    }
  }, [isOpen, onChangeUser]);

  return (
    <>
      {/* Button to open the modal */}
      <button className="btn flex" onClick={() => onHandleOpenModal()}>
        <Image alt="edit" src={"/img/addPerson.svg"} width={15} height={15} />
        New user
      </button>

      {/* Modal for creating a new user */}
      {
        isOpen && (
          <Modal 
            isOpen={isOpen} 
            title="Create a New User" 
            onClose={onHandleOpenModal} 
            width="100%" 
            maxWidth="446px"
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Input for the user's name */}
              <input 
                value={user.name} 
                onChange={(e) => onChangeUser("name", e.target.value)} 
                placeholder="Name" 
              />
              {/* Input for the user's job */}
              <input 
                value={user.job} 
                onChange={(e) => onChangeUser("job", e.target.value)} 
                placeholder="Job" 
              />
              {/* Submit button to create the new user */}
              <button 
                className="btn" 
                disabled={userCreate.loading} 
                onClick={() => createNewUser()}
              >
                {userCreate.loading ? "Loading..." : "Create"}
              </button>
            </div>
          </Modal>
        )
      }
    </>
  );
};

export default AddUserModal;
