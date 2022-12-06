import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigFactory} from './config';
import * as Modules from './modules';

/**
 * 默认情况下, 模块封装提供者, 这意味着如果提供者既不是当前模块的一部分也不是从另外模块(已导入)导出的, 那么它就是无法注入的:
 *  - Module: 模块是具有 @Module 装饰器的类(@Module装饰器提供了元数据, Nest用它来组织应用程序结构)
 *  - Imports: 导入其他模块的列表(这些模块导出了本模块中所需提供者)
 *  - Exports: 由本模块提供在其他模块中可用的提供者(模块除了可以导出它们内部的提供者之外, 还可以导出已导入的模块)
 *  - Provider: 提供者只是一个用 @Injectable 装饰器注释的类(由Nest注入器实例化的提供者, 并且可以至少在整个模块中共享)
 *  - Controller: 控制器负责处理传入的请求和向客户端返回响应
 *
 * @see [Modules](https://docs.nestjs.cn/9/modules)
 */
@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            useFactory: ConfigFactory.datasourceConfig
        }),
        ...Object.values(Modules),
    ]
})
export class AppModule {

    // static forRoot(): DynamicModule {
    //     return {
    //         module: AppModule,
    //         imports: [TypeOrmModule.forRoot(), ...Object.values(Modules)]
    //     };
    // }

}
