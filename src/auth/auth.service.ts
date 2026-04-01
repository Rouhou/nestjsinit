import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthBodyDto } from './authBodyDto';
import bcrypt from "bcrypt";
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, 
        private readonly jwtService: JwtService ) {}

    async login(authBody: AuthBodyDto){
        const {userName, userPassword} = authBody
        const data = await this.userService.getUser(userName)
        
        if(!data) throw new UnauthorizedException({error: "Invalid username or password"})
        
        const isCorrectPassword = await this.verifyPassword(userPassword, data.userPassword)
        if(!isCorrectPassword)  throw new UnauthorizedException({error: "Invalid username or password"})
        
        return this.getToken({userId: data.userId})
    }

    async getProfile(username: string){
        const user = await this.userService.getUser(username)

        if(!user) throw new NotFoundException({error: "User not found"})

        return {userId: user.userId, userName: user.userName}
    }

    private async verifyPassword(password: string, hashPassword): Promise<boolean>{
        return bcrypt.compare(password, hashPassword)
    }

    private async getToken({userId}: {userId: string}) {
        const payload = {userId}
        return {access_token: await this.jwtService.sign(payload)}
    }
}
