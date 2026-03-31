import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthBodyDto } from './authBodyDto';
import bcrypt from "bcrypt";
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService ) {}

    async login(authBody: AuthBodyDto){
        const {userName, userPassword} = authBody
        const data = await this.userService.getUser(userName)
        
        if(!data) throw new NotFoundException({error: "Invalid username or password"})
        
        const isCorrectPassword = await this.verifyPassword(userPassword, data.userPassword)
        if(!isCorrectPassword)  throw new NotFoundException({error: "Invalid username or password"})
        
        return {userId: data.userId, userName: userName}
    }

    private async verifyPassword(password: string, hashPassword): Promise<boolean>{
        return bcrypt.compare(password, hashPassword) 
    }
}
