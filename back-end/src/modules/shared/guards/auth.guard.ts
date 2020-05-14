import {CanActivate, ExecutionContext, Logger} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {AuthService} from '../../sys/auth/auth.service';
import {Subject} from '../../sys/auth/dto/subject';
import Consts from '../util/consts';

export class AuthGuard implements CanActivate {

    constructor(private readonly reflector: Reflector,
                private readonly authService: AuthService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const perms = this.reflector.get<string[]>(Consts.PERMS_KEY, context.getHandler());
        if (!perms) { // 匿名访问地址
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const resolveToken = (bearerToken) => bearerToken && bearerToken.startsWith('Bearer ') ? bearerToken.substring(7) : null;
        const token = resolveToken(request.headers.authorization);
        if (!token) {
            Logger.warn('Unauthorized!', AuthGuard.name);
            return false;
        }
        let subject: Subject;
        try {
            subject = await this.authService.verifyAccessToken(token);
        } catch (e) {
            Logger.error('Verify token failed!', e, AuthGuard.name);
            return false;
        }
        // request.user = activeUser;
        if (!perms.length) { // 公共访问地址(登录后无需授权)
            return true;
        }
        // 授权访问地址(登录后需要授权)
        const userPerms = await this.authService.getPerms(subject.username);
        const hasPerm = () => perms.every(perm => userPerms.includes(perm));
        return userPerms && userPerms.length && hasPerm();
    }

}
