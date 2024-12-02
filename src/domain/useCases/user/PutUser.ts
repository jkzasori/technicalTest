import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';

export class PutUser
{
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) 
    {
        this.userRepository = userRepository;
    }

    async execute(userId: number, user: User): Promise<any> 
    {
        const userData = await this.userRepository.putUser(userId, user);
        
        return userData;
    }
}