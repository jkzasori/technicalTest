"use client";
import Modal from "@/ui/components/Modal";
import { useUserDetail } from "../../viewModel/useUserDetail";
import { useEffect } from "react";

interface DetailUserModalProps {
  /**
   * A boolean flag that determines if the modal is open or closed.
   */
  isOpen: boolean;
  
  /**
   * A callback function to close the modal.
   */
  onClose: () => void;
  
  /**
   * The ID of the user whose details are to be displayed.
   */
  userId: number;
}

/**
 * `DetailUserModal` is a modal component that displays detailed information about a user.
 * 
 * It shows the user's avatar, name, and email address. The modal is opened or closed
 * based on the `isOpen` prop, and when it is opened, it fetches and displays the user's
 * details using the `useUserDetail` hook.
 *
 * @param {boolean} isOpen - Determines whether the modal is visible or not.
 * @param {() => void} onClose - A function to close the modal.
 * @param {number} userId - The ID of the user whose details are to be shown.
 * @returns {JSX.Element} The rendered modal with the user's details.
 */
const DetailUserModal: React.FC<DetailUserModalProps> = ({ isOpen, onClose, userId }) => {
  
  // Fetching user details using the useUserDetail hook
  const {
    userDetail,
    detailUser,
  } = useUserDetail();

  // Fetch user details whenever the userId changes
  useEffect(() => {
    if (userId) {
      detailUser(userId);
    }
  }, [userId]);
  
  return (
    <>
      {/* Render modal only if isOpen is true */}
      {
        isOpen && (
          <Modal 
            isOpen={isOpen} 
            title="Detail User" 
            onClose={onClose} 
            width="100%" 
            maxWidth="200px"
          >
            <div className="text-center">
              {/* Display user's avatar if available */}
              {userDetail.data?.avatar && (
                <img 
                  className="avatar" 
                  src={userDetail.data.avatar} 
                  alt={`${userDetail.data.first_name} ${userDetail.data.last_name}`} 
                />
              )}
              {/* Display user's name */}
              <h6>
                <span>Name:</span> {userDetail.data.first_name} {userDetail.data.last_name}
              </h6>
              {/* Display user's email */}
              <h6>
                <span>E-mail:</span> {userDetail.data.email}
              </h6>
            </div>
          </Modal>
        )
      }
    </>
  );
}

export default DetailUserModal;
