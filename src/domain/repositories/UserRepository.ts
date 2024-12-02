import { User, UserData, UserList, UserSupport } from "../entities/User";

export interface UserRepository
{
    getUsers(page: number): Promise<UserList>;

    getUserById(userId: number): Promise<{data: UserData, support: UserSupport}>;

    postNewUser(user: User): Promise<any>;
    
    putUser(userId: number, user: User): Promise<any>;
    
    deleteUser(userId: number): Promise<any>;
}
