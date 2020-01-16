import {Controller} from '@nestjs/common';
import {VisitService} from './visit.service';

@Controller('visits')
export class VisitResource {

    constructor(private readonly visitService: VisitService) {
    }

}
