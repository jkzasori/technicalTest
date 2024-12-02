import { UserList } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';

export class GetUsers
{
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) 
    {
        this.userRepository = userRepository;
    }

    async execute(page: number = 1): Promise<UserList> 
    {
        const usersData = await this.userRepository.getUsers(page);
        
        return usersData;
    }
}