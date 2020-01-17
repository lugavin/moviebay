import {Body, Controller, HttpCode, HttpException, HttpStatus, Ip, Post} from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {AuthService} from './auth.service';
import BaseUtil from '../../shared/util/base.util';

@Controller()
export class AuthResource {

    constructor(private readonly authService: AuthService) {
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginDto, @Ip() clientIp: string): Promise<string> {
        const user = await this.authService.getUser(dto.username);
        if (!user) {
            throw new HttpException('Account was not registered!', HttpStatus.BAD_REQUEST);
        }
        if (BaseUtil.md5Hash(dto.password, user.salt) !== user.password) {
            throw new HttpException('Incorrect password!', HttpStatus.BAD_REQUEST);
        }
        if (!user.activated) {
            throw new HttpException('Account was not activated!', HttpStatus.BAD_REQUEST);
        }
        return this.authService.createToken({
            clientIp,
            uid: user.id,
            username: user.username,
        });
    }
}
