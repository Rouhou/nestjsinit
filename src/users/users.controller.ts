import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUsers() {
        const data = this.usersService.getUsers()
        return data
    }

    @Post()
    async createUsers(@Body() user: User ) {
        const data = this.usersService.createUser(user)
        return data
    }
}
