import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {VideoEntity} from './video.entity';
import {VideoService} from './video.service';
import {VideoResource} from './video.resource';

@Module({
    imports: [TypeOrmModule.forFeature([VideoEntity])],
    exports: [VideoService],
    providers: [VideoService],
    controllers: [VideoResource],
})
export class VideoModule {
}
