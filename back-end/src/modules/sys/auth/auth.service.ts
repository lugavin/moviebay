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
import {BaseUtil, AuthSubject} from '../../../shared';

/**
 * @see [Auth with JWT Refresh Token](https://solidgeargroup.com/en/refresh-token-with-jwt-authentication-node-js/)
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
            const refreshToken: string = BaseUtil.uuid(); // TODO UUID的无序性会严重影响MySQL索引性能, 可通过Snowflake算法生成唯一ID
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

    async verifyAccessToken(accessToken: string): Promise<AuthSubject> {
        return this.jwtService.verifyAsync<AuthSubject>(accessToken);
    }

    async getAccessToken(refreshToken: string, subject: AuthSubject): Promise<string> {
        return this.authRepository.findOne({refreshToken}).then(entity => {
            if (entity && entity.username === subject.username && dayjs(entity.expiredAt).isAfter(new Date())) {
                return this.jwtService.signAsync(subject, {expiresIn: this.jwtConfig.accessTokenExpires});
            }
            throw new HttpException('The refresh token has expired!', HttpStatus.UNAUTHORIZED);
        });
    }

    async rejectRefreshToken(refreshToken: string): Promise<DeleteResult> {
        return this.authRepository.delete({refreshToken});
    }

    async getPerms(role: string): Promise<string[]> {
        // @ts-ignore
        return this.redisClient.getAsync(role).then(res => {
            if (!res) {
                return this.permService.getPermsByRole(role).then(perms => {
                    if (perms && perms.length > 0) {
                        const permCodes: string[] = perms.map(perm => perm.code);
                        this.redisClient.set(role, JSON.stringify(permCodes));
                        return permCodes;
                    }
                    return [];
                });
            }
            return JSON.parse(res);
        });
    }

}
