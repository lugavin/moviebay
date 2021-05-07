import {Module} from '@nestjs/common';
import {APP_FILTER} from '@nestjs/core';
import {HttpExceptionFilter} from './exception.filter';

@Module({
    providers: [{
        provide: APP_FILTER,
        useClass: HttpExceptionFilter
    }]
})
export class FilterModule {
}
