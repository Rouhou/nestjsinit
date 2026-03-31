import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthBodyDto } from './authBodyDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post("/login")
    async login(@Body() body: AuthBodyDto ){
        const data = await this.authService.login(body)
        return data
    }
}
