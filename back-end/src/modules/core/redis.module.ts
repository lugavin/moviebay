import * as Redis from 'redis';
import * as Bluebird from 'bluebird';
import {Global, Module} from '@nestjs/common';
import {ConfigFactory} from 'src/config';

/**
 * 引入异步模块Bluebird来为操作Redis提供全异步的调用方式
 *
 * @see https://docs.nestjs.com/modules#global-modules
 * @see https://docs.nestjs.com/modules#module-re-exporting
 */
@Global()
@Module({
    exports: [Redis.RedisClient],
    providers: [{
        provide: Redis.RedisClient,
        useFactory: () => Bluebird.promisifyAll(Redis.createClient(ConfigFactory.createRedisConfig()))
    }]
})
export class RedisModule {
}
