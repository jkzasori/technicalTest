"use client";
import Modal from "@/ui/components/Modal";
import { useState } from "react";
import { useUserCreate } from "../../viewModel/useUserCreate";

const AddUserModal: React.FC = () => {
    const [isOpen, setIsOpenModal] = useState<boolean>(false);
    
    const onHandleOpenModal = () => {
        setIsOpenModal(prevState => !prevState)
    }

    const {
        createNewUser,
        user,
        userCreate,
        onChangeUser,
    } = useUserCreate(onHandleOpenModal);
    
    return (
        <>

        <button className="btn" onClick={() => onHandleOpenModal()}>New user</button>
            {
                isOpen
                    ?   (
                        <Modal 
                            isOpen   = {isOpen} 
                            title    = {"Create a New User"} 
                            onClose  = {onHandleOpenModal} 
                            width    = {"100%"} 
                            maxWidth = {"446px"}
                        >
                          <div className="" style={{display: "flex", flexDirection: "column"}}>
                                <input 
                                    value={user.name} 
                                    onChange={(e) => onChangeUser("name", e.target.value)} 
                                    placeholder="Name" 
                                />
                                <input 
                                    value={user.job}
                                    onChange={(e) => onChangeUser("job", e.target.value)} 
                                    placeholder="Job"
                                />
                                <button disabled={userCreate.loading} onClick={() => createNewUser()}>
                                    {userCreate.loading?"Loading...":"Create"}
                                </button>
                          </div>
                        </Modal>)
                    :   ""
            }
        </>
    )
}

export default AddUserModal;