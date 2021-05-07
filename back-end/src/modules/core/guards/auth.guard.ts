import {CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {AuthSubject} from './auth.subject';
import {Consts} from 'src/shared';
import {AuthService} from '../../sys/auth/auth.service';

/**
 * Note that behind the scenes, when a guard returns false, the framework throws a ForbiddenException.
 * If you want to return a different error response, you should throw your own specific exception(For example: throw new UnauthorizedException()).
 * @see https://docs.nestjs.com/guards
 */
export class AuthGuard implements CanActivate {

    constructor(private readonly reflector: Reflector,
                private readonly authService: AuthService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const perms: string[] = this.reflector.get<string[]>(Consts.AUTH_KEY, context.getHandler());
        if (!perms) { // 匿名访问地址(无需登录)
            return true;
        }
        const req = context.switchToHttp().getRequest();
        const token = AuthGuard.resolveToken(req.headers.authorization);
        if (!token) {
            throw new UnauthorizedException('Unauthorized!');
        }
        let subject: AuthSubject;
        try {
            subject = await this.authService.verifyAccessToken(token);
        } catch (e) {
            throw new UnauthorizedException('Verify token failed!');
        }
        req.user = subject;
        if (!perms.length) { // 公共访问地址(登录后无需授权)
            return true;
        }
        return this.hasPerms(subject.roles, perms); // 授权访问地址(登录后需要授权)
    }

    private async hasPerms(roles: string[], perms: string[]): Promise<boolean> {
        let rolesPerms: string[] = [];
        for (const role of roles) {
            rolesPerms = rolesPerms.concat(await this.authService.getPerms(role));
        }
        const rolePerms: Set<string> = new Set<string>(rolesPerms); // 去重
        return perms.every(perm => rolePerms.has(perm));
    }

    private static resolveToken(bearerToken: string): string {
        return bearerToken && bearerToken.startsWith('Bearer ') ? bearerToken.substring(7) : null;
    }
}
