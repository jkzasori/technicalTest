import { UserRepository } from '@/domain/repositories/UserRepository';

export class DeleteUser
{
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) 
    {
        this.userRepository = userRepository;
    }

    async execute(userId: number): Promise<any> 
    {
        const userData = await this.userRepository.deleteUser(userId);
        
        return userData;
    }
}