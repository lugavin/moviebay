import * as dayjs from 'dayjs';
import {RedisClient} from 'redis';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {DeleteResult} from 'typeorm/query-builder/result/DeleteResult';
import {TokenDto} from './dto/token.dto';
import {AuthEntity} from './auth.entity';
import {PermService} from '../perm/perm.service';
import {jwtConfigFactory} from '../../../config';
import {BaseUtil, AuthSubject, RedisKey} from '../../../shared';

/**
 * @see <a href="https://solidgeargroup.com/en/refresh-token-with-jwt-authentication-node-js/">Refresh token with JWT authentication in Node.js</a>
 */
@Injectable()
export class AuthService {

    private readonly jwtConfig: {accessTokenExpires, refreshTokenExpires};

    constructor(private readonly redisClient: RedisClient,
                private readonly jwtService: JwtService,
                private readonly permService: PermService,
                @InjectRepository(AuthEntity) private readonly authRepository: Repository<AuthEntity>) {
        this.jwtConfig = jwtConfigFactory();
    }

    async createToken(subject: AuthSubject): Promise<TokenDto> {
        return this.jwtService.signAsync(subject, {expiresIn: this.jwtConfig.accessTokenExpires}).then(accessToken => {
            const refreshToken: string = BaseUtil.randomString(); // TODO 通过Snowflake算法生成唯一ID(UUID的无序性会严重影响MySQL索引性能)
            const expiresIn: number = this.jwtConfig.refreshTokenExpires;
            const createdAt: Date = new Date();
            const expiredAt: Date = dayjs(createdAt).add(expiresIn, 'second').toDate();
            return this.authRepository.save({
                username: subject.username,
                refreshToken,
                createdAt,
                expiredAt
            }).then(() => ({accessToken, refreshToken, expiresIn}));
        });
    }

    async verifyAccessToken(token: string): Promise<AuthSubject> {
        return this.jwtService.verifyAsync<AuthSubject>(token);
    }

    async getAccessToken(refreshToken: string, subject: AuthSubject): Promise<string> {
        const expiresIn: number = this.jwtConfig.accessTokenExpires;
        return this.authRepository.findOne({refreshToken}).then(entity => {
            if (entity && entity.username === subject.username && dayjs(entity.expiredAt).isAfter(new Date())) {
                return this.jwtService.signAsync(subject, {expiresIn});
            }
            throw new HttpException('The refresh token has expired!', HttpStatus.UNAUTHORIZED);
        });
    }

    async rejectRefreshToken(refreshToken: string): Promise<DeleteResult> {
        return this.authRepository.delete({refreshToken});
    }

    async getPerms(role: string): Promise<string[]> {
        // @ts-ignore
        return this.redisClient.hgetAsync(RedisKey.HKEY_PERMS, role).then(res => {
            if (!res) {
                return this.permService.getPermsByRole(role).then(entities => {
                    if (entities && entities.length > 0) {
                        const perms: string[] = entities.map(entity => entity.code);
                        this.redisClient.hset(RedisKey.HKEY_PERMS, role, JSON.stringify(perms));
                        return perms;
                    }
                    return [];
                });
            }
            return JSON.parse(res);
        });
    }

}
