import {IsEmail, IsNotEmpty} from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    readonly username: string;
    @IsNotEmpty()
    readonly password: string;
    @IsEmail()
    readonly email: string;
}
