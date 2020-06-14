import {Body, Controller, Get, Post, Delete, Ip, Param, Query, HttpCode, HttpStatus, HttpException} from '@nestjs/common';
import {DeleteResult} from 'typeorm/query-builder/result/DeleteResult';
import {LoginDto} from './dto/login.dto';
import {TokenDto} from './dto/token.dto';
import {AuthService} from './auth.service';
import {UserEntity} from '../user/user.entity';
import {UserService} from '../user/user.service';
import {BaseUtil} from '../../../shared';

@Controller()
export class AuthResource {

    constructor(private readonly authService: AuthService,
                private readonly userService: UserService) {
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginDto, @Ip() clientip: string): Promise<TokenDto> {
        const user: UserEntity = await this.userService.getUserByName(dto.username);
        if (!user) {
            throw new HttpException('Account was not registered!', HttpStatus.BAD_REQUEST);
        }
        if (BaseUtil.md5Hash(dto.password, user.salt) !== user.password) {
            throw new HttpException('Incorrect username or password!', HttpStatus.BAD_REQUEST);
        }
        if (!user.activated) {
            throw new HttpException('Account was not activated!', HttpStatus.BAD_REQUEST);
        }
        return this.authService.createToken({
            roles: user.roles.map(r => r.code),
            username: user.username,
            clientip
        });
    }

    @Get('/token/:refreshToken')
    @HttpCode(HttpStatus.OK)
    async getAccessToken(@Ip() clientip: string,
                         @Query('username') username: string,
                         @Param('refreshToken') refreshToken: string): Promise<string> {
        const user: UserEntity = await this.userService.getUserByName(username);
        if (!user) {
            throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
        }
        // TODO 在生成新的 Access Token 之前, 需要检查用户是否被禁用或者 Refresh Token 是否已被加入黑名单
        return this.authService.getAccessToken(refreshToken, {
            roles: user.roles.map(e => e.code),
            username,
            clientip
        });
    }

    @Delete('/token/reject/:refreshToken')
    @HttpCode(HttpStatus.NO_CONTENT)
    async rejectRefreshToken(@Param('refreshToken') refreshToken: string): Promise<DeleteResult> {
        return this.authService.rejectRefreshToken(refreshToken);
    }

}
