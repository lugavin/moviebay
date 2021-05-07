import {Body, Controller, Post} from '@nestjs/common';
import {CelebrityService} from './celebrity.service';
import {CelebrityEntity} from './celebrity.entity';

@Controller('celebrities')
export class CelebrityController {

    constructor(private readonly celebrityService: CelebrityService) {
    }

    @Post()
    async createCelebrities(@Body() entities: CelebrityEntity[]): Promise<CelebrityEntity[]> {
        return this.celebrityService.createCelebrity(entities);
    }

}
