import {Controller} from '@nestjs/common';
import {CelebrityService} from './celebrity.service';

@Controller('/celebrities')
export class CelebrityResource {

    constructor(private readonly celebrityService: CelebrityService) {
    }

}
