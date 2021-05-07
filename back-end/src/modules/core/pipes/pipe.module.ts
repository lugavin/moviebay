import {Module, ValidationPipe} from '@nestjs/common';
import {APP_PIPE} from '@nestjs/core';

/**
 * ValidationPipe 需要同时安装 class-validator 和 class-transformer 包
 */
@Module({
    providers: [{
        provide: APP_PIPE,
        useClass: ValidationPipe
    }]
})
export class PipeModule {
}
