/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/4/28
 * Time: 13:52
 *
 */

import { Global, Module } from '@nestjs/common';
import { MongodbProviders } from './mongodb.provider';

@Global()
@Module({
    providers: [MongodbProviders],
    exports: [MongodbProviders]
})
export class DatabaseModule {}
