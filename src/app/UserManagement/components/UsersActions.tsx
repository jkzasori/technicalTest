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
/**
 * `UserActions` component provides actions (view, edit, delete) for managing user data.
 *
 * This component renders buttons to trigger modals for viewing, editing, or deleting a user.
 * Each action is handled by opening a corresponding modal where the user details can be
 * viewed, updated, or deleted.
 *
 * @param {Object} props - Component props
 * @param {number} props.userId - The unique identifier of the user
 * @param {User} props.user - The user object containing user details
 * 
 * @returns {JSX.Element} The rendered component
 */
const UserActions: React.FC<UserActionsProps> = ({ userId, user }) => {
    // State to manage the visibility of each modal (view, edit, delete)
    const [openDetailUserModal, setOpenDetailUserModal] = useState(false);
    const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
    const [openEditUserModal, setOpenEditUserModal] = useState(false);

    return (
        <div className="d-flex">
            {/* Modal components are conditionally rendered based on state */}
            {openDeleteUserModal && <DeleteUserModal isOpen={openDeleteUserModal} onClose={() => setOpenDeleteUserModal(false)} userId={userId} />}
            {openDetailUserModal && <DetailUserModal isOpen={openDetailUserModal} onClose={() => setOpenDetailUserModal(false)} userId={userId} />}
            {openEditUserModal && <EditUserModal user={user} isOpen={openEditUserModal} onClose={() => setOpenEditUserModal(false)} userId={userId} />}
            
            {/* Button for opening the "view details" modal */}
            <button
                className='actionBtn'
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenDetailUserModal(true);  // Open detail user modal
                }}
            >
                <Image alt='view details' src={"/img/info-circle.svg"} width={15} height={15} />
            </button>

            {/* Button for opening the "edit user" modal */}
            <button
                className='actionBtn'
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenEditUserModal(true);  // Open edit user modal
                }}
            >
                <Image alt='edit user' src={"/img/pen.svg"} width={15} height={15} />
            </button>

            {/* Button for opening the "delete user" modal */}
            <button
                className='actionBtn'
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenDeleteUserModal(true);  // Open delete user modal
                }}
            >
                <Image alt='delete user' src={"/img/deleteIcon.svg"} width={15} height={15} />
            </button>
        </div>
    );
};

export default UserActions;
