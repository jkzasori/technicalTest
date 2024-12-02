export interface UserData
{
    id        : number,
    email     : string,
    first_name: string,
    last_name : string,
    avatar    : string,
}

export interface UserList
{
    page       : number,
    per_page   : number,
    total      : number,
    total_pages: number,
    data       : UserData[],
}

export interface UserSupport
{
    url : string,
    text: string,
}

export interface User
{
    name: string,
    job : string,
}