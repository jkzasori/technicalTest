import React from 'react';

import Paginator from '../Paginator';

import "./styles.css";
import { UserData, UserList } from '@/domain/entities/User';

// Tipos para las props del componente
interface TablaCustomProps
{
    tableData      : UserList
    headers        : string[];  // Cabeceras de la tabla
    renderRow      : (item: UserData, index: number) => JSX.Element; // Función para renderizar cada fila
    className?     : string;  // Clase CSS opcional para la tabla
    onPageChange   : any,
    onRowClick?    : (item: UserData, index: number) => void;
}

const TablaCustom: React.FC<TablaCustomProps> = ({
    headers,
    tableData,
    renderRow,
    className = 'table-custom',
    onPageChange,
    onRowClick,
}: TablaCustomProps) => {
    const handleRowClick = (item: UserData, index: number) => {
        if (onRowClick)
        {
            onRowClick(item, index);
        }
    };

    return (
    <>
        <div className='table-responsive'>
            <table className={className}>
                <thead>
                    <tr>
                        {headers?.map((header, index) => (
                            <th key={index}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData?.data?.map((item, index) => (
                            <tr 
                                key     = {index} 
                                onClick = {() => handleRowClick(item, index)} // Manejador de clic en la fila
                                style   = {{ cursor: onRowClick ? 'pointer' : 'default' }}
                            >
                                {renderRow(item, index)}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        <Paginator
            data            = {tableData.data}
            totalData       = {tableData.total}
            currentPage     = {tableData.page}
            onPageChange    = {onPageChange}
            defaultPageSize = {tableData.per_page}
          />
    </>
        
    );
};

export default TablaCustom;
