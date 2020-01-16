import {Controller} from '@nestjs/common';
import {LinkService} from './link.service';

@Controller('links')
export class LinkResource {

    constructor(private readonly linkService: LinkService) {
    }

}
