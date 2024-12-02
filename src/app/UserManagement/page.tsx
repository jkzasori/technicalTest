"use client";

import { useUserViewModel } from "./viewModel/useUserViewModel";
import { useEffect } from "react";

import styles from "../page.module.css";
import UsersTable from "./components/UsersTable";
import AddUserModal from "./components/UserModal/AddUser";

const HEADER_TABLE: string[] = ["Id", "Email", "First Name", "Last Name", "Avatar"];

export default function UserManagement() {
    
    const {
        loadUsers,
        users,
        handlePageClick,
        currentPage,
    } = useUserViewModel();

    useEffect(() => {
        loadUsers(currentPage);
    }, [currentPage])

    return (
        <div className={styles.page}>
            <AddUserModal />
           {users.loading ? "Loading..." : (
                    <UsersTable
                        tableData    = {users.data}
                        headers      = {HEADER_TABLE}
                        onPageChange = {handlePageClick}
                        handleSelect = {() => null}
                        // loadOrders   = {loadOrders}
                        // handleModal  = {handleModal}
                    />
                )}
        </div>
    );
}