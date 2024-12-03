import React from 'react';

import Paginator from '../Paginator';
import "./styles.css";
import { UserData, UserList } from '@/domain/entities/User';

/**
 * TablaCustom Component
 * 
 * A reusable, responsive table component that displays tabular data with customizable headers and rows. 
 * Includes pagination and optional row click handling.
 * 
 * @component
 * 
 * @param {UserList} tableData - The data source for the table, including the list of rows and pagination details.
 * @param {string[]} headers - An array of strings representing the table headers.
 * @param {(item: UserData, index: number) => JSX.Element} renderRow - A function to render each row of the table based on the provided data.
 * @param {string} [className='table-custom'] - Optional CSS class for the table.
 * @param {(page: number) => void} onPageChange - Callback triggered when the page changes, used for pagination.
 * @param {(item: UserData, index: number) => void} [onRowClick] - Optional callback triggered when a table row is clicked.
 * 
 * @returns {React.FC<TablaCustomProps>} The TablaCustom component.
 */
interface TablaCustomProps {
    /** The data for the table, including rows and pagination details. */
    tableData: UserList;

    /** An array of table header names to display. */
    headers: string[];

    /** Function to render each table row based on the data. */
    renderRow: (item: UserData, index: number) => JSX.Element;

    /** Optional CSS class for the table. */
    className?: string;

    /** Callback triggered when the page changes in the paginator. */
    onPageChange: (page: number) => void;

    /** Optional callback triggered when a table row is clicked. */
    onRowClick?: (item: UserData, index: number) => void;
}

const TablaCustom: React.FC<TablaCustomProps> = ({
    headers,
    tableData,
    renderRow,
    className = 'table-custom',
    onPageChange,
    onRowClick,
}: TablaCustomProps) => {
    /**
     * Handles the row click event.
     * 
     * @param {UserData} item - The data object associated with the clicked row.
     * @param {number} index - The index of the clicked row.
     */
    const handleRowClick = (item: UserData, index: number) => {
        if (onRowClick) {
            onRowClick(item, index);
        }
    };

    return (
        <>
            <div className="table-responsive">
                <table className={className}>
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData?.data?.map((item, index) => (
                            <tr 
                                key={index} 
                                onClick={() => handleRowClick(item, index)} 
                                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                            >
                                {renderRow(item, index)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Paginator
                data={tableData.data}
                totalData={tableData.total}
                currentPage={tableData.page}
                onPageChange={onPageChange}
                defaultPageSize={tableData.per_page}
            />
        </>
    );
};

export default TablaCustom;
