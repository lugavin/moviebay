import {Global, Module} from '@nestjs/common';
import {MailerModule} from '@nestjs-modules/mailer';
import {ConfigFactory} from '../../config';

/**
 * @see https://nest-modules.github.io/mailer/docs/mailer
 */
@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({useFactory: ConfigFactory.createMailConfig})
    ]
})
export class MailModule {
}
