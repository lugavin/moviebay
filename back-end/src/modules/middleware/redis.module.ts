import * as Redis from 'redis';
import * as Bluebird from 'bluebird';
import {Global, Module} from '@nestjs/common';
import {redisConfigFactory} from '../../config';

/**
 * @see [Global modules](https://docs.nestjs.com/modules#global-modules)
 */
@Global()
@Module({
    exports: [Redis.RedisClient],
    providers: [{
        provide: Redis.RedisClient,
        useFactory: () => {
            Bluebird.promisifyAll(Redis); // 引入异步模块Bluebird为Node_Redis提供全异步的调用方式来操作Redis
            return Redis.createClient(redisConfigFactory());
        }
    }]
})
export class RedisModule {
}
