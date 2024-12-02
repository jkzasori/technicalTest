import { UserData, UserSupport } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';

export class GetUserById
{
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) 
    {
        this.userRepository = userRepository;
    }

    async execute(userId: number): Promise<{data: UserData, support: UserSupport}> 
    {
        const userData = await this.userRepository.getUserById(userId);
        
        return userData;
    }
}