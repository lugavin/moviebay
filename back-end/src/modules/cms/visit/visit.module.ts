import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {VisitEntity} from './visit.entity';
import {VisitService} from './visit.service';
import {VisitResource} from './visit.resource';

@Module({
    imports: [TypeOrmModule.forFeature([VisitEntity])],
    providers: [VisitService],
    controllers: [VisitResource]
})
export class VisitModule {
}