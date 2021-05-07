import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {VisitEntity} from './visit.entity';
import {VisitService} from './visit.service';
import {VisitController} from './visit.controller';

@Module({
    imports: [TypeOrmModule.forFeature([VisitEntity])],
    providers: [VisitService],
    controllers: [VisitController],
})
export class VisitModule {
}
