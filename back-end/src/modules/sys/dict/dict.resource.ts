import {Controller, Get, Post, Body, Query} from '@nestjs/common';
import {DictService} from './dict.service';
import {DictEntity} from './dict.entity';

@Controller('/dicts')
export class DictResource {

    constructor(private readonly dictService: DictService) {
    }

    @Post()
    async createDict(@Body() entity: DictEntity): Promise<DictEntity> {
        return this.dictService.createDict(entity);
    }

    @Get()
    async getDict(@Query('tag')  tag: string): Promise<DictEntity[]> {
        return this.dictService.getDictByTag(tag);
    }

}
