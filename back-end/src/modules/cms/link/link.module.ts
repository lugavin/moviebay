import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LinkEntity} from './link.entity';
import {LinkService} from './link.service';
import {LinkResource} from './link.resource';

@Module({
    imports: [TypeOrmModule.forFeature([LinkEntity])],
    providers: [LinkService],
    controllers: [LinkResource]
})
export class LinkModule {
}