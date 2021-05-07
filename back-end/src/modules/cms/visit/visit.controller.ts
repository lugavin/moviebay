import {Controller} from '@nestjs/common';
import {VisitService} from './visit.service';

@Controller('visits')
export class VisitController {

    constructor(private readonly visitService: VisitService) {
    }

}
