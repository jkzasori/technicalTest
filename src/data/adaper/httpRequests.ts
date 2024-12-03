import { 
         AxiosInstance,
         AxiosResponse,
         AxiosRequestConfig, 
       } from "axios";

import axiosInstance from "../interceptors/axioxInstance";

/**
 * Makes a GET requests to the specified URL
 * 
 * @template T - The expected response type
 * 
 * @param url     - The URL to send the request to
 * @param useAuth - Indicates whether to use the authenticated axios instance
 * @param config  - Additional configuration options for the request
 */
export async function getRequest<T>(url: string, config: AxiosRequestConfig = {}): Promise<{ status: number, data: T | null, error?: any }> 
{
    const axios: AxiosInstance = axiosInstance;

    const response: AxiosResponse<T> = await axios.get(url, config);

    return { status: response.status, data: response.data };
}

/**
 * Makes a POST request to the specified URL
 * 
 * @template T - The expected response type
 * 
 * @param url     - The URL to send the request to
 * @param data    - The data to be sent in the request body
 * @param useAuth - Indicates whether to use the authenticated axios instance
 * @param config  - Additional configuration options for the request
 */
export async function postRequest<T>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<{ status: number, data: T | null, error?: any }> {
    const axios: AxiosInstance = axiosInstance;

    try 
    {
        const response: AxiosResponse<T> = await axios.post(url, data, config);

        return { status: response.status, data: response.data };
    }  
    catch (error: any)
    {
        
        if (error.response)
        {
            return { status: error.response.status, data: null, error: error.response.data };
        }
        
        return { status: 500, data: null, error: error.message || "Error inesperado" };
    }
}

/**
 * Makes a PUT requests to the specified URL
 *
 * @template T - The expected response type
 * 
 * @param url     - The URL to send the request to
 * @param data    - The data to be sent in the request body
 * @param useAuth - Indicates whether to use the authenticated axios instance
 * @param config  - Additional configuration options for the request
 */
export async function putRequest<T>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<{ status: number, data: T | null, error?: any }> 
{
    const axios: AxiosInstance = axiosInstance;

    try 
    {
        const response: AxiosResponse<T> = await axios.put(url, data, config);

        return { status: response.status, data: response.data };
    } 
    catch (error: any)
    {
        
        if (error.response)
        {
            return { status: error.response.status, data: null, error: error.response.data };
        }
        
        return { status: 500, data: null, error: error.message || "Error inesperado" };
    }
}

/**
 * Makes a DELETE requests to the specified URL
 *
 * @template T - The expected response type
 * 
 * @param url     - The URL to send the request to
 * @param useAuth - Indicates whether to use the authenticated axios instance
 * @param config  - Additional configuration options for the request
 */
export async function deleteRequest<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> 
{
    const axios: AxiosInstance = axiosInstance;

    const response: AxiosResponse<T> = await axios.delete(url, config);

    return response.data;
}