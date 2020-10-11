import {Body, Controller, Get, Post, Delete, Ip, Param, Query, HttpCode, HttpStatus, HttpException, Logger} from '@nestjs/common';
import {DeleteResult} from 'typeorm/query-builder/result/DeleteResult';
import {MailerService} from '@nestjs-modules/mailer';
import {LoginDto} from './dto/login.dto';
import {TokenDto} from './dto/token.dto';
import {ResetDto} from './dto/reset.dto';
import {AuthService} from './auth.service';
import {UserEntity} from '../user/user.entity';
import {UserService} from '../user/user.service';
import {UserDto} from '../user/dto/user.dto';
import {BaseUtil} from '../../../shared';

@Controller()
export class AuthResource {

    constructor(private readonly authService: AuthService,
                private readonly userService: UserService,
                private readonly mailerService: MailerService) {
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginDto, @Ip() clientip: string): Promise<TokenDto> {
        const user = await this.userService.getUserByName(dto.username);
        if (!user) {
            throw new HttpException('Account was not registered!', HttpStatus.BAD_REQUEST);
        }
        if (BaseUtil.md5Hash(dto.password, user.salt) !== user.password) {
            throw new HttpException('Incorrect username or password!', HttpStatus.BAD_REQUEST);
        }
        if (!user.activated) {
            throw new HttpException('Account was not activated!', HttpStatus.BAD_REQUEST);
        }
        return this.authService.createAuthToken({
            uid: user.id,
            username: user.username,
            roles: user.roles.map(r => r.code),
            clientip
        });
    }

    @Get('/token/:refreshToken')
    @HttpCode(HttpStatus.OK)
    async getAccessToken(@Ip() clientip: string,
                         @Query('uid') uid: number,
                         @Param('refreshToken') refreshToken: string): Promise<string> {
        const user = await this.userService.getUser(uid);
        if (!user) {
            throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
        }
        // TODO 在生成新的 AccessToken 之前, 需要检查用户是否被禁用或者 RefreshToken 是否已被加入黑名单
        return this.authService.getAccessToken(refreshToken, {
            uid: user.id,
            username: user.username,
            roles: user.roles.map(e => e.code),
            clientip
        });
    }

    @Delete('/token/reject/:refreshToken')
    @HttpCode(HttpStatus.NO_CONTENT)
    async rejectRefreshToken(@Param('refreshToken') refreshToken: string): Promise<DeleteResult> {
        return this.authService.rejectRefreshToken(refreshToken);
    }

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() dto: UserDto): Promise<UserEntity> {
        return this.userService.registerUser(dto).then(u => {
            this.mailerService.sendMail({
                to: `${u.email}`,
                subject: `${process.env.APP_NAME} 账号激活`,
                html: `<p>亲爱的 ${u.username}</p>
                       <p>您的 ${process.env.APP_NAME} 账号已创建成功, 请点击下列链接启用您的账号:</p>
                       <p><a href="${process.env.APP_BASE_URL}/account/activate?key=${u.activationKey}">激活账号</a></p>
                       <p><span>祝您使用愉快, </span><br/><em>${process.env.APP_NAME} 团队.</em></p>`
            }).then(() => {
                Logger.debug(`账号 ${u.email} 激活邮件发送成功`, AuthResource.name);
            }).catch(e => {
                Logger.error(`账号 ${u.email} 激活邮件发送失败`, e.stack, AuthResource.name);
            });
            return u;
        });
    }

    @Get('/account/activate')
    async activateAccount(@Query('key') activationKey: string): Promise<UserEntity> {
        return this.userService.activateUser(activationKey);
    }

    @Post('/account/reset-password/init')
    async requestPasswordReset(@Query('mail') mail: string): Promise<UserEntity> {
        return this.userService.requestPasswordReset(mail).then(u => {
            this.mailerService.sendMail({
                to: `${u.email}`,
                subject: `${process.env.APP_NAME} 密码重置`,
                html: `<p>亲爱的 ${u.username}</p>
                       <p>您的 ${process.env.APP_NAME} 账号密码重置请求已收到, 请点击以下链接重置密码:</p>
                       <p><a href="${process.env.APP_BASE_URL}/account/reset-password/finish?key=${u.resetKey}">重置密码</a></p>
                       <p><span>祝您使用愉快, </span><br/><em>${process.env.APP_NAME} 团队.</em></p>`
            }).then(() => {
                Logger.debug(`账号 ${u.email} 重置密码邮件发送成功`, AuthResource.name);
            }).catch(e => {
                Logger.error(`账号 ${u.email} 重置密码邮件发送失败`, e.stack, AuthResource.name);
            });
            return u;
        });
    }

    @Post('/account/reset-password/finish')
    async finishPasswordReset(@Body() dto: ResetDto): Promise<UserEntity> {
        return this.userService.finishPasswordReset(dto.resetKey, dto.newPassword);
    }

}
