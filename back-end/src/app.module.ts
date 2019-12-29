import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from "typeorm";
import {UserModule} from './modules/user/user.module'

/**
 * Module: 模块是具有 @Module 装饰器的类(@Module装饰器提供了元数据, Nest用它来组织应用程序结构)
 * Controller: 控制器负责处理传入的请求和向客户端返回响应
 * Provider: 提供者只是一个用 @Injectable 装饰器注释的类
 */
@Module({
    imports: [TypeOrmModule.forRoot(), UserModule]
})
export class AppModule {
    constructor(private readonly connection: Connection) {
    }
}