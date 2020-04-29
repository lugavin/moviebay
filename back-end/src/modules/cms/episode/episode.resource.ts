import {Controller} from '@nestjs/common';
import {EpisodeService} from './episode.service';

@Controller('episodes')
export class EpisodeResource {

  constructor(private readonly episodeService: EpisodeService) {
  }

}
