"use client";
import Modal from "@/ui/components/Modal";
import { useUserDelete } from "../../viewModel/useUserDelete";
import { User } from "@/domain/entities/User";

interface EditUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number;
    user: User
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, userId, user}) => {
    
    const {
        userDelete,
        deleteNewUser,
    } = useUserDelete(onClose);
    
    return (
        <>
           {
                isOpen
                    ?   (
                        <Modal 
                            isOpen   = {isOpen} 
                            title    = {"Edit User"} 
                            onClose  = {onClose} 
                            width    = {"100%"} 
                            maxWidth = {"400px"}
                        >
                          <div>
                            <p>Are you suyre you want to delte the user with the email: </p>
                            <div>
                                <button onClick={onClose}>Cancel</button>
                                <button onClick={() => deleteNewUser(userId)}>Delete</button>
                            </div>
                          </div>
                        </Modal>)
                    :   ""
            }
        </>
    )
}

export default EditUserModal;