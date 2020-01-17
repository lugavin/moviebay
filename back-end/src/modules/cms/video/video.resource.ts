import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {DeleteResult} from 'typeorm';
import {VideoService} from './video.service';
import {VideoEntity} from './video.entity';

@Controller('videos')
export class VideoResource {

    constructor(private readonly videoService: VideoService) {
    }

    @Post()
    async createVideo(@Body() entities: VideoEntity[]): Promise<VideoEntity[]> {
        return this.videoService.createVideo(entities);
    }

    @Delete(':vid')
    async deleteVideo(@Param('vid') vid: number): Promise<DeleteResult> {
        return this.videoService.deleteVideo(vid);
    }

    @Get(':vid')
    async getVideo(@Param('vid') vid: number): Promise<VideoEntity> {
        return this.videoService.getVideo(vid);
    }

    @Get('search')
    async search(@Query('q') keyword: string): Promise<VideoEntity[]> {
        return this.videoService.search(keyword);
    }

}
