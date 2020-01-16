import {Body, Controller, Post} from '@nestjs/common';
import {CelebrityService} from './celebrity.service';
import {CelebrityEntity} from './celebrity.entity';

@Controller('celebrities')
export class CelebrityResource {

    constructor(private readonly celebrityService: CelebrityService) {
    }

    @Post()
    async createCelebrity(@Body() entities: CelebrityEntity[]): Promise<CelebrityEntity[]> {
        return this.celebrityService.createCelebrity(entities);
    }

}
