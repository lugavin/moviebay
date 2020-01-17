import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {VideoMetaEntity} from './videometa.entity';
import {VideoMetaService} from './videometa.service';

@Module({
    imports: [TypeOrmModule.forFeature([VideoMetaEntity])],
    exports: [VideoMetaService],
    providers: [VideoMetaService],
})
export class VideoMetaModule {
}
