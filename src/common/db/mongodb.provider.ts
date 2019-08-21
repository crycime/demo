/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/19
 * Time: 20:22
 *
 */

import { ConfigService } from '../config/config.service';
import { DB_CONNECTION_MONGODB } from '../constants/system.constant';
import mongoose from 'mongoose';

export const MongodbProviders = {
    provide: DB_CONNECTION_MONGODB,
    useFactory: async (config: ConfigService) => {
        const db = await mongoose.connect(config.mongodb.url, config.mongodb.option);
        return db;
    },
    inject: [ConfigService]
};
