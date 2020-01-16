import {Controller} from '@nestjs/common';
import {CommentService} from './comment.service';

@Controller('comments')
export class CommentResource {

    constructor(private readonly commentService: CommentService) {
    }

}
