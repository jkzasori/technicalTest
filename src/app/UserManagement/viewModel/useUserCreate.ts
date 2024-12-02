import { UserRepositoryImpl } from "@/data/repositories/UserRepository";
import { User } from "@/domain/entities/User";
import { PostNewUser } from "@/domain/useCases/user/PostNewUser";
import { useState } from "react";
import { toast } from 'react-toastify';

const userRepository = new UserRepositoryImpl();

export const useUserCreate = (onAction: () => void) => {
    const postUsersUseCase = new PostNewUser(userRepository);

    
    const [userCreate, setUserCreate] = useState<{loading: boolean | undefined, message: string}>({
        loading: undefined,
        message: "",
    });

    const [user, setUser] = useState<User>({
        name: "",
        job: ""
    });

    const onChangeUser = (property: string, value: any) => {
        return setUser((prevState) => ({...prevState, [property]: value}))
    }

    const validateUser = () => {
        if(user.name && user.job)
        {
            return true;
        }
        return false;
    }

    const createNewUser = async () => {
        if (validateUser())
        {
            setUserCreate(prevState => ({...prevState, loading: true}));

            try 
            {
                const newUserData = await postUsersUseCase.execute(user);
    
                if (newUserData.status === 201)
                {
                    toast.success("New User created!");
                } else 
                {
                    toast.error(`Error: The user cannot be created`);
                }
            } 
            catch (err: any) 
            {
                setUserCreate(prevState => ({...prevState, message: err.message}));
                toast.error(`Error: ${err.message || "The user cannot be created. Try again"}`);
            } 
            finally
            {
                setUserCreate(prevState => ({...prevState, loading: false}));
                onAction();
            }
        }
        else 
        {
            toast.error(`Error: Verifique que todos los campos estén llenos`);
        }
        

    }

    return {
        user,
        userCreate,
        onChangeUser,
        createNewUser,
    };
};
