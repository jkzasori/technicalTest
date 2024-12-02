"use client";
import Modal from "@/ui/components/Modal";
import { useUserDetail } from "../../viewModel/useUserDetail";
import { useEffect } from "react";

interface DetailUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number;
}

const DetailUserModal: React.FC<DetailUserModalProps> = ({ isOpen, onClose, userId}) => {
    
    const {
        userDetail,
        detailUser,
    } = useUserDetail();

    useEffect(() => {
        detailUser(userId);
    }, [userId]);
    
    return (
        <>
           {
                isOpen
                    ?   (
                        <Modal 
                            isOpen   = {isOpen} 
                            title    = {"Detail User"} 
                            onClose  = {onClose} 
                            width    = {"100%"} 
                            maxWidth = {"500px"}
                        >
                          <div>
                            <p>Aquí está el detalle del usuario </p>
                            <div>
                                <button className="btn" onClick={onClose}>Close</button>
                          </div>
                          </div>
                        </Modal>)
                    :   ""
            }
        </>
    )
}

export default DetailUserModal;