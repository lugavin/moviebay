import {CanActivate, ExecutionContext, Logger} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Constants} from '../constants';
import {AuthService} from '../../sys/auth/auth.service';

export class AuthGuard implements CanActivate {

    constructor(private readonly reflector: Reflector,
                private readonly authService: AuthService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const perms = this.reflector.get<string[]>(Constants.PERMS_KEY, context.getHandler());
        if (!perms) { // 匿名访问地址
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const resolveToken = (bearerToken) => bearerToken && bearerToken.startsWith('Bearer ') ? bearerToken.substring(7) : null;
        //const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
        const token = resolveToken(request.headers.authorization);
        if (!token) { // 登录访问地址(需要授权和无需授权)
            Logger.error('Unauthorized!');
            return false;
        }
        try {
            request.user = await this.authService.verifyToken(token);
        } catch (e) {
            Logger.error(e);
            return false;
        }
        //const user = request.user;
        //const hasPerm = (user) => user.perms.some((perm) => perms.includes(perm));
        //return user && user.perms && hasPerm();
        return true;
    }

}