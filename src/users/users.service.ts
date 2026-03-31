import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User> ) {}

    async getUsers(): Promise<User[]> {
        const data = await this.userRepository.find()
        return data;
    }

    async getUser(username: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ ['userName'] : username})
        return user!
    }

    async createUser(user: User) : Promise<string>{
        const hashPassword = await this.hashPassword(user.userPassword)
        await this.userRepository.save({...user, userPassword: hashPassword});
        return `User ${user.userName} has been create `
    }

    private async hashPassword(password: string): Promise<string>{
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
}
