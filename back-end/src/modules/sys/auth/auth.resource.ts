import {Body, Controller, HttpException, HttpStatus, Inject, Post} from '@nestjs/common';
import {LoginDto} from './auth.dto';
import {UserService} from '../user/user.service';
import BaseUtil from '../../comm/util/base.util';
import {AuthService} from './auth.service';

@Controller()
export class AuthResource {

    constructor(private readonly authService: AuthService,
                private readonly userService: UserService) {
    }

    @Post('/login')
    async login(@Body() dto: LoginDto): Promise<string> {
        const user = await this.userService.getUserByName(dto.username);
        if (!user) {
            throw new HttpException({message: 'Account was not registered!'}, HttpStatus.NOT_FOUND);
        }
        if (BaseUtil.md5Hash(dto.password, user.salt) != user.password) {
            throw new HttpException({message: 'Incorrect password!'}, HttpStatus.NOT_FOUND);
        }
        if (!user.activated) {
            throw new HttpException({message: 'Account was not activated!'}, HttpStatus.NOT_FOUND);
        }
        return this.authService.createToken({
            uid: String(user.id),
            username: user.username,
            clientIp: '127.0.0.1',
            perms: []
        }, 3600);
    }

}
