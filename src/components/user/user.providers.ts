/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/19
 * Time: 20:48
 *
 */

import { Connection } from 'mongoose';
import { USER_REPOSITORY } from '../../common/constants/entity.constant';
import { DB_CONNECTION_MONGODB } from '../../common/constants/system.constant';
import { UserSchema } from './schemas/user.schema';

export const UserProviders = [
    {
        provide: USER_REPOSITORY,
        useFactory: (connection: Connection) => connection.model('user', UserSchema),
        inject: [DB_CONNECTION_MONGODB]
    }
];
