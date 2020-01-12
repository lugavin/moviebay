import {IsNotEmpty} from 'class-validator';

export class ActiveUser {
    readonly uid: string;
    readonly username: string;
    readonly clientIp: string;
}

export class LoginDto {
    @IsNotEmpty()
    readonly username: string;
    @IsNotEmpty()
    readonly password: string;
}