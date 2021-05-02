import {Controller, Get, Post, Body, Query} from '@nestjs/common';
import {DictService} from './dict.service';
import {DictEntity} from './dict.entity';

@Controller('dicts')
export class DictController {

    constructor(private readonly dictService: DictService) {
    }

    @Post()
    async createDicts(@Body() entities: DictEntity[]): Promise<DictEntity[]> {
        return this.dictService.createDict(entities);
    }

    @Get()
    async getDicts(@Query('tags')  tags: string | string[]): Promise<DictEntity[]> {
        return this.dictService.getDictByTag(tags);
    }

}
