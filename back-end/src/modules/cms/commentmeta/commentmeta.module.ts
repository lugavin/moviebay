import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CommentMetaEntity} from './commentmeta.entity';
import {CommentMetaService} from './commentmeta.service';

@Module({
    imports: [TypeOrmModule.forFeature([CommentMetaEntity])],
    exports: [CommentMetaService],
    providers: [CommentMetaService]
})
export class CommentMetaModule {
}