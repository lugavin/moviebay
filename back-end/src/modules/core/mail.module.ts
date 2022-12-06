import {Global, Module} from '@nestjs/common';
import {MailerModule} from '@nestjs-modules/mailer';
import {ConfigFactory} from 'src/config';

/**
 * @see https://nest-modules.github.io/mailer/docs/mailer
 */
@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({useFactory: ConfigFactory.mailConfig})
    ]
})
export class MailModule {
}
