/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/4/26
 * Time: 16:45
 *
 */

import { Global, Module } from '@nestjs/common';
import { ApiService } from './apiService/api.service';
import { ConfigService } from './config/config.service';
import MailerService from './apiService/mailer.service';

@Global()
@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: ConfigService.init()
        },
        {
            provide: ApiService,
            useClass: ApiService
        },
        {
            provide: MailerService,
            useClass: MailerService
        }
    ],
    exports: [ConfigService, ApiService, MailerService]
})
export class customModule {}
