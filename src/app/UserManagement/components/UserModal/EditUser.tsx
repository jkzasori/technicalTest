"use client";
import Modal from "@/ui/components/Modal";
import { useUserDelete } from "../../viewModel/useUserDelete";
import { User } from "@/domain/entities/User";
import { useUserEdit } from "../../viewModel/useUserEdit";

interface EditUserModalProps {
  /**
   * A boolean flag that determines if the modal is open or closed.
   */
  isOpen: boolean;

  /**
   * A callback function to close the modal.
   */
  onClose: () => void;

  /**
   * The ID of the user to be edited.
   */
  userId: number;

  /**
   * The user data to be edited.
   */
  user: User;
}

/**
 * `EditUserModal` is a modal component that allows for editing the user's details.
 * It includes input fields for the user's name and job title.
 * The modal is opened or closed based on the `isOpen` prop, and it triggers the edit action when the user confirms their changes.
 * 
 * @param {boolean} isOpen - Flag indicating whether the modal is visible.
 * @param {() => void} onClose - Callback to close the modal.
 * @param {number} userId - The ID of the user whose details are to be edited.
 * @param {User} user - The current data of the user to be edited.
 * @returns {JSX.Element} The rendered modal for editing the user.
 */
const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, userId, user }) => {

  // State and actions for user data, managed by the useUserEdit hook
  const {
    userData,
    userEdit,
    onChangeUser,
    editNewUser,
  } = useUserEdit(onClose, user);
  
  return (
    <>
      {/* Render modal only if isOpen is true */}
      {
        isOpen && (
          <Modal 
            isOpen={isOpen} 
            title="Edit User" 
            onClose={onClose} 
            width="100%" 
            maxWidth="400px"
          >
            <div className="d-flex flex-column">
              {/* Input for editing user's name */}
              <input 
                value={userData.name} 
                onChange={(e) => onChangeUser("name", e.target.value)} 
                placeholder="Name" 
              />
              
              {/* Input for editing user's job */}
              <input 
                value={userData.job}
                onChange={(e) => onChangeUser("job", e.target.value)} 
                placeholder="Job"
              />
              
              {/* Button to submit the changes */}
              <button 
                className="btn" 
                disabled={userEdit.loading} 
                onClick={() => editNewUser(userId)}
              >
                {userEdit.loading ? "Loading..." : "Edit"}
              </button>
            </div>
          </Modal>
        )
      }
    </>
  );
}

export default EditUserModal;
