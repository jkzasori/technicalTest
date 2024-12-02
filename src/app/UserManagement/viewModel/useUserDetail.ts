import { UserRepositoryImpl } from "@/data/repositories/UserRepository";
import { GetUserById } from "@/domain/useCases/user/GetUserById";
import { useState } from "react";

const userRepository = new UserRepositoryImpl();

export const useUserDetail = () => {
    const detailUsersUseCase = new GetUserById(userRepository);

    
    const [userDetail, setUserDetail] = useState<{loading: boolean | undefined, message: string}>({
        loading: undefined,
        message: "",
    });

    const detailUser = async (userId: number) => {
        setUserDetail(prevState => ({...prevState, loading: true}));

        try 
        {
            const DetailUserData = await detailUsersUseCase.execute(userId);

             // Solo muestra el toast si la respuesta es correcta
            // if (DetailUserData.status === 200)
            // {
            //     // toast.success("Nuevo método de pago asignado");
            // } else 
            // {
            //     // toast.error(`Error al editar el método de pago: ${paymentMethodsData.error.non_field_errors[0]}. Inténtelo denuevo`);
            // }
        } 
        catch (err: any) 
        {
            setUserDetail(prevState => ({...prevState, message: err.message}));
            // toast.error(`Error al editar métodos de pago: ${err.message || "Intente de nuevo."}`);
        } 
        finally
        {
            setUserDetail(prevState => ({...prevState, loading: false}));
        }

    }

    return {
        userDetail,
        detailUser,
    };
};
