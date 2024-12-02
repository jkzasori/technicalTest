import { AxiosError } from "axios";

import { UserRepository } from "@/domain/repositories/UserRepository";
import { User, UserData, UserList, UserSupport } from "@/domain/entities/User";
import { deleteRequest, getRequest, postRequest, putRequest } from "../adaper/httpRequests";

/**
 * Implementation of `OrderRepository` that fetches order data
 * 
 * @remarks Uses Axios instances to make HTTP requests to the order server
 */
export class UserRepositoryImpl implements UserRepository {
    /**
     * Fetches a paginated list of users from the server
     *
     * @throws A promise that resolves to an error if the request fails
     * 
     * @param limit  - Number of orders to retrieve
     * @param offset - Offset for pagination
     * 
     * @returns A promise that resolves to an object containing the total count and an array of `Order` objects
     */
    async getUsers(page: number): Promise<UserList>
    {
        try 
        {
            const response = await getRequest<UserList>(`https://reqres.in/api/users?page=${page}`);

            return {
                page       : response.page,
                per_page   : response.per_page,
                total      : response.total,
                total_pages: response.total_pages,
                data       : response.data,
            };
        } 
        catch (error) 
        {
            let e: AxiosError<unknown, any> = error as AxiosError;

            const apiError: any = JSON.parse(JSON.stringify(e.response?.data || {}));

            return Promise.resolve(apiError);
        }
    }


    async getUserById(userId: number): Promise<{data: UserData, support: UserSupport}>
    {
        try 
        {
            const response = await getRequest<{data: UserData, support: UserSupport}>(`/api/users/${userId}`);

            return {
                data       : response.data,
                support : response.support,
            };
        } 
        catch (error) 
        {
            let e: AxiosError<unknown, any> = error as AxiosError;

            const apiError: any = JSON.parse(JSON.stringify(e.response?.data || {}));

            return Promise.resolve(apiError);
        }
    }

    async postNewUser(user: User): Promise<any>
    {
        try
        {
            const response = await postRequest<any>(
                `/api/users/`,
                user,
            );
                    
            return response;
        }
        catch (error)
        {
            let e: AxiosError<unknown, any> = error as AxiosError;
    
            const apiError: any = JSON.parse(JSON.stringify(e.response?.data || {}));
    
            return Promise.resolve(apiError);
        }
    }
    
    async putUser(userId: number, user: User): Promise<any>
    {
        try
        {
            const response = await putRequest<any>(
                `/api/users/${userId}`,
                user,
            );
                    
            return response;
        }
        catch (error)
        {
            let e: AxiosError<unknown, any> = error as AxiosError;
    
            const apiError: any = JSON.parse(JSON.stringify(e.response?.data || {}));
    
            return Promise.resolve(apiError);
        }
    }
    
    async deleteUser(userId: number): Promise<any>
    {
        try
        {
            const response = await deleteRequest<any>(`/api/users/${userId}`);
                    
            return response;
        }
        catch (error)
        {
            let e: AxiosError<unknown, any> = error as AxiosError;
    
            const apiError: any = JSON.parse(JSON.stringify(e.response?.data || {}));
    
            return Promise.resolve(apiError);
        }
    }
}