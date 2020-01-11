import {Controller} from '@nestjs/common';
import {DictService} from './dict.service';

@Controller()
export class DictResource {

    constructor(private readonly dictService: DictService) {
    }

}
