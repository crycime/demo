/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/19
 * Time: 20:22
 *
 */

import { Document, Schema } from 'mongoose';

interface UserVote extends Document {
    readonly campaignId: Schema.Types.ObjectId;
    readonly elector: [Schema.Types.ObjectId];
}

export interface User extends Document {
    readonly user: string;
    readonly password: string;
    readonly status: string;
    readonly vote: [UserVote];
}
