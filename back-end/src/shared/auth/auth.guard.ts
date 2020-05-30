import {CanActivate, ExecutionContext, Logger} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {AuthSubject} from './auth.subject';
import {Consts} from '../util';
import {AuthService} from '../../modules/sys/auth/auth.service';

export class AuthGuard implements CanActivate {

    constructor(private readonly reflector: Reflector,
                private readonly authService: AuthService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const perms: string[] = this.reflector.get<string[]>(Consts.PERMS_KEY, context.getHandler());
        if (!perms) { // 匿名访问地址(无需登录)
            return true;
        }
        const req = context.switchToHttp().getRequest();
        const token = AuthGuard.resolveToken(req.headers.authorization);
        if (!token) {
            Logger.warn('Unauthorized!', AuthGuard.name);
            return false;
        }
        let subject: AuthSubject;
        try {
            subject = await this.authService.verifyAccessToken(token);
        } catch (e) {
            Logger.error('Verify token failed!', e, AuthGuard.name);
            return false;
        }
        req.user = subject;
        if (!perms.length) { // 公共访问地址(登录后无需授权)
            return true;
        }
        // 授权访问地址(登录后需要授权)
        return this.hasPerms(subject.roles, perms);
    }

    private static resolveToken(bearerToken: string): string {
        return bearerToken && bearerToken.startsWith('Bearer ') ? bearerToken.substring(7) : null;
    }

    private async hasPerms(roles: string[], perms: string[]): Promise<boolean> {
        for (const role of roles) {
            const userPerms: string[] = await this.authService.getPerms(role);
            if (perms.every(perm => userPerms.includes(perm))) {
                return true;
            }
        }
        return false;
    }

}
