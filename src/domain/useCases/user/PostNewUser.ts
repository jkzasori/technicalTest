import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';

export class PostNewUser
{
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) 
    {
        this.userRepository = userRepository;
    }

    async execute(user: User): Promise<any> 
    {
        const userData = await this.userRepository.postNewUser(user);
        
        return userData;
    }
}