import {Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {DeleteResult} from 'typeorm';
import {Auth} from '../../comm/decorators/auth.decorator';
import {VideoService} from './video.service';
import {VideoEntity} from './video.entity';

@Controller('/videos')
export class VideoResource {

    constructor(private readonly videoService: VideoService) {
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createVideo(@Body() entity: VideoEntity): Promise<VideoEntity> {
        return this.videoService.createVideo(entity);
    }

    @Delete(':vid')
    async deleteVideo(@Param('uid') vid: number): Promise<DeleteResult> {
        return this.videoService.deleteVideo(vid);
    }

    @Get(':vid')
    @Auth('video:query')
    async getVideo(@Param('vid') vid: number): Promise<VideoEntity> {
        return this.videoService.getVideo(vid);
    }

}
