import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CommentEntity} from './comment.entity';
import {CommentService} from './comment.service';
import {CommentResource} from './comment.resource';

@Module({
    imports: [TypeOrmModule.forFeature([CommentEntity])],
    providers: [CommentService],
    controllers: [CommentResource],
})
export class CommentModule {
}
