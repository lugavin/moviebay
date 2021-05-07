import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {VideoEntity} from './video.entity';
import {VideoService} from './video.service';
import {VideoController} from './video.controller';

@Module({
    imports: [TypeOrmModule.forFeature([VideoEntity])],
    exports: [VideoService],
    providers: [VideoService],
    controllers: [VideoController],
})
export class VideoModule {
}
