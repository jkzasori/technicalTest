"use client";
import Modal from "@/ui/components/Modal";
import { useUserDelete } from "../../viewModel/useUserDelete";

interface DeleteUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, onClose, userId}) => {
    const {
        deleteNewUser,
    } = useUserDelete(onClose);
    
    return (
        <>
           {
                isOpen
                    ?   (
                        <Modal 
                            isOpen   = {isOpen} 
                            title    = {"Delete User"} 
                            onClose  = {onClose} 
                            width    = {"100%"} 
                            maxWidth = {"400px"}
                        >
                          <div>
                            <p>Are you sure you want to delete the user with the email: </p>
                            <div className="d-flex">
                                <button className="btn" onClick={onClose}>Cancel</button>
                                <button className="btn delete" onClick={() => deleteNewUser(userId)}>Delete</button>
                            </div>
                          </div>
                        </Modal>)
                    :   ""
            }
        </>
    )
}

export default DeleteUserModal;