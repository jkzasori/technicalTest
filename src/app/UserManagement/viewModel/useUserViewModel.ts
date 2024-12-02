import { UserRepositoryImpl } from "@/data/repositories/UserRepository";
import { UserList } from "@/domain/entities/User";
import { GetUsers } from "@/domain/useCases/user/GetUsers";
import { useState } from "react";
// import { toast } from 'react-toastify';

const userRepository = new UserRepositoryImpl();

export const useUserViewModel = () => {
    const getUsersUseCase = new GetUsers(userRepository);

    
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState<{loading: boolean | undefined, data:UserList, message: string}>({
        data: {} as UserList,
        loading: undefined,
        message: "",
    });

    const onChangeUser = (property: string, value: any) => {
        return setUsers((prevState) => ({...prevState, [property]: value}))
    }

    //Funcion para paginacion
    const handlePageClick = async (pageSelected: any) => {
        setCurrentPage(pageSelected);
    };

    const loadUsers = async (page: number) => {
        onChangeUser("loading", true);
        
        try 
        {
            const usersData: UserList = await getUsersUseCase.execute(page);

            onChangeUser("data", usersData);
        } 
        catch (err: any) 
        {
            onChangeUser("message", err.message);

            console.log(`Error al cargar métodos de pagos: ${err.message || "Intente de nuevo."}`)
            // toast.error(`Error al cargar métodos de pagos: ${err.message || "Intente de nuevo."}`, {
            //     style: {
            //         backgroundColor: "#BD362F",
            //         color: "white",
            //     },
            // });
        } 
        finally
        {
            onChangeUser("loading", false);
        }
    };

    // const editOrderPaymentMethodSelected = async (data: paymentMethodPut) => {
    //     setLoading(true);

    //     try 
    //     {
    //         const paymentMethodsData = await putPaymentMethodsUseCase.execute(data);

    //          // Solo muestra el toast si la respuesta es correcta
    //         if (paymentMethodsData.status === 200)
    //         {
    //             toast.success("Nuevo método de pago asignado");
    //         } else 
    //         {
    //             toast.error(`Error al editar el método de pago: ${paymentMethodsData.error.non_field_errors[0]}. Inténtelo denuevo`);
    //         }
    //     } 
    //     catch (err: any) 
    //     {
    //         setError(err.message);
    //         toast.error(`Error al editar métodos de pago: ${err.message || "Intente de nuevo."}`);
    //     } 
    //     finally
    //     {
    //         setLoading(false);
    //     }

    // }

    return {
        loadUsers,
        users,
        handlePageClick,
        currentPage,
        // error,
        // loading,
        // paymentMethods,
        // loadPaymentMethods,
        // editOrderPaymentMethodSelected
    };
};
