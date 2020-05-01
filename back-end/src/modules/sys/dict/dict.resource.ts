import {Controller, Get, Post, Body, Query} from '@nestjs/common';
import {DictService} from './dict.service';
import {DictEntity} from './dict.entity';

@Controller('dicts')
export class DictResource {

    constructor(private readonly dictService: DictService) {
    }

    @Post()
    async createDict(@Body() entities: DictEntity[]): Promise<DictEntity[]> {
        return this.dictService.createDict(entities);
    }

    @Get()
    async getDict(@Query('tags')  tags: string[]): Promise<DictEntity[]> {
        return this.dictService.getDictByTag(tags);
    }

}
