import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DictEntity} from './dict.entity';
import {DictService} from './dict.service';
import {DictController} from './dict.controller';

@Module({
    imports: [TypeOrmModule.forFeature([DictEntity])],
    providers: [DictService],
    controllers: [DictController],
})
export class DictModule {
}
