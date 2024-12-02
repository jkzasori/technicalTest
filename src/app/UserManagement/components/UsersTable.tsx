import React from 'react';

import TablaCustom from '@/ui/components/Table';
import UserActions from './UsersActions';
import { UserData, UserList } from '@/domain/entities/User';

interface UsersTableProps 
{
    tableData      : UserList;
    headers     : string[];
    onPageChange: (page: number) => void;
    handleSelect: (id: string) => void;
    // loadOrders  : () => void;
    // handleModal : (id?:string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ 
    headers, 
    onPageChange, 
    // handleModal,
    tableData
}) => {
    const handleRowClick = (item: UserData, index: number) => {
        // handleModal(`${item.id}`);
    };
tableData
    return (
        <>
            <TablaCustom
                tableData={tableData}
                headers={headers}
                onPageChange={onPageChange}
                onRowClick={handleRowClick}
                renderRow={(user: UserData) => (
                    <>
                        <td>
                            {user.id}
                        </td>
                        <td>
                            {user.first_name}
                        </td>
                        <td>
                            {user.last_name}
                        </td>
                        <td>
                            {user.email}
                        </td>
                        <td>
                        <img className='avatar' src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                        </td>
                        <td>
                            <UserActions user={{name: user.first_name, job: ""}} userId={user.id} />
                        </td>
                    </>
                )}
            />
        </>
    );
};

export default UsersTable;
