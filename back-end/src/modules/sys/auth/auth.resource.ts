import {Body, Controller, HttpCode, HttpException, HttpStatus, Ip, Param, Post} from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {AuthService} from './auth.service';
import BaseUtil from '../../shared/util/base.util';
import {TokenDto} from './dto/token.dto';
import {UserEntity} from '../user/user.entity';
import {DeleteResult} from 'typeorm/query-builder/result/DeleteResult';

@Controller()
export class AuthResource {

    constructor(private readonly authService: AuthService) {
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginDto, @Ip() clientip: string): Promise<TokenDto> {
        const user: UserEntity = await this.authService.getUser(dto.username);
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
            username: user.username,
            clientip
        });
    }

    @Post('/token')
    @HttpCode(HttpStatus.OK)
    async getAccessToken(@Param('refreshToken') refreshToken: string,
                         @Param('username') username: string,
                         @Ip() clientip: string): Promise<string> {
        return this.authService.getAccessToken(refreshToken, {username, clientip});
    }

    @Post('/token/reject')
    @HttpCode(HttpStatus.NO_CONTENT)
    async rejectRefreshToken(@Param('refreshToken') refreshToken: string): Promise<DeleteResult> {
        return this.authService.rejectRefreshToken(refreshToken);
    }

}
