import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DictEntity} from './dict.entity';
import {DictService} from './dict.service';
import {DictResource} from './dict.resource';

@Module({
    imports: [TypeOrmModule.forFeature([DictEntity])],
    providers: [DictService],
    controllers: [DictResource],
})
export class DictModule {
}
