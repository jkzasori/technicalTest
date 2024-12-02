import { UserRepositoryImpl } from "@/data/repositories/UserRepository";
import { DeleteUser } from "@/domain/useCases/user/DeleteUser";
import { useState } from "react";
import { toast } from 'react-toastify';

const userRepository = new UserRepositoryImpl();

export const useUserDelete = (onAction: () => void) => {
    const deleteUsersUseCase = new DeleteUser(userRepository);

    
    const [userDelete, setUserDelete] = useState<{loading: boolean | undefined, message: string}>({
        loading: undefined,
        message: "",
    });

    const deleteNewUser = async (userId: number) => {
        setUserDelete(prevState => ({...prevState, loading: true}));

        try 
        {
            await deleteUsersUseCase.execute(userId);

            toast.success("User delete");
        } 
        catch (err: any) 
        {
            setUserDelete(prevState => ({...prevState, message: err.message}));
            toast.error(`Error: ${err.message || "The user cannot be deleted. Try again"}`);
        } 
        finally
        {
            setUserDelete(prevState => ({...prevState, loading: false}));
            onAction();
        }

    }

    return {
        userDelete,
        deleteNewUser,
    };
};
