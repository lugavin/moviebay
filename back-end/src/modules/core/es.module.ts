import {Global, Module} from '@nestjs/common';
import {ElasticsearchModule} from '@nestjs/elasticsearch';
import {ConfigFactory} from '../../config';

@Global()
@Module({
    imports: [
        ElasticsearchModule.registerAsync({useFactory: ConfigFactory.createEsConfig})
    ]
})
export class EsModule {
}
