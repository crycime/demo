/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/19
 * Time: 20:48
 *
 */

import { Connection } from 'mongoose';
import { ELECTOR_REPOSITORY } from '../../common/constants/entity.constant';
import { DB_CONNECTION_MONGODB } from '../../common/constants/system.constant';
import { ElectorSchema } from './schemas/elector.schema';

export const ElectorProviders = [
    {
        provide: ELECTOR_REPOSITORY,
        useFactory: (connection: Connection) => connection.model('elector', ElectorSchema),
        inject: [DB_CONNECTION_MONGODB]
    }
];
