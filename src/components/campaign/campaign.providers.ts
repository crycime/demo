/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/19
 * Time: 20:48
 *
 */

import { Connection } from 'mongoose';
import { CAMPAIGN_REPOSITORY } from '../../common/constants/entity.constant';
import { DB_CONNECTION_MONGODB } from '../../common/constants/system.constant';
import { CampaignSchema } from './schemas/campaign.schema';

export const CampaignProviders = [
    {
        provide: CAMPAIGN_REPOSITORY,
        useFactory: (connection: Connection) => connection.model('campaign', CampaignSchema),
        inject: [DB_CONNECTION_MONGODB]
    }
];
