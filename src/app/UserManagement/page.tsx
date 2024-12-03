"use client";

import { useUserViewModel } from "./viewModel/useUserViewModel";
import { useEffect } from "react";

import styles from "../page.module.css";
import UsersTable from "./components/UsersTable";
import AddUserModal from "./components/UserModal/AddUser";

const HEADER_TABLE: string[] = ["Id", "Email", "First Name", "Last Name", "Avatar"];

/**
 * `UserManagement` is the main component for managing users in the application.
 * It is responsible for rendering the user list and the modal for adding new users.
 * It also handles the logic for fetching users, displaying them in a table, and managing pagination.
 * 
 * @returns {JSX.Element} The rendered user management page, including a table and an add user modal.
 */
export default function UserManagement() {
    
    // Destructuring properties from useUserViewModel hook
    const {
        loadUsers,
        users,
        handlePageClick,
        currentPage,
    } = useUserViewModel();

    // Fetch users whenever the page changes
    useEffect(() => {
        loadUsers(currentPage);
    }, [currentPage]);

    return (
        <div className={styles.page}>
            {/* Add User Modal component */}
            <AddUserModal />

            {/* Display loading state or UsersTable component */}
            {users.loading ? "Loading..." : (
                <UsersTable
                    tableData={users.data}
                    headers={HEADER_TABLE}
                    onPageChange={handlePageClick}
                    handleSelect={() => null}  // Currently a no-op function
                />
            )}
        </div>
    );
}
