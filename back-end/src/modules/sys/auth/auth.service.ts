import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {RedisClient} from 'redis';
import {Subject} from './dto/subject';
import {UserEntity} from '../user/user.entity';
import {UserService} from '../user/user.service';
import {PermService} from '../perm/perm.service';
import {RedisKey} from '../../shared/util/enums';
import {TokenDto} from './dto/token.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Equal, Repository} from 'typeorm';
import {AuthEntity} from './auth.entity';
import BaseUtil from '../../shared/util/base.util';
import {DeleteResult} from 'typeorm/query-builder/result/DeleteResult';

/**
 * @see <a href="https://solidgeargroup.com/en/refresh-token-with-jwt-authentication-node-js/">Refresh token with JWT authentication in Node.js</a>
 */
@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService,
                private readonly redisClient: RedisClient,
                private readonly userService: UserService,
                private readonly permService: PermService,
                @InjectRepository(AuthEntity) private readonly authRepository: Repository<AuthEntity>) {
    }

    async createToken(subject: Subject, expiresIn: number = parseInt(process.env.JWT_EXPIRES, 10)): Promise<TokenDto> {
        return this.jwtService.signAsync(subject, {expiresIn}).then(accessToken => {
            const refreshToken: string = BaseUtil.randomString(); // TODO 不可重复
            return this.authRepository.save({
                openid: subject.username,
                refreshToken
            }).then(() => ({accessToken, refreshToken, expiresIn}));
        });
    }

    async verifyAccessToken(token: string): Promise<Subject> {
        return this.jwtService.verifyAsync<Subject>(token);
    }

    async getAccessToken(refreshToken: string, subject: Subject, expiresIn: number = parseInt(process.env.JWT_EXPIRES, 10)): Promise<string> {
        return this.authRepository.findOne({refreshToken: Equal(`${refreshToken}`)}).then(entity => {
            if (entity && entity.openid === subject.username) {
                return this.jwtService.signAsync(subject, {expiresIn});
            }
            throw new HttpException('The refresh token has expired!', HttpStatus.UNAUTHORIZED);
        });
    }

    async rejectRefreshToken(refreshToken: string): Promise<DeleteResult> {
        return this.authRepository.delete({refreshToken});
    }

    async getUser(username: string): Promise<UserEntity> {
        // @ts-ignore
        return this.redisClient.hgetAsync(RedisKey.HKEY_USERS, username).then(res => {
            if (!res) {
                return this.userService.getUserByName(username).then(entity => {
                    if (entity) {
                        this.redisClient.hset(RedisKey.HKEY_USERS, username, JSON.stringify(entity));
                    }
                    return entity;
                });
            }
            return JSON.parse(res);
        });
    }

    async getPerms(username: string): Promise<string[]> {
        // @ts-ignore
        return this.redisClient.hgetAsync(RedisKey.HKEY_PERMS, username).then(res => {
            if (!res) {
                return this.permService.getPerms(username).then(entities => {
                    if (entities && entities.length > 0) {
                        const perms = entities.map(entity => entity.code);
                        this.redisClient.hset(RedisKey.HKEY_PERMS, username, JSON.stringify(perms));
                        return perms;
                    }
                    return [];
                });
            }
            return JSON.parse(res);
        });

    }

}
