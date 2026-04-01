import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthBodyDto } from './authBodyDto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post("/login")
    async login(@Body() body: AuthBodyDto ){
        const data = await this.authService.login(body)
        return data
    }

    @UseGuards(AuthGuard)
    @Post("/profile")
    async getProfile(@Request() req){
        const data = await this.authService.getProfile(req?.user?.userName)
        return data
    }
}
