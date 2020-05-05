import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query} from '@nestjs/common';
import {DeleteResult} from 'typeorm';
import {VideoService} from './video.service';
import {VideoEntity} from './video.entity';
import {PageResponse} from '../../shared/page/page.response';
import {VideoDto} from './dto/video.dto';

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
    async search(@Query('page', ParseIntPipe) page: number,
                 @Query('pageSize', ParseIntPipe) pageSize: number,
                 @Query('q') keyword: string): Promise<PageResponse<VideoEntity>> {
        return this.videoService.search(page, pageSize, keyword);
    }

    @Get()
    async getPage(@Query('page', ParseIntPipe) page: number,
                  @Query('pageSize', ParseIntPipe) pageSize: number,
                  @Query() params: VideoDto): Promise<PageResponse<VideoEntity>> {
        return this.videoService.getPage(page, pageSize, params);
    }

}
