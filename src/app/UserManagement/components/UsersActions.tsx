import Image from 'next/image';
import React, { useState } from 'react';
import DeleteUserModal from './UserModal/DeleteUser';
import DetailUserModal from './UserModal/DetailUser';
import EditUserModal from './UserModal/EditUser';
import { User } from '@/domain/entities/User';

interface UserActionsProps {
    userId: number;
    user: User
}

const UserActions: React.FC<UserActionsProps> = ({ userId, user }) => {
    const [openDetailUserModal, setOpenDetailUserModal] = useState(false)
    const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false)
    const [openEditUserModal, setOpenEditUserModal] = useState(false)
    
    const handleOpenInNewTab = (url: string) => {
        if (url && url !== "#") window.open(url, '_blank');
    };

    return (
        <div className="d-flex">
            {openDeleteUserModal && <DeleteUserModal isOpen={openDeleteUserModal} onClose={() => setOpenDeleteUserModal(false)} userId={userId} />}
            {openDetailUserModal && <DetailUserModal isOpen={openDetailUserModal} onClose={() => setOpenDetailUserModal(false)} userId={userId} />}
            {openEditUserModal && <EditUserModal user={user} isOpen={openEditUserModal} onClose={() => setOpenEditUserModal(false)} userId={userId} />}
            <button
                className='actionBtn'
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenEditUserModal(true)
                }}
            >
                <Image alt='edit' src={"/img/addPerson.svg"} style={{ color: "#c20735" }} width={25} height={25} />
            </button>
            <button
                className='actionBtn'
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenDetailUserModal(true)
                }}
            >
                <Image alt='edit' src={"/img/pen.svg"} style={{ color: "#c20735" }} width={25} height={25} />
            </button>
            <button
                className='actionBtn'
                onClick={(e) => {
                e.stopPropagation();
                setOpenDeleteUserModal(true)
                }}
            >
                <Image alt='delete' src={"/img/deleteIcon.svg"} style={{ color: "#c20735" }} width={25} height={25} />
            </button>
           
        </div>
    );
};

export default UserActions;
