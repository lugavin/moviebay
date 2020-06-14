import * as Redis from 'redis';
import * as Bluebird from 'bluebird';
import {Global, Module} from '@nestjs/common';
import {ConfigFactory} from '../../config';

/**
 * @see [Global modules](https://docs.nestjs.com/modules#global-modules)
 */
@Global()
@Module({
    exports: [Redis.RedisClient],
    providers: [{
        provide: Redis.RedisClient,
        useFactory() { // 引入异步模块Bluebird为Node_Redis提供全异步的调用方式来操作Redis
            return Bluebird.promisifyAll(Redis.createClient(ConfigFactory.createRedisConfig()));
        }
    }]
})
export class RedisModule {
}
