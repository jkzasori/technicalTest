import React from 'react';

import TablaCustom from '@/ui/components/Table';
import UserActions from './UsersActions';
import { UserData, UserList } from '@/domain/entities/User';

interface UsersTableProps 
{
    tableData   : UserList;
    headers     : string[];
    onPageChange: (page: number) => void;
    handleSelect: (id: string) => void;
}

/**
 * `UsersTable` component renders a table of users with pagination and user action buttons.
 *
 * This component uses the `TablaCustom` component to display a list of users in a table format. Each user row displays basic user information such as name, email, and avatar. Additionally, action buttons for viewing, editing, and deleting users are provided in each row.
 *
 * @param {Object} props - Component props
 * @param {UserList} props.tableData - The list of users to display in the table
 * @param {string[]} props.headers - The headers to display at the top of the table
 * @param {(page: number) => void} props.onPageChange - Callback function to handle pagination page changes
 * @param {(id: string) => void} props.handleSelect - Callback function to handle row selection (not used in the current implementation)
 * 
 * @returns {JSX.Element} The rendered component containing the user table
 */
const UsersTable: React.FC<UsersTableProps> = ({ 
    headers, 
    onPageChange, 
    tableData 
}) => {
    /**
     * Handles a row click event.
     *
     * This function is triggered when a row in the table is clicked. It is used to manage user selection or other actions when a user row is clicked.
     *
     * @param {UserData} item - The user data of the clicked row
     * @param {number} index - The index of the clicked row
     */
    const handleRowClick = (item: UserData, index: number) => {
        // handleModal(`${item.id}`); // Example: This can be used for opening a modal for user details
    };

    return (
        <>
            <TablaCustom
                tableData={tableData}  // Data to be displayed in the table
                headers={headers}  // Table headers
                onPageChange={onPageChange}  // Pagination callback
                onRowClick={handleRowClick}  // Row click handler
                renderRow={(user: UserData) => (
                    <>
                        {/* Render user data in table rows */}
                        <td>{user.id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>
                            {/* Render user avatar */}
                            <img className='avatar' src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                        </td>
                        <td>
                            {/* Render user action buttons (view, edit, delete) */}
                            <UserActions user={{ name: user.first_name, job: "" }} userId={user.id} />
                        </td>
                    </>
                )}
            />
        </>
    );
};

export default UsersTable;
