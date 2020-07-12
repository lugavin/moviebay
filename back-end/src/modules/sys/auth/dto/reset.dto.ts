import {IsNotEmpty} from 'class-validator';

export class ResetDto {
    @IsNotEmpty()
    readonly resetKey: string;
    @IsNotEmpty()
    readonly newPassword: string;
}
