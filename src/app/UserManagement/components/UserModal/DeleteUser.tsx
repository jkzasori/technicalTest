"use client";
import Modal from "@/ui/components/Modal";
import { useUserDelete } from "../../viewModel/useUserDelete";

interface DeleteUserModalProps {
  /**
   * A boolean flag that determines if the modal is open or closed.
   */
  isOpen: boolean;
  
  /**
   * A callback function to close the modal.
   */
  onClose: () => void;
  
  /**
   * The ID of the user to be deleted.
   */
  userId: number;
}

/**
 * `DeleteUserModal` is a modal component used to confirm the deletion of a user.
 * 
 * This modal prompts the user with a confirmation message asking if they are sure
 * about deleting the user. It provides two actions: a "Cancel" button to close the modal
 * and a "Delete" button that triggers the deletion of the user.
 * 
 * The component integrates with the `useUserDelete` hook to handle the deletion process.
 *
 * @param {boolean} isOpen - Determines whether the modal is visible or not.
 * @param {() => void} onClose - A function to close the modal.
 * @param {number} userId - The ID of the user to be deleted.
 * @returns {JSX.Element} The rendered modal for deleting a user.
 */
const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, onClose, userId }) => {
  // Using the useUserDelete hook for handling user deletion
  const {
    deleteNewUser,
    userDelete,
  } = useUserDelete(onClose);
  
  return (
    <>
      {/* Render modal if it's open */}
      {
        isOpen && (
          <Modal 
            isOpen={isOpen} 
            title="Delete User" 
            onClose={onClose} 
            width="100%" 
            maxWidth="400px"
          >
            <div>
              {/* Confirmation text */}
              <p>Are you sure you want to delete the user?</p>
              <div className="d-flex flex-around">
                {/* Cancel button to close the modal */}
                <button className="btn" onClick={onClose}>Cancel</button>
                
                {/* Delete button to trigger the deletion */}
                <button 
                  disabled={userDelete.loading} 
                  className="btn delete" 
                  onClick={() => deleteNewUser(userId)}
                >
                  {userDelete.loading ? "Loading" : "Delete"}
                </button>
              </div>
            </div>
          </Modal>
        )
      }
    </>
  );
}

export default DeleteUserModal;
