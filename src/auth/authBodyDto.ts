import { IsNotEmpty, IsString } from "class-validator"

export class AuthBodyDto{
    @IsNotEmpty()
    @IsString()
    userName: string

    @IsNotEmpty()
    userPassword: string
} 